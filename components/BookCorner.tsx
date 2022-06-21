export interface IBookCornerProps {
    squareColor: string,
    bgColor: {
        start: string,
        end: string,
    },
    className: string,
}

export default function BookCorner(props: IBookCornerProps) {
    const { squareColor, bgColor, className = '' } = props

    return (<div className={"absolute top-0 right-0 " + className}>
        <svg className="block" viewBox="0 0 506 437" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M506 432.5L0 0H506V432.5Z" fill="url(#paint0_linear_1580_279)"/>
            <mask id="corner-mask">
                <path d="M506 432.5L0 0H506V432.5Z" fill="white"/>
            </mask>
            <rect x="132" y="93" width="300" height="300" fill={squareColor} style={{mixBlendMode: "color-burn"}} mask="url(#corner-mask)"/>
            <defs>
                <linearGradient id="paint0_linear_1580_279" x1="136.889" y1="-7.75668" x2="117.752" y2="342.349" gradientUnits="userSpaceOnUse">
                <stop stopColor={bgColor.start}/>
                <stop offset="1" stopColor={bgColor.end}/>
            </linearGradient>
            </defs>
        </svg>
    </div>)
}