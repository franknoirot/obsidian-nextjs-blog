interface IIconProps {
    type: string,
    width?: number | '',
    height?: number | '',
    fill?: string,
    className?: string,
}

export default function Icon({ type, width = '', height = '', fill = 'currentColor', className = '' }: IIconProps) {

    switch (type) {
        case 'logo':
            return (
                <svg width={width} height={height} viewBox="0 0 39 57" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.9037 28.6146C2.6958 28.7964 1.39544 28.8906 0 28.8906V24.4206C1.41134 24.4206 2.65242 24.31 3.74386 24.1125C3.72383 23.021 3.71782 21.9465 3.72505 20.8953C3.75658 16.3145 4.04001 12.1058 4.53327 8.79986C4.77929 7.15095 5.08488 5.67568 5.45699 4.46996C5.7999 3.35887 6.29625 2.13734 7.11129 1.3223C7.75038 0.683214 8.61576 0.333875 9.5565 0.409639C10.3923 0.476949 11.0666 0.860692 11.5362 1.21828C12.4679 1.92773 13.2525 3.0381 13.8747 4.18971C15.1539 6.55732 16.202 9.95629 16.3568 13.4701C16.5116 16.9822 15.7794 20.8929 13.143 23.9499C11.8953 25.3967 10.2951 26.5672 8.31995 27.4051C8.38647 28.8846 8.47956 30.3783 8.60067 31.8706H19.1217V9.71203L34.5184 26.5987V10.9291H38.9884V38.1358L23.5917 21.2491V36.3406H14.9307C20.759 41.2979 21.8885 47.466 20.2778 51.9374C19.307 54.6325 16.9883 57.2375 13.7785 56.9828C10.549 56.7265 8.27922 53.7109 7.04057 49.4082C5.2604 43.2245 4.27964 35.7519 3.9037 28.6146ZM9.23209 37.7516C9.73343 41.4545 10.427 45.0135 11.3361 48.1716C12.4566 52.0639 13.8654 52.5056 14.132 52.5268C14.4184 52.5495 15.4134 52.2519 16.0723 50.4226C17.0772 47.6327 16.5397 42.068 9.23209 37.7516ZM8.19389 22.4144C8.82004 21.9902 9.33475 21.5213 9.75801 21.0305C11.3976 19.1294 12.0158 16.4966 11.8912 13.6669C11.7666 10.839 10.9056 8.09793 9.94203 6.31453C9.85826 6.15948 9.77671 6.01727 9.69808 5.88726C9.42763 6.78958 9.17358 7.99009 8.95435 9.45949C8.50083 12.4991 8.22551 16.4874 8.19496 20.926C8.19157 21.4177 8.1912 21.914 8.19389 22.4144ZM8.79869 4.75411C8.79867 4.75387 8.80249 4.75607 8.8102 4.76145C8.80256 4.75704 8.7987 4.75435 8.79869 4.75411Z" fill={fill}/>
                </svg>
            )
        case 'instagram':
            return (
                <svg width={width} height={width} className={className} viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_784_233" style={{maskType: "alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="17">
                        <path d="M0.988464 0.399414H17.0216V16.3994H0.988464V0.399414Z" fill="white"/>
                    </mask>
                    <g mask="url(#mask0_784_233)">
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.00501 0.399414C6.82786 0.399414 6.55483 0.408623 5.69981 0.447556C4.84651 0.486394 4.26379 0.621643 3.75384 0.81942C3.22671 1.02383 2.77962 1.29738 2.33395 1.74212C1.88826 2.1869 1.61418 2.63304 1.40931 3.15908C1.21112 3.66797 1.07562 4.24949 1.03667 5.10103C0.997661 5.95431 0.988464 6.22671 0.988464 8.3994C0.988464 10.5721 0.997661 10.8445 1.03667 11.6978C1.07562 12.5493 1.21112 13.1309 1.40931 13.6397C1.61418 14.1658 1.88826 14.6119 2.33395 15.0567C2.77962 15.5015 3.22671 15.775 3.75384 15.9794C4.26379 16.1772 4.84651 16.3124 5.69981 16.3513C6.55483 16.3902 6.82786 16.3994 9.00501 16.3994C11.1822 16.3994 11.4552 16.3902 12.3102 16.3513C13.1635 16.3124 13.7462 16.1772 14.2562 15.9794C14.7833 15.775 15.2304 15.5015 15.6761 15.0567C16.1218 14.6119 16.3959 14.1658 16.6007 13.6397C16.7989 13.1309 16.9344 12.5493 16.9734 11.6978C17.0124 10.8445 17.0216 10.5721 17.0216 8.3994C17.0216 6.22675 17.0124 5.95431 16.9734 5.10103C16.9344 4.24949 16.7989 3.66797 16.6007 3.15908C16.3959 2.63304 16.1218 2.1869 15.6761 1.74212C15.2304 1.29738 14.7833 1.02383 14.2562 0.81942C13.7462 0.621643 13.1635 0.486394 12.3102 0.447556C11.4552 0.408623 11.1822 0.399414 9.00501 0.399414ZM9.00501 1.84085C11.1455 1.84085 11.3991 1.84898 12.2444 1.88747C13.026 1.92307 13.4505 2.0534 13.7329 2.16295C14.1071 2.30808 14.3742 2.48144 14.6547 2.76137C14.9352 3.04133 15.1089 3.30782 15.2544 3.68124C15.3642 3.96314 15.4948 4.38674 15.5304 5.16673C15.569 6.0103 15.5771 6.26333 15.5771 8.3994C15.5771 10.5355 15.569 10.7885 15.5304 11.6321C15.4948 12.4121 15.3642 12.8357 15.2544 13.1176C15.1089 13.491 14.9352 13.7575 14.6547 14.0374C14.3742 14.3174 14.1071 14.4908 13.7329 14.6359C13.4505 14.7454 13.026 14.8758 12.2444 14.9113C11.3992 14.9498 11.1457 14.958 9.00501 14.958C6.86433 14.958 6.61084 14.9498 5.76565 14.9113C4.98404 14.8758 4.55954 14.7454 4.27706 14.6359C3.9029 14.4908 3.63582 14.3174 3.35531 14.0374C3.0748 13.7575 2.90105 13.491 2.75562 13.1176C2.64587 12.8357 2.51527 12.4121 2.4796 11.6321C2.44103 10.7885 2.43289 10.5355 2.43289 8.3994C2.43289 6.26333 2.44103 6.0103 2.4796 5.16673C2.51527 4.38674 2.64587 3.96314 2.75562 3.68124C2.90105 3.30782 3.0748 3.04133 3.35531 2.7614C3.63582 2.48144 3.9029 2.30808 4.27706 2.16295C4.55954 2.0534 4.98404 1.92307 5.76562 1.88747C6.61096 1.84898 6.86449 1.84085 9.00501 1.84085Z" fill={fill}/>
                    </g>
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.00761 11.2528C7.43952 11.2528 6.1683 9.98156 6.1683 8.41346C6.1683 6.84537 7.43952 5.57418 9.00761 5.57418C10.5757 5.57418 11.8469 6.84537 11.8469 8.41346C11.8469 9.98156 10.5757 11.2528 9.00761 11.2528ZM9.00761 4.03943C6.59189 4.03943 4.63354 5.99774 4.63354 8.41346C4.63354 10.8292 6.59189 12.7875 9.00761 12.7875C11.4233 12.7875 13.3816 10.8292 13.3816 8.41346C13.3816 5.99774 11.4233 4.03943 9.00761 4.03943Z" fill={fill}/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M14.1106 4.03943C14.1106 4.44206 13.7842 4.76844 13.3816 4.76844C12.979 4.76844 12.6526 4.44206 12.6526 4.03943C12.6526 3.6368 12.979 3.31042 13.3816 3.31042C13.7842 3.31042 14.1106 3.6368 14.1106 4.03943Z" fill={fill}/>
                </svg>
            )
        case 'linkedin':
            return (
                <svg width={width} height={height} className={className} viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0.425182 5.5299H3.54371V16.3984H0.425182V5.5299ZM1.90496 4.17045H1.88238C0.753497 4.17045 0.0216064 3.33961 0.0216064 2.28749C0.0216064 1.21386 0.775134 0.399414 1.92659 0.399414C3.07711 0.399414 3.78454 1.21181 3.80712 2.28442C3.80712 3.33654 3.07711 4.17045 1.90496 4.17045ZM16.0216 16.3994H12.4854V10.7741C12.4854 9.30196 11.9322 8.29799 10.7159 8.29799C9.78548 8.29799 9.26808 8.97516 9.02725 9.62979C8.93694 9.86337 8.95105 10.1902 8.95105 10.518V16.3994H5.44776C5.44776 16.3994 5.49291 6.43553 5.44776 5.5299H8.95105V7.23563C9.15801 6.48982 10.2775 5.42541 12.0639 5.42541C14.2803 5.42541 16.0216 6.98976 16.0216 10.3551V16.3994Z" fill={fill}/>
                </svg>
            )
        case 'twitter':
            return (
                <svg width={width} height={height} className={className} viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_784_241)">
                        <path d="M20.3852 2.29341C19.6361 2.61471 18.8308 2.83178 17.9858 2.92943C18.8483 2.42955 19.5108 1.63799 19.8227 0.694737C19.0154 1.1577 18.1213 1.49377 17.1696 1.67491C16.4076 0.889843 15.3218 0.399414 14.1202 0.399414C11.813 0.399414 9.94225 2.20786 9.94225 4.43852C9.94225 4.7551 9.97921 5.06342 10.0505 5.35904C6.57827 5.19061 3.49989 3.58248 1.43929 1.1387C1.07967 1.73525 0.873588 2.42906 0.873588 3.16933C0.873588 4.57073 1.61116 5.80704 2.73218 6.53136C2.04735 6.51039 1.40315 6.32867 0.839886 6.02617C0.839411 6.043 0.839411 6.05993 0.839411 6.07696C0.839411 8.03395 2.27953 9.66639 4.19076 10.0377C3.8402 10.13 3.47111 10.1794 3.0901 10.1794C2.8209 10.1794 2.55923 10.154 2.30407 10.1069C2.83577 11.7116 4.37862 12.8794 6.20687 12.9119C4.77703 13.9953 2.97566 14.6411 1.01821 14.6411C0.680982 14.6411 0.348444 14.6219 0.0216064 14.5846C1.87053 15.7307 4.06654 16.3994 6.42588 16.3994C14.1104 16.3994 18.3128 10.2446 18.3128 4.9068C18.3128 4.73167 18.3087 4.55753 18.3006 4.38418C19.1168 3.8148 19.8251 3.10347 20.3852 2.29341H20.3852Z" fill={fill}/>
                    </g>
                    <defs>
                        <clipPath id="clip0_784_241">
                            <rect width="20.3636" height="16" fill="white" transform="translate(0.0216064 0.399414)"/>
                        </clipPath>
                    </defs>
                </svg>
            )
        default:
            return <></>
    }
}