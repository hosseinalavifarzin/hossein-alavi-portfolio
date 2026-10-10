import {
    useLocation,
    useNavigate
} from 'react-router-dom';

import './LanguageSwitch.css';


function LanguageSwitch({
    language = 'fa',

    availableLanguages = {
        fa: true,
        en: true
    }
}) {

    const location =
        useLocation();


    const navigate =
        useNavigate();


    // =====================================================
    // LANGUAGE AVAILABILITY
    // =====================================================

    const languageAvailable = (
        targetLanguage
    ) => {

        if (
            Array.isArray(
                availableLanguages
            )
        ) {

            return availableLanguages.includes(
                targetLanguage
            );

        }


        if (
            availableLanguages &&
            typeof availableLanguages === 'object'
        ) {

            return Boolean(
                availableLanguages[
                    targetLanguage
                ]
            );

        }


        return true;

    };


    // =====================================================
    // SWITCH LANGUAGE
    // =====================================================

    const changeLanguage = (
        targetLanguage
    ) => {

        if (
            targetLanguage ===
            language
        ) {

            return;

        }


        if (
            !languageAvailable(
                targetLanguage
            )
        ) {

            return;

        }


        const parts =
            location.pathname
                .split('/')
                .filter(Boolean);


        const blogIndex =
            parts.indexOf(
                'blog'
            );


        if (
            blogIndex !== -1
        ) {

            const languageIndex =
                blogIndex + 1;


            const currentLanguage =
                parts[
                    languageIndex
                ];


            if (
                currentLanguage === 'fa' ||
                currentLanguage === 'en'
            ) {

                parts[
                    languageIndex
                ] =
                    targetLanguage;

            } else {

                parts.splice(
                    languageIndex,
                    0,
                    targetLanguage
                );

            }


            navigate(
                `/${parts.join('/')}`
            );


            return;

        }


        navigate(
            `/blog/${targetLanguage}`
        );

    };


    return (

        <div
            className="language-switch-mini"
            role="group"
            aria-label="Language"
            dir="ltr"
        >

            <button
                type="button"

                onClick={() =>
                    changeLanguage(
                        'fa'
                    )
                }

                disabled={
                    !languageAvailable(
                        'fa'
                    )
                }

                aria-pressed={
                    language === 'fa'
                }

                aria-label="فارسی"

                className={`
                    language-switch-mini-button

                    ${
                        language === 'fa'
                            ? 'language-switch-mini-button-active'
                            : ''
                    }
                `}
            >

                FA

            </button>


            <span
                className="language-switch-mini-divider"
                aria-hidden="true"
            />


            <button
                type="button"

                onClick={() =>
                    changeLanguage(
                        'en'
                    )
                }

                disabled={
                    !languageAvailable(
                        'en'
                    )
                }

                aria-pressed={
                    language === 'en'
                }

                aria-label="English"

                className={`
                    language-switch-mini-button

                    ${
                        language === 'en'
                            ? 'language-switch-mini-button-active'
                            : ''
                    }
                `}
            >

                EN

            </button>

        </div>

    );

}


export default LanguageSwitch;