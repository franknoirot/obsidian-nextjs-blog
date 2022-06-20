---
title: Interoperable Libraries
category: technology
growthStage: seedling
created: 2020-08-01
updated: 2020-08-01
description: Thoughts after Maggie Appleton on how to create interoperable personal libraries.
---
> [!Under Construction]
> I am actively working on this note because the post it is based on has given me a lot to think about, please bear with me!

This note is in response to Maggie Appleton's thoughtful note ["Interoperable Personal Libraries and Ad Hoc Reading Groups"](https://maggieappleton.com/interoperable-libraries). I have been thinking about some of these same problems over the past couple years and want to see if I can contribute anything to the discussion.

## My first attempt
I built a [website for my personal library](https://franknoirot-library.netlify.app/) back in 2020 using a [Google Sheet](https://docs.google.com/spreadsheets/d/1L6pFNR2fB9451zNvaNzXW_tFJ2ko7YqvuD8qmNz0NWk/edit?usp=sharing) as the content management tool and [11ty](https://11ty.dev) on [Netlify](https://netlify.com) as the technology stack[^1]. The goals were four-fold:
1. Track my inventory of books to better move through a growing "unread" pile more quickly.
2. Publish my library to better signal to friends and acquaintances that I am eager to lend and exchange books and discussions about them.
3. Test out a tricky UX system with the minimum cost and approachability I could.
4. Create a system template that could let my friends and I start publishing interoperable libraries.

I feel relatively good about that project, although my design skills leave a lot to be desired[^2]. It succeeded in goals 1 and 2. Although I've only had a couple friends actually reach out to borrow any books people in my life seem to at least know that I'm always down to lend out, and I've read more books than ever since making the site. However, goals 3 and 4 were failures.

### Pain points
I enjoyed editing my library in a spreadsheet, and thought that some of my friends might too, because it didn't require any code experience in the minimal case, and very little understanding of what was going on outside of the spreadsheet. However, the following pain points limited me from convincing any friends to try making their own site using this method:
- **The data gathering took quite some time.** I took photos of every book cover (my Samsung phone's camera has this great "scan" feature that can de-warp images), and looked up their ISBN or LOC ID manually. As my boss at [Shift Lab](https://shiftlab.co) always says "content is the hard part."
- **Getting the site and spreadsheet set up is too many steps.** Netlify has this excellent feature called Deploy Buttons that let you turn a repository into a website template that deploys in one click. Users just sign up for an account and click through the prompts, and the site does its first deploy afterword. I was excited to try this out, but the user in my system would actually need to both deploy the site and create a new cloned Google Sheet for themselves, and then connect them up with environment variables in Netlify.
- **Getting a domain set up is too technical.**  I never got anyone to this point, but I have always suspected that even if the site set up proved easy enough, changing the site's domain from the generated Netlify one to a custom domain like "library.franknoirot.co" would be too cumbersome for most users.
- **The data model was inflexible.** My library has a lot of the same data as a local library might have on an edition, but it is still inflexible. A potential second user of my template wouldn't be able to add a column to their Google Sheet and have it appear in their book cards alongside other data. Or if I had encoded the sheet to dump content from any column except for the "special" ones into the card body, a user would be unable to add a "hidden" or simply annotating data point to their library.

## An intermediary
Appleton's [sketch of what elegantly interoperable libraries](https://maggieappleton.com/interoperable-libraries#:~:text=We%20would%20need%20a%20system%20that%20enables%20people%20to%3A) could do was inspiring to me, and I agree with her that "it feels necessary to have some third-party intemediary service in the middle to match up book lists and email out proposed discussion groups to people." I also agree that it should not be a platform otherwise you are recreating a sprawled version of GoodReads.

I think there are 4 functions that I'd like to combine into something that serves as a more lightweight "librarian.[^3]"

### 1. Specification
Maintain documentation and tooling for a *specification* that different independent sites can target. This should consist of primarily base data model of a book that has release valves for data that is context-specific, but I think it could also be a specification of metadata about library itself. As Appleton alludes to, there are many things that a personal library can be "for", so template creators need to provide a place for their users to edit global configuration such as if they're looking for ad hoc reading groups around a book (I know I would be!). These global configuration settings could serve a feature flags for the tools mentioned in function 4 below

It should also house testing tools to validate a site is interoperable to the spec, so that template creators can ensure their site will be able to talk to others well.

### 2. Templates
Maintain a list of *battle-tested static site templates* that have simple steps to scaffold them out. I have a feeling that these templates should be able to be for just the content management, just the frontend, or both. For my part, I had hoped to make my library template with several frontends and backends that could be swapped to whatever worked best for the user, which is why I rebuilt the frontend with Svelte and got partway through a Sanity backend before deciding I needed to think about it more.

### 3. Client-side tools
Maintain a set of *client-side tools* that are available to creators of the templates above can build them into the content management, so that it is the individual sites that do compute to connect to others, not some centralized tool.

I believe this is where the functionality for site/API crawling, notifications, and group coordination could live. My first thought for this would be a Sanity Dashboard plugin that allowed users to manage their site subscriptions[^4]. Or if your site is edited on a hosted app like Airtable or Notion, maybe a webhook that runs that functionality and writes the results to a configuration document or emails them to you.

I think getting the hard compute to run only when the library manager is interested, and on their machine/platform instead of a centralized intermediary, is the key. 

### 4. Public sites
Maintain a list of *published library sites* that are open to the public for inspiration and subscription.

I believe all of these functionalities could be handled with a static site that lists the templates and public sites and documents guides on building your own, powered by a repository that also houses the client-side tools meant to be plugged into the content management environments of the templates.

[^1]: I followed up on this project with [a clone made with Svelte](https://bookshelf-network-svelte-sheets.netlify.app/) whose code I am much more happy with. The source code for both can be found on [my GitHub](https://github.com/franknoirot).
[^2]: I've never liked how it's not explicit that you can click the covers to flip them, and the theme dropdown is an unfocused addition that should have only been used for development purposes.
[^3]: I purchased the domain "bookshelf.network" for just this purpose, although I was more interested in find a way to gift an automatically-provisioned subdomain to people who made a static site using my template. I couldn't crack it though.
[^4]: perhaps with optional search through the publicly-listed sites in function 4.