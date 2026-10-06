import {
    useState
} from 'react';

import {
    flushSync
} from 'react-dom';

import {
    useLocation,
    useNavigate
} from 'react-router-dom';


function LanguageSwitch({
    language
}) {

    const location =
        useLocation();

    const navigate =
        useNavigate();


    const [isTransitioning, setIsTransitioning] =
        useState(false);


    const changeLanguage = (
        nextLanguage
    ) => {

        if (
            nextLanguage === language ||
            isTransitioning
        ) {
            return;
        }


        const languageRouteRegex =
            /^\/blog\/(en|fa)(?=\/|$)/;


        let nextPath;


        if (
            languageRouteRegex.test(
                location.pathname
            )
        ) {

            nextPath =
                location.pathname.replace(
                    languageRouteRegex,
                    `/blog/${nextLanguage}`
                );

        } else {

            nextPath =
                `/blog/${nextLanguage}`;

        }


        const target =
            `${nextPath}${location.search}${location.hash}`;


        const prefersReducedMotion =
            window.matchMedia(
                '(prefers-reduced-motion: reduce)'
            ).matches;


        const performNavigation =
            () => {

                flushSync(() => {

                    navigate(target);

                });

            };


        if (
            !document.startViewTransition ||
            prefersReducedMotion
        ) {

            performNavigation();

            return;

        }


        setIsTransitioning(true);


        try {

            const transition =
                document.startViewTransition(
                    performNavigation
                );


            transition.finished
                .finally(() => {

                    setIsTransitioning(false);

                });

        } catch (error) {

            setIsTransitioning(false);

            performNavigation();

        }

    };


    return (

        <div
            dir="ltr"
            lang="en"
            role="group"
            aria-label="Blog language"
            aria-busy={
                isTransitioning
            }
            className="
                relative
                grid
                grid-cols-2
                w-36
                p-1
                rounded-xl
                glass
                overflow-hidden
                flex-shrink-0
            "
        >

            {/* Sliding Background */}
            <span
                aria-hidden="true"
                className={`
                    pointer-events-none
                    absolute
                    top-1
                    bottom-1
                    left-1
                    w-[calc(50%-4px)]
                    rounded-lg
                    bg-gradient-to-r
                    from-primary-500
                    to-primary-600
                    shadow-glow-green
                    transform
                    transition-transform
                    duration-500

                    ${
                        language === 'fa'
                            ? 'translate-x-full'
                            : 'translate-x-0'
                    }
                `}
                style={{
                    transitionTimingFunction:
                        'cubic-bezier(0.16, 1, 0.3, 1)'
                }}
            />


            {/* English */}
            <button
                type="button"
                disabled={
                    isTransitioning
                }
                onClick={() =>
                    changeLanguage('en')
                }
                aria-pressed={
                    language === 'en'
                }
                className={`
                    relative
                    z-10
                    min-h-9
                    px-4
                    rounded-lg
                    text-sm
                    font-semibold
                    transition-colors
                    duration-300
                    disabled:cursor-default

                    ${
                        language === 'en'

                            ? 'text-white'

                            : `
                                text-theme-secondary
                                hover:text-theme-primary
                            `
                    }
                `}
            >

                EN

            </button>


            {/* Persian */}
            <button
                type="button"
                disabled={
                    isTransitioning
                }
                onClick={() =>
                    changeLanguage('fa')
                }
                aria-pressed={
                    language === 'fa'
                }
                className={`
                    relative
                    z-10
                    min-h-9
                    px-4
                    rounded-lg
                    text-sm
                    font-semibold
                    transition-colors
                    duration-300
                    disabled:cursor-default

                    ${
                        language === 'fa'

                            ? 'text-white'

                            : `
                                text-theme-secondary
                                hover:text-theme-primary
                            `
                    }
                `}
            >

                <span
                    lang="fa"
                    dir="rtl"
                    className="
                        language-switch-fa-label
                    "
                >

                    فا

                </span>

            </button>

        </div>

    );

}


export default LanguageSwitch;