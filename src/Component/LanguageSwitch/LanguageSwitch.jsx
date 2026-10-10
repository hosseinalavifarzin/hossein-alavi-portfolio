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
    // CHECK LANGUAGE AVAILABILITY
    // Supports object or array formats
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
    // SWITCH
    // Keeps current article slug when switching language
    // =====================================================

    const changeLanguage = (
        targetLanguage
    ) => {

        if (
            targetLanguage === language
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


            if (
                parts[
                    languageIndex
                ] === 'fa' ||
                parts[
                    languageIndex
                ] === 'en'
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
                onClick={
                    () =>
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
                onClick={
                    () =>
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