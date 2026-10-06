import {
    useEffect,
    useLayoutEffect,
    useState
} from 'react';

import {
    Navigate,
    useParams
} from 'react-router-dom';

import MainNavBar
    from '../../Component/MainNavBar/MainNavBar';

import LanguageSwitch
    from '../../Component/LanguageSwitch/LanguageSwitch';

import Footer
    from '../../Component/footer/Footer';

import './Blog.css';


// =========================================================
// CATEGORIES
// =========================================================

const categories = [

    {
        id: 'all',
        en: 'All',
        fa: 'همه'
    },

    {
        id: 'product-discovery',
        en: 'Product Discovery',
        fa: 'کشف محصول'
    },

    {
        id: 'user-research',
        en: 'User Research',
        fa: 'تحقیق کاربر'
    },

    {
        id: 'problem-framing',
        en: 'Problem Framing',
        fa: 'تعریف مسئله'
    },

    {
        id: 'product-thinking',
        en: 'Product Thinking',
        fa: 'تفکر محصول'
    },

    {
        id: 'design-systems',
        en: 'Design Systems',
        fa: 'سیستم طراحی'
    }

];


// =========================================================
// CONTENT
// =========================================================

const content = {

    en: {

        badge:
            'Blog',

        title:
            'Product Design',

        highlightedTitle:
            'Notes & Thinking',

        description:
            'Practical articles about product design, user research, problem framing, product thinking, design systems, and complex digital products.',

        sectionTitle:
            'Product Design Articles',

        empty:
            'Articles in this category will appear here. We are building a focused collection of practical product design content.'

    },


    fa: {

        badge:
            'بلاگ',

        title:
            'یادداشت‌های',

        highlightedTitle:
            'طراحی محصول',

        description:
            'مقاله‌هایی کاربردی درباره طراحی محصول، تحقیق کاربر، تعریف مسئله، تفکر محصول، سیستم‌های طراحی و ساخت تجربه‌های دیجیتال بهتر.',

        sectionTitle:
            'مقاله‌های طراحی محصول',

        empty:
            'مقاله‌های این دسته در این بخش نمایش داده می‌شوند. هدف این بلاگ ساخت مجموعه‌ای کاربردی و عمیق درباره طراحی محصول است.'

    }

};


// =========================================================
// HELPERS
// =========================================================

function restoreAttribute(
    element,
    attribute,
    value
) {

    if (
        value === null
    ) {

        element.removeAttribute(
            attribute
        );

        return;

    }


    element.setAttribute(
        attribute,
        value
    );

}


// =========================================================
// BLOG
// =========================================================

