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
    language,
    availableLanguages = {
        en: true,
        fa: true
    }
}) {

    const location =
        useLocation();

    const navigate =
        useNavigate();

    const [
        isTransitioning,
        setIsTransitioning
    ] = useState(false);


    const hasEnglish =
        availableLanguages?.en === true;

    const hasPersian =
        availableLanguages?.fa === true;


    // =====================================================
    // SINGLE-LANGUAGE CONTENT
    //
    // If the article doesn't have both versions,
    // the switch should not exist at all.
    // =====================================================

    if (
        !hasEnglish ||
        !hasPersian
    ) {

        return null;

    }


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


        const nextPath =
            languageRouteRegex.test(
                location.pathname
            )

                ? location.pathname.replace(
                    languageRouteRegex,
                    `/blog/${nextLanguage}`
                )

                : `/blog/${nextLanguage}`;


        const target =
            `${nextPath}${location.search}${location.hash}`;


        const reducedMotion =
            window.matchMedia(
                '(prefers-reduced-motion: reduce)'
            ).matches;


        const performNavigation = () => {

            flushSync(() => {

                navigate(
                    target
                );

            });

        };


        if (
            !document.startViewTransition ||
            reducedMotion
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


            transition.finished.finally(
                () => {

                    setIsTransitioning(false);

                }
            );

        } catch (error) {

            setIsTransitioning(false);

            performNavigation();

        }

    };


    return (

        <div
            dir="ltr"
            className="
                relative
                inline-grid
                grid-cols-2
                items-center
                gap-1
                p-1
                rounded-xl
                glass
                border
                border-black/5
                dark:border-white/10
                overflow-hidden
            "
            aria-label="Blog language"
        >

            <span
                aria-hidden="true"
                className="
                    absolute
                    top-1
                    bottom-1
                    left-1
                    rounded-lg
                    bg-gradient-to-r
                    from-primary-500
                    to-accent-cyan
                    shadow-sm
                    transition-transform
                    duration-500
                    ease-out
                "
                style={{
                    width:
                        'calc(50% - 4px)',

                    transform:
                        language === 'fa'
                            ? 'translateX(calc(100% + 4px))'
                            : 'translateX(0)'
                }}
            />


            <button
                type="button"
                onClick={() =>
                    changeLanguage('en')
                }
                aria-pressed={
                    language === 'en'
                }
                className={`
                    relative
                    z-10
                    min-w-[64px]
                    px-3
                    py-2
                    rounded-lg
                    text-sm
                    font-semibold
                    transition-colors
                    duration-300

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


            <button
                type="button"
                onClick={() =>
                    changeLanguage('fa')
                }
                aria-pressed={
                    language === 'fa'
                }
                className={`
                    relative
                    z-10
                    min-w-[64px]
                    px-3
                    py-2
                    rounded-lg
                    text-sm
                    font-semibold
                    transition-colors
                    duration-300

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
                فا
            </button>

        </div>

    );

}


export default LanguageSwitch;