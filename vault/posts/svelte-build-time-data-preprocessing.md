---
title: How to Get Svelte Build-Time Data with Preprocessing
category: technology
published: 2020-08-01
description: Set up a pipeline that lets us bake data into our Svelte app at build time, and make it fashion.
---
I really enjoy coding in Svelte. I've built a few small tools and toys with it, and I'm getting the opportunity to use it in production for the first time right now. But one thing that I've been missing from other toolsets is the ability to run code at build time to calculate or fetch data and pepper it into my Svelte app. [11ty](http://11ty.dev) calls this the [Data Cascade](https://www.11ty.dev/docs/data-cascade/) and [Gatsby](http://gatsbyjs.org) calls it the GraphQL layer.

## Defining "build-time data"
There actually is a pretty straightforward way to seed data into your app by defining key-value pairs on the optional `props` object when initializing the `App` component. The problem is, this code runs on the frontend every time the app is loaded. Fetching some REST API every page load makes the whole speed boost of Svelte irrelevant real quick.  

There are plenty of ways around this problem since we have Rollup bundling our code, but there is a way to use just what Svelte makes available so things fit nice and neat. If you're acquainted with Svelte you'll know you can have more than one script tag within your Svelte components: there is a special `<script context='module'>` that only runs once per component, not once per instance of a component. I wanted something like that, a special script tag that I could put the variables and Javascript I wanted into, or better yet put a *filename* to a Javascript file where I can put all the data fetching logic, something like this: 

```html

<!-- App.svelte -->

<script role='build-vars'>

let fetchedData = 'fetchSomeData.js';

</script>

  

<!-- ...use fetchedData throughout your Svelte App (save it to context for superpowers!) -->

```

I was pleasantly surprised to find you can do that with Svelte!  

## Svelte.preprocess
Svelte does all its compiling work as a Rollup plugin - or [WebPack](https://github.com/sveltejs/template-webpack) if you use that variant; Rollup is the [default starter project's](https://github.com/sveltejs/template) build system. The Svelte plugin within the `rollup.config.js` file can be passed a configuration object, and one optional configuration is a [preprocess](https://svelte.dev/docs#svelte_preprocess) object, seen here:

```js
// rollup.config.js

import compileBuildVars from './svelte-build-vars/index.js'

// ...

plugins: [

svelte({
	preprocess: {
		script: compileBuildVars,
		// markup,		
		// style,
	}
}),
// ...
```

`preprocess` has three optional parameters: `script`, `markup`, and `style`. Each of these can be given a function to arbitrarily transform the project's compiled JavaScript, HTML, and CSS respectively, and must return an object with a `code` property containing a string of your processed code. I only need to preprocess the JavaScript, and to do this I import a function called `compileBuildVars` that I wrote.

This function is below. It gets passed in the contents and attributes of every `<script>` tag in all my Svelte components, then checks if has a `role` attribute of "build-vars". If it does, it finds all variables and constants set to file names, runs each of those files and saves the output, then reconstructs a string of valid JavaScript that assigns each file's output to its corresponding variable.

```jsx
// ./svelte-build-vars/index.js
import fs from 'fs'
import requireFromString from 'require-from-string'

export default async ({ content, attributes }) => {
	// only run on script tags with role='build-vars'
	if (attributes.role !== 'build-vars') return
	
	// find all variables and constants with filenames assigned to them
	let variables = content.split(/;\s*\n\t?|\s*\n\t?/g)
		.map(str => str.trim())
		.filter(possibleVarStr => possibleVarStr && !possibleVarStr.startsWith('//') && /const|let|var/.test(possibleVarStr))
			.map(varStr => {
				const matches = /(const|let|var)\s+(\w+)\s+=\s+(\S+)/.exec(varStr)
				
				return {
					name: matches[2],
					path: matches[3].replace(/'|"|`/g, ''),
				}
			}
		);
	
	// read the content of each variable's file within a predefined folder
	let variablePromises = await Promise.all(variables.map(async varObj => {
		let strFileContents = fs.readFileSync( './src/svelte-build-vars/'+varObj.path, 'utf8' );
	
		return requireFromString(strFileContents)
	}))

	// reconstruct a string of valid javascript that sets the output of the code
	// from each variable's file to that variable
	const code = `\t` + variables.map((varObj, i) => {
		return `let ${ varObj.name } = ${ JSON.stringify(variablePromises[i]) };`
	}).join('\n\t')
	
	return { code }
}
```  

Great! Now we've created a tool that lets us pepper in arbitrary baked-in data at build time. Let try it out with a simple example: an app that displays the time it was last rebuilt.

## Using our custom preprocesser

Let's write the data "fetching" logic first, and save it in `buildTime.js`

```js
// ./src/svelte-build-vars/buildTime.js
module.exports = new Date().toLocaleTimeString() +' '+ new Date().toLocaleDateString()
```

All this does is export the current date and time in a nice-looking string, but you can call a headless CMS's API, crunch some numbers, anything in here. Now we can add a `build-vars` script tag to `App.svelte`, or any component for that matter.

```html
<!-- App.svelte -->
<script role='build-vars'>
	let buildTime = 'buildTime.js'
</script>

<h1>this site was built at { buildTime }</h1>
```

I was able to use this technique to build an app for a client using [Strapi](http://strapi.io) as my CMS, pulling in all the settings and data into a single object that gets passed into the Svelte app. I hope you find use for this strategy in your projects! Reach out to me on [Instagram](http://instagram.com/franknoirot) if you find anything unsafe or incorrect with this article.