function Blog() {

    const {
        language: routeLanguage
    } = useParams();


    const isValidLanguage =
        routeLanguage === 'en' ||
        routeLanguage === 'fa';


    const language =
        routeLanguage === 'fa'
            ? 'fa'
            : 'en';


    const isPersian =
        language === 'fa';


    const currentContent =
        content[language];


    const [activeCategory, setActiveCategory] =
        useState('all');


    // =====================================================
    // STABLE SITE SHELL
    // =====================================================

    useLayoutEffect(() => {

        if (
            !isValidLanguage
        ) {
            return undefined;
        }


        const htmlElement =
            document.documentElement;


        const previousLang =
            htmlElement.getAttribute(
                'lang'
            );


        const previousDirection =
            htmlElement.getAttribute(
                'dir'
            );


        /*
         * Important:
         *
         * The website shell always remains LTR.
         *
         * Persian RTL is applied only to the
         * localized Blog content.
         *
         * This prevents Navbar movement,
         * scrollbar movement and layout jumps.
         */

        htmlElement.setAttribute(
            'lang',
            language
        );


        htmlElement.setAttribute(
            'dir',
            'ltr'
        );


        return () => {

            restoreAttribute(
                htmlElement,
                'lang',
                previousLang
            );


            restoreAttribute(
                htmlElement,
                'dir',
                previousDirection
            );

        };

    }, [
        language,
        isValidLanguage
    ]);


    // =====================================================
    // PRELOAD PERSIAN FONT
    // =====================================================

    useEffect(() => {

        if (
            !document.fonts ||
            !document.fonts.load
        ) {
            return;
        }


        document.fonts.load(
            '400 16px Vazirmatn'
        );


        document.fonts.load(
            '600 16px Vazirmatn'
        );


        document.fonts.load(
            '700 32px Vazirmatn'
        );

    }, []);


    // =====================================================
    // SEO
    // =====================================================

    useEffect(() => {

        if (
            !isValidLanguage
        ) {
            return undefined;
        }


        const previousTitle =
            document.title;


        const title =
            isPersian

                ? 'بلاگ طراحی محصول | حسین علوی'

                : 'Product Design Blog | Hossein Alavi';


        const description =
            isPersian

                ? 'مقاله‌های حسین علوی درباره طراحی محصول، تحقیق کاربر، تعریف مسئله، تفکر محصول، سیستم طراحی و تجربه کاربری.'

                : 'Product design articles by Hossein Alavi about user research, problem framing, product thinking, design systems, UX, and complex digital products.';


        const canonicalUrl =
            `https://hosseinalavifarzin.ir/blog/${language}/`;


        document.title =
            title;


        const managedElements = [];


        // =================================================
        // META
        // =================================================

        const manageMeta = (
            selector,
            attributes
        ) => {

            let element =
                document.head.querySelector(
                    selector
                );


            const created =
                !element;


            if (
                !element
            ) {

                element =
                    document.createElement(
                        'meta'
                    );


                document.head.appendChild(
                    element
                );

            }


            const previousValues = {};


            Object.entries(
                attributes
            ).forEach(
                ([
                    attribute,
                    value
                ]) => {

                    previousValues[
                        attribute
                    ] =
                        element.getAttribute(
                            attribute
                        );


                    element.setAttribute(
                        attribute,
                        value
                    );

                }
            );


            managedElements.push(
                () => {

                    if (
                        created
                    ) {

                        element.remove();

                        return;

                    }


                    Object.entries(
                        previousValues
                    ).forEach(
                        ([
                            attribute,
                            value
                        ]) => {

                            restoreAttribute(
                                element,
                                attribute,
                                value
                            );

                        }
                    );

                }
            );

        };


        // =================================================
        // LINK
        // =================================================

        const manageLink = (
            selector,
            attributes
        ) => {

            let element =
                document.head.querySelector(
                    selector
                );


            const created =
                !element;


            if (
                !element
            ) {

                element =
                    document.createElement(
                        'link'
                    );


                document.head.appendChild(
                    element
                );

            }


            const previousValues = {};


            Object.entries(
                attributes
            ).forEach(
                ([
                    attribute,
                    value
                ]) => {

                    previousValues[
                        attribute
                    ] =
                        element.getAttribute(
                            attribute
                        );


                    element.setAttribute(
                        attribute,
                        value
                    );

                }
            );


            managedElements.push(
                () => {

                    if (
                        created
                    ) {

                        element.remove();

                        return;

                    }


                    Object.entries(
                        previousValues
                    ).forEach(
                        ([
                            attribute,
                            value
                        ]) => {

                            restoreAttribute(
                                element,
                                attribute,
                                value
                            );

                        }
                    );

                }
            );

        };


        // =================================================
        // DESCRIPTION
        // =================================================

        manageMeta(
            'meta[name="description"]',
            {
                name:
                    'description',

                content:
                    description
            }
        );


        // =================================================
        // OPEN GRAPH
        // =================================================

        manageMeta(
            'meta[property="og:title"]',
            {
                property:
                    'og:title',

                content:
                    title
            }
        );


        manageMeta(
            'meta[property="og:description"]',
            {
                property:
                    'og:description',

                content:
                    description
            }
        );


        manageMeta(
            'meta[property="og:url"]',
            {
                property:
                    'og:url',

                content:
                    canonicalUrl
            }
        );


        manageMeta(
            'meta[property="og:locale"]',
            {
                property:
                    'og:locale',

                content:
                    isPersian
                        ? 'fa_IR'
                        : 'en_US'
            }
        );


        manageMeta(
            'meta[property="og:locale:alternate"]',
            {
                property:
                    'og:locale:alternate',

                content:
                    isPersian
                        ? 'en_US'
                        : 'fa_IR'
            }
        );


        // =================================================
        // TWITTER
        // =================================================

        manageMeta(
            'meta[name="twitter:title"]',
            {
                name:
                    'twitter:title',

                content:
                    title
            }
        );


        manageMeta(
            'meta[name="twitter:description"]',
            {
                name:
                    'twitter:description',

                content:
                    description
            }
        );


        // =================================================
        // CANONICAL
        // =================================================

        manageLink(
            'link[rel="canonical"]',
            {
                rel:
                    'canonical',

                href:
                    canonicalUrl
            }
        );


        // =================================================
        // HREFLANG — EN
        // =================================================

        manageLink(
            'link[rel="alternate"][hreflang="en"]',
            {
                rel:
                    'alternate',

                hreflang:
                    'en',

                href:
                    'https://hosseinalavifarzin.ir/blog/en/'
            }
        );


        // =================================================
        // HREFLANG — FA
        // =================================================

        manageLink(
            'link[rel="alternate"][hreflang="fa"]',
            {
                rel:
                    'alternate',

                hreflang:
                    'fa',

                href:
                    'https://hosseinalavifarzin.ir/blog/fa/'
            }
        );


        // =================================================
        // HREFLANG — DEFAULT
        // =================================================

        manageLink(
            'link[rel="alternate"][hreflang="x-default"]',
            {
                rel:
                    'alternate',

                hreflang:
                    'x-default',

                href:
                    'https://hosseinalavifarzin.ir/blog/en/'
            }
        );


        // =================================================
        // CLEANUP
        // =================================================

        return () => {

            document.title =
                previousTitle;


            managedElements
                .reverse()
                .forEach(
                    (restore) =>
                        restore()
                );

        };

    }, [
        language,
        isPersian,
        isValidLanguage
    ]);


    // =====================================================
    // INVALID LANGUAGE
    // =====================================================

    if (
        !isValidLanguage
    ) {

        return (

            <Navigate
                to="/blog/en"
                replace
            />

        );

    }


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <main className="
            min-h-screen
            bg-theme-primary
        ">


            {/* =================================================
                GLOBAL SITE HEADER
                ALWAYS ENGLISH / LTR / ORIGINAL FONT
            ================================================== */}

            <div
                lang="en"
                dir="ltr"
                className="
                    blog-site-chrome
                "
            >

                <MainNavBar />

            </div>


            {/* =================================================
                BLOG HERO
            ================================================== */}

            <section className="
                relative
                pt-28
                sm:pt-36
                pb-16
                sm:pb-20
                overflow-hidden
            ">

                {/* Background */}
                <div className="
                    absolute
                    inset-0
                    pointer-events-none
                ">

                    <div className="
                        absolute
                        -top-24
                        -left-24
                        w-[420px]
                        h-[420px]
                        bg-primary-500/10
                        rounded-full
                        blur-3xl
                    " />


                    <div className="
                        absolute
                        top-20
                        right-0
                        w-[350px]
                        h-[350px]
                        bg-accent-cyan/10
                        rounded-full
                        blur-3xl
                    " />

                </div>


                <div className="
                    container
                    mx-auto
                    px-4
                    relative
                    z-10
                ">

                    <div className="
                        max-w-4xl
                        mx-auto
                    ">


                        {/* =========================================
                            LANGUAGE CONTROL
                            OUTSIDE LOCALIZED TRANSITION
                        ========================================== */}

                        <div
                            lang="en"
                            dir="ltr"
                            className="
                                blog-language-toolbar
                                flex
                                items-center
                                justify-center
                                sm:justify-end
                                mb-8
                                sm:mb-10
                            "
                        >

                            <LanguageSwitch
                                language={
                                    language
                                }
                            />

                        </div>


                        {/* =========================================
                            LOCALIZED HERO
                        ========================================== */}

                        <div
                            key={
                                `blog-hero-${language}`
                            }
                            lang={
                                language
                            }
                            dir={
                                isPersian
                                    ? 'rtl'
                                    : 'ltr'
                            }
                            className={`
                                blog-hero-localized
                                text-center

                                ${
                                    isPersian
                                        ? 'blog-content-fa'
                                        : ''
                                }
                            `}
                        >

                            <span className="
                                inline-block
                                px-3
                                sm:px-4
                                py-1.5
                                sm:py-2
                                rounded-full
                                glass-light
                                text-primary-500
                                text-xs
                                sm:text-sm
                                font-medium
                                mb-5
                            ">

                                {
                                    currentContent.badge
                                }

                            </span>


                            <h1 className="
                                text-4xl
                                sm:text-5xl
                                lg:text-6xl
                                font-bold
                                text-theme-primary
                                leading-tight
                                mb-6
                            ">

                                {
                                    currentContent.title
                                }

                                {' '}

                                <span className="
                                    gradient-text
                                ">

                                    {
                                        currentContent.highlightedTitle
                                    }

                                </span>

                            </h1>


                            <p className="
                                text-theme-secondary
                                text-base
                                sm:text-lg
                                leading-relaxed
                                max-w-2xl
                                mx-auto
                            ">

                                {
                                    currentContent.description
                                }

                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* =================================================
                BLOG ARTICLES / CATEGORIES
            ================================================== */}

            <section className="
                py-14
                sm:py-20
                bg-theme-secondary
            ">

                <div className="
                    container
                    mx-auto
                    px-4
                ">

                    <div
                        key={
                            `blog-content-${language}`
                        }
                        lang={
                            language
                        }
                        dir={
                            isPersian
                                ? 'rtl'
                                : 'ltr'
                        }
                        className={`
                            blog-list-localized

                            ${
                                isPersian
                                    ? 'blog-content-fa'
                                    : ''
                            }
                        `}
                    >


                        {/* =========================================
                            CATEGORIES
                        ========================================== */}

                        <div className="
                            flex
                            flex-wrap
                            items-center
                            justify-center
                            gap-3
                            mb-12
                        ">

                            {categories.map(
                                (category) => (

                                    <button
                                        key={
                                            category.id
                                        }
                                        type="button"
                                        onClick={() =>
                                            setActiveCategory(
                                                category.id
                                            )
                                        }
                                        className={`
                                            px-4
                                            py-2
                                            rounded-xl
                                            text-sm
                                            font-medium
                                            transition-all
                                            duration-300

                                            ${
                                                activeCategory ===
                                                category.id

                                                    ? `
                                                        bg-primary-500
                                                        text-white
                                                        shadow-glow-green
                                                    `

                                                    : `
                                                        glass
                                                        text-theme-secondary
                                                        hover:text-theme-primary
                                                    `
                                            }
                                        `}
                                    >

                                        {
                                            category[
                                                language
                                            ]
                                        }

                                    </button>

                                )
                            )}

                        </div>


                        {/* =========================================
                            TEMP ARTICLE AREA
                        ========================================== */}

                        <div className="
                            max-w-3xl
                            mx-auto
                            glass
                            rounded-xl
                            sm:rounded-2xl
                            p-8
                            sm:p-10
                            text-center
                        ">

                            <p className="
                                text-primary-500
                                text-xs
                                font-semibold
                                mb-4
                            ">

                                {
                                    categories.find(
                                        (
                                            category
                                        ) =>
                                            category.id ===
                                            activeCategory
                                    )?.[language]
                                }

                            </p>


                            <h2 className="
                                text-2xl
                                sm:text-3xl
                                font-bold
                                text-theme-primary
                                mb-4
                            ">

                                {
                                    currentContent.sectionTitle
                                }

                            </h2>


                            <p className="
                                text-theme-secondary
                                leading-relaxed
                            ">

                                {
                                    currentContent.empty
                                }

                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* =================================================
                GLOBAL FOOTER
                ALWAYS ORIGINAL SITE STYLE
            ================================================== */}

            <div
                lang="en"
                dir="ltr"
                className="
                    blog-site-chrome
                "
            >

                <Footer />

            </div>


        </main>

    );

}


export default Blog;