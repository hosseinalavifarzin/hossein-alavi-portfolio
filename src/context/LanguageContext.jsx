import {
    createContext,
    useContext,
    useEffect,
    useState
} from 'react';


const LanguageContext = createContext();


export const LanguageProvider = ({ children }) => {

    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('language') || 'en';
    });


    useEffect(() => {

        localStorage.setItem(
            'language',
            language
        );


        document.documentElement.lang =
            language === 'fa'
                ? 'fa'
                : 'en';


        document.documentElement.dir =
            language === 'fa'
                ? 'rtl'
                : 'ltr';

    }, [language]);


    const toggleLanguage = () => {

        setLanguage(
            currentLanguage =>
                currentLanguage === 'en'
                    ? 'fa'
                    : 'en'
        );

    };


    const isPersian =
        language === 'fa';


    return (

        <LanguageContext.Provider
            value={{
                language,
                setLanguage,
                toggleLanguage,
                isPersian
            }}
        >

            {children}

        </LanguageContext.Provider>

    );

};


export const useLanguage = () => {

    const context =
        useContext(LanguageContext);


    if (!context) {

        throw new Error(
            'useLanguage must be used inside LanguageProvider'
        );

    }


    return context;

};