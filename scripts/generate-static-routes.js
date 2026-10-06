const fs = require('fs');
const path = require('path');


// =========================================================
// CONFIG
// =========================================================

const buildDirectory =
    path.join(__dirname, '..', 'build');

const sourceIndex =
    path.join(buildDirectory, 'index.html');

const sitemapPath =
    path.join(buildDirectory, 'sitemap.xml');

const baseUrl =
    'https://hosseinalavifarzin.ir';

const profileImage =
    `${baseUrl}/hossein.jpeg`;


// =========================================================
// ROUTES
// =========================================================

const routes = [

    // =====================================================
    // PORTFOLIO
    // =====================================================
    {
        path:
            'portfolio',

        title:
            'Product Design Portfolio | Hossein Alavi',

        description:
            'Product design portfolio of Hossein Alavi featuring case studies across logistics, travel technology, B2B platforms, internal tools, booking products, and design systems.',

        canonicalPath:
            'portfolio',

        language:
            'en',

        /*
         * The global website shell always stays LTR.
         * Persian Blog content handles RTL inside React.
         */
        direction:
            'ltr',

        robots:
            'index, follow, max-image-preview:large',

        ogLocale:
            'en_US',

        schemaType:
            'CollectionPage',

        changefreq:
            'monthly',

        priority:
            '0.9'
    },


    // =====================================================
    // BLOG GATEWAY
    //
    // /blog/ is NOT an indexable page.
    // React redirects it to /blog/en/
    // =====================================================
    {
        path:
            'blog',

        title:
            'Product Design Blog | Hossein Alavi',

        description:
            'Product design articles by Hossein Alavi about user research, problem framing, product thinking, design systems, UX, and complex digital products.',

        canonicalPath:
            'blog/en',

        language:
            'en',

        direction:
            'ltr',

        robots:
            'noindex, follow',

        ogLocale:
            'en_US',

        schemaType:
            null,

        alternateLanguages: {
            en:
                'blog/en',

            fa:
                'blog/fa',

            'x-default':
                'blog/en'
        },

        includeInSitemap:
            false
    },


    // =====================================================
    // BLOG — ENGLISH
    // =====================================================
    {
        path:
            'blog/en',

        title:
            'Product Design Blog | Hossein Alavi',

        description:
            'Product design articles by Hossein Alavi about user research, problem framing, product thinking, design systems, UX, and complex digital products.',

        canonicalPath:
            'blog/en',

        language:
            'en',

        direction:
            'ltr',

        robots:
            'index, follow, max-image-preview:large',

        ogLocale:
            'en_US',

        ogLocaleAlternate:
            'fa_IR',

        schemaType:
            'Blog',

        alternateLanguages: {
            en:
                'blog/en',

            fa:
                'blog/fa',

            'x-default':
                'blog/en'
        },

        changefreq:
            'weekly',

        priority:
            '0.8'
    },


    // =====================================================
    // BLOG — PERSIAN
    // =====================================================
    {
        path:
            'blog/fa',

        title:
            'بلاگ طراحی محصول | حسین علوی',

        description:
            'مقاله‌های حسین علوی درباره طراحی محصول، تحقیق کاربر، تعریف مسئله، تفکر محصول، سیستم طراحی و تجربه کاربری.',

        canonicalPath:
            'blog/fa',

        language:
            'fa',

        /*
         * IMPORTANT:
         * Keep the global document shell LTR.
         *
         * Blog.jsx applies:
         *
         * dir="rtl"
         *
         * only to Persian Blog content.
         *
         * This prevents Navbar / Theme Toggle /
         * Download CV / scrollbar layout jumps.
         */
        direction:
            'ltr',

        robots:
            'index, follow, max-image-preview:large',

        ogLocale:
            'fa_IR',

        ogLocaleAlternate:
            'en_US',

        schemaType:
            'Blog',

        alternateLanguages: {
            en:
                'blog/en',

            fa:
                'blog/fa',

            'x-default':
                'blog/en'
        },

        changefreq:
            'weekly',

        priority:
            '0.8'
    },


    // =====================================================
    // TIPAX
    // =====================================================
    {
        path:
            'projects/tipax',

        title:
            'Tipax Logistics Platform | Product Design Case Study | Hossein Alavi',

        description:
            'Product design case study by Hossein Alavi for an internal Tipax logistics operations platform, focused on complex workflows, information hierarchy, and scalable interaction patterns.',

        canonicalPath:
            'projects/tipax',

        language:
            'en',

        direction:
            'ltr',

        robots:
            'index, follow, max-image-preview:large',

        ogLocale:
            'en_US',

        schemaType:
            'CreativeWork',

        changefreq:
            'monthly',

        priority:
            '0.8'
    },


    // =====================================================
    // CITYNET
    // =====================================================
    {
        path:
            'projects/citynet',

        title:
            'Citynet Travel-Tech Ecosystem | Product Design Case Study | Hossein Alavi',

        description:
            'Product design case study by Hossein Alavi for Citynet, covering a travel-tech product ecosystem, B2B and B2C experiences, internal tools, reporting, and a scalable design system.',

        canonicalPath:
            'projects/citynet',

        language:
            'en',

        direction:
            'ltr',

        robots:
            'index, follow, max-image-preview:large',

        ogLocale:
            'en_US',

        schemaType:
            'CreativeWork',

        changefreq:
            'monthly',

        priority:
            '0.8'
    },


    // =====================================================
    // BLULEXI
    // =====================================================
    {
        path:
            'projects/blue',

        title:
            'BluLexi AI Language Learning Platform | Product Design Case Study | Hossein Alavi',

        description:
            'Product design case study by Hossein Alavi for BluLexi, an AI-assisted language learning platform connecting assessment, practice, feedback, progress, and exam preparation.',

        canonicalPath:
            'projects/blue',

        language:
            'en',

        direction:
            'ltr',

        robots:
            'index, follow, max-image-preview:large',

        ogLocale:
            'en_US',

        schemaType:
            'CreativeWork',

        changefreq:
            'monthly',

        priority:
            '0.8'
    },


    // =====================================================
    // 3CLICK
    // =====================================================
    {
        path:
            'projects/3click',

        title:
            '3Click Travel Booking Redesign | Product Design Case Study | Hossein Alavi',

        description:
            'Product design case study by Hossein Alavi for 3Click, covering travel booking experiences, customer-facing products, CMS tools, internal workflows, and a shared design system.',

        canonicalPath:
            'projects/3click',

        language:
            'en',

        direction:
            'ltr',

        robots:
            'index, follow, max-image-preview:large',

        ogLocale:
            'en_US',

        schemaType:
            'CreativeWork',

        changefreq:
            'monthly',

        priority:
            '0.8'
    },


    // =====================================================
    // DARZI
    // =====================================================
    {
        path:
            'projects/darzi',

        title:
            'Darzi Automotive E-commerce | Product Design Case Study | Hossein Alavi',

        description:
            'Product design case study by Hossein Alavi for Darzi, a premium automotive e-commerce experience focused on product confidence, craftsmanship, usability, and brand experience.',

        canonicalPath:
            'projects/darzi',

        language:
            'en',

        direction:
            'ltr',

        robots:
            'index, follow, max-image-preview:large',

        ogLocale:
            'en_US',

        schemaType:
            'CreativeWork',

        changefreq:
            'monthly',

        priority:
            '0.8'
    },


    // =====================================================
    // YAHOO BOOKING
    // =====================================================
    {
        path:
            'projects/yahoo',

        title:
            'Yahoo Booking | Accommodation Product Design Case Study | Hossein Alavi',

        description:
            'Product design case study by Hossein Alavi for a localized accommodation booking platform designed around Persian, RTL, travel discovery, comparison, and booking experiences.',

        canonicalPath:
            'projects/yahoo',

        language:
            'en',

        direction:
            'ltr',

        robots:
            'index, follow, max-image-preview:large',

        ogLocale:
            'en_US',

        schemaType:
            'CreativeWork',

        changefreq:
            'monthly',

        priority:
            '0.8'
    }

];


// =========================================================
// URL
// =========================================================

function createAbsoluteUrl(
    routePath = ''
) {

    const cleanPath =
        String(routePath)
            .replace(/^\/+/, '')
            .replace(/\/+$/, '');


    if (
        !cleanPath
    ) {

        return `${baseUrl}/`;

    }


    return `${baseUrl}/${cleanPath}/`;

}


// =========================================================
// ESCAPE HTML
// =========================================================

function escapeHtml(
    value = ''
) {

    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

}


// =========================================================
// ESCAPE XML
// =========================================================

function escapeXml(
    value = ''
) {

    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

}


// =========================================================
// REPLACE OR INSERT HEAD TAG
// =========================================================

function replaceHeadTag(
    html,
    selectorRegex,
    replacement
) {

    if (
        selectorRegex.test(html)
    ) {

        return html.replace(
            selectorRegex,
            replacement
        );

    }


    return html.replace(
        '</head>',
        `    ${replacement}\n  </head>`
    );

}


// =========================================================
// HTML LANG / DIR
//
// Preserve any other existing <html> attributes.
// =========================================================

function setHtmlAttributes(
    html,
    language,
    direction
) {

    return html.replace(
        /<html\b([^>]*)>/i,

        (
            match,
            attributes = ''
        ) => {

            const cleanedAttributes =
                attributes
                    .replace(
                        /\s+lang=(["'])[^"']*\1/i,
                        ''
                    )
                    .replace(
                        /\s+dir=(["'])[^"']*\1/i,
                        ''
                    );


            return (
                `<html${cleanedAttributes} lang="${escapeHtml(language)}" dir="${escapeHtml(direction)}">`
            );

        }
    );

}


// =========================================================
// TITLE
// =========================================================

function replaceTitle(
    html,
    title
) {

    const escapedTitle =
        escapeHtml(
            title
        );


    if (
        /<title>[\s\S]*?<\/title>/i.test(
            html
        )
    ) {

        return html.replace(
            /<title>[\s\S]*?<\/title>/i,

            `<title>${escapedTitle}</title>`
        );

    }


    return html.replace(
        '</head>',

        `    <title>${escapedTitle}</title>\n  </head>`
    );

}


// =========================================================
// REMOVE EXISTING HREFLANG LINKS
//
// This avoids duplicate hreflang tags copied from
// the source homepage.
// =========================================================

function removeAlternateLanguages(
    html
) {

    return html.replace(
        /\s*<link\b(?=[^>]*\brel=["']alternate["'])(?=[^>]*\bhreflang=["'][^"']+["'])[^>]*>\s*/gi,
        '\n'
    );

}


// =========================================================
// ADD HREFLANG
// =========================================================

function addAlternateLanguages(
    html,
    alternateLanguages
) {

    if (
        !alternateLanguages
    ) {

        return html;

    }


    const links =
        Object.entries(
            alternateLanguages
        )
            .map(
                ([
                    language,
                    routePath
                ]) => {

                    const href =
                        createAbsoluteUrl(
                            routePath
                        );


                    return (
                        `    <link rel="alternate" hreflang="${escapeHtml(language)}" href="${escapeHtml(href)}" />`
                    );

                }
            )
            .join('\n');


    return html.replace(
        '</head>',

        `${links}\n  </head>`
    );

}


// =========================================================
// REMOVE OG ALTERNATE LOCALES
// =========================================================

function removeOgLocaleAlternates(
    html
) {

    return html.replace(
        /\s*<meta[^>]+property=["']og:locale:alternate["'][^>]*>\s*/gi,
        '\n'
    );

}


// =========================================================
// PERSON SCHEMA
// =========================================================

function createPersonSchema() {

    return {

        '@type':
            'Person',

        '@id':
            `${baseUrl}/#hossein-alavi`,

        name:
            'Hossein Alavi',

        alternateName:
            'حسین علوی',

        jobTitle:
            'Product Designer',

        url:
            `${baseUrl}/`,

        image: {

            '@type':
                'ImageObject',

            '@id':
                `${baseUrl}/#profile-image`,

            url:
                profileImage,

            contentUrl:
                profileImage,

            caption:
                'Hossein Alavi, Product Designer'

        }

    };

}


// =========================================================
// WEBSITE SCHEMA
// =========================================================

function createWebsiteSchema() {

    return {

        '@type':
            'WebSite',

        '@id':
            `${baseUrl}/#website`,

        url:
            `${baseUrl}/`,

        name:
            'Hossein Alavi',

        alternateName:
            'Hossein Alavi Product Design',

        inLanguage: [
            'en',
            'fa'
        ]

    };

}


// =========================================================
// PAGE SCHEMA
// =========================================================

function createPageSchema(
    route,
    routeUrl
) {

    const personId =
        `${baseUrl}/#hossein-alavi`;

    const websiteId =
        `${baseUrl}/#website`;


    // =====================================================
    // BLOG
    // =====================================================

    if (
        route.schemaType ===
        'Blog'
    ) {

        return {

            '@type':
                'Blog',

            '@id':
                `${routeUrl}#blog`,

            url:
                routeUrl,

            name:
                route.title,

            description:
                route.description,

            inLanguage:
                route.language,

            author: {
                '@id':
                    personId
            },

            publisher: {
                '@id':
                    personId
            },

            isPartOf: {
                '@id':
                    websiteId
            }

        };

    }


    // =====================================================
    // PORTFOLIO
    // =====================================================

    if (
        route.schemaType ===
        'CollectionPage'
    ) {

        return {

            '@type':
                'CollectionPage',

            '@id':
                `${routeUrl}#webpage`,

            url:
                routeUrl,

            name:
                route.title,

            description:
                route.description,

            inLanguage:
                route.language,

            about: {
                '@id':
                    personId
            },

            author: {
                '@id':
                    personId
            },

            isPartOf: {
                '@id':
                    websiteId
            }

        };

    }


    // =====================================================
    // CASE STUDY
    // =====================================================

    if (
        route.schemaType ===
        'CreativeWork'
    ) {

        return {

            '@type':
                'WebPage',

            '@id':
                `${routeUrl}#webpage`,

            url:
                routeUrl,

            name:
                route.title,

            description:
                route.description,

            inLanguage:
                route.language,

            author: {
                '@id':
                    personId
            },

            isPartOf: {
                '@id':
                    websiteId
            },

            mainEntity: {

                '@type':
                    'CreativeWork',

                '@id':
                    `${routeUrl}#case-study`,

                url:
                    routeUrl,

                name:
                    route.title,

                description:
                    route.description,

                inLanguage:
                    route.language,

                author: {
                    '@id':
                        personId
                }

            }

        };

    }


    // =====================================================
    // DEFAULT
    // =====================================================

    return {

        '@type':
            'WebPage',

        '@id':
            `${routeUrl}#webpage`,

        url:
            routeUrl,

        name:
            route.title,

        description:
            route.description,

        inLanguage:
            route.language,

        author: {
            '@id':
                personId
        },

        isPartOf: {
            '@id':
                websiteId
        }

    };

}


// =========================================================
// COMPLETE STRUCTURED DATA
// =========================================================

function createStructuredData(
    route,
    routeUrl
) {

    return {

        '@context':
            'https://schema.org',

        '@graph': [

            createWebsiteSchema(),

            createPersonSchema(),

            createPageSchema(
                route,
                routeUrl
            )

        ]

    };

}


// =========================================================
// REMOVE ALL OLD JSON-LD
//
// Important:
// Do not leave homepage ProfilePage JSON-LD
// inside Portfolio / Blog / Project pages.
// =========================================================

function removeStructuredData(
    html
) {

    return html.replace(
        /\s*<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>\s*/gi,
        '\n'
    );

}


// =========================================================
// ADD ROUTE STRUCTURED DATA
// =========================================================

function addStructuredData(
    html,
    structuredData
) {

    const replacement =
        `    <script type="application/ld+json">
${JSON.stringify(
            structuredData,
            null,
            2
        )}
    </script>`;


    return html.replace(
        '</head>',

        `${replacement}\n  </head>`
    );

}


// =========================================================
// GENERATE STATIC ROUTE
// =========================================================

function generateRoute(
    sourceHtml,
    route
) {

    const routeDirectory =
        path.join(
            buildDirectory,
            ...route.path.split('/')
        );


    const routeIndex =
        path.join(
            routeDirectory,
            'index.html'
        );


    const canonicalUrl =
        createAbsoluteUrl(
            route.canonicalPath ||
            route.path
        );


    const title =
        escapeHtml(
            route.title
        );


    const description =
        escapeHtml(
            route.description
        );


    let html =
        sourceHtml;


    // =====================================================
    // HTML LANGUAGE + DIRECTION
    // =====================================================

    html =
        setHtmlAttributes(
            html,
            route.language || 'en',
            route.direction || 'ltr'
        );


    // =====================================================
    // TITLE
    // =====================================================

    html =
        replaceTitle(
            html,
            route.title
        );


    // =====================================================
    // DESCRIPTION
    // =====================================================

    html =
        replaceHeadTag(

            html,

            /<meta[^>]+name=["']description["'][^>]*>/i,

            `<meta name="description" content="${description}" />`

        );


    // =====================================================
    // ROBOTS
    // =====================================================

    html =
        replaceHeadTag(

            html,

            /<meta[^>]+name=["']robots["'][^>]*>/i,

            `<meta name="robots" content="${escapeHtml(
                route.robots ||
                'index, follow, max-image-preview:large'
            )}" />`

        );


    // =====================================================
    // CANONICAL
    // =====================================================

    html =
        replaceHeadTag(

            html,

            /<link[^>]+rel=["']canonical["'][^>]*>/i,

            `<link rel="canonical" href="${canonicalUrl}" />`

        );


    // =====================================================
    // OPEN GRAPH TYPE
    // =====================================================

    html =
        replaceHeadTag(

            html,

            /<meta[^>]+property=["']og:type["'][^>]*>/i,

            '<meta property="og:type" content="website" />'

        );


    // =====================================================
    // OPEN GRAPH TITLE
    // =====================================================

    html =
        replaceHeadTag(

            html,

            /<meta[^>]+property=["']og:title["'][^>]*>/i,

            `<meta property="og:title" content="${title}" />`

        );


    // =====================================================
    // OPEN GRAPH DESCRIPTION
    // =====================================================

    html =
        replaceHeadTag(

            html,

            /<meta[^>]+property=["']og:description["'][^>]*>/i,

            `<meta property="og:description" content="${description}" />`

        );


    // =====================================================
    // OPEN GRAPH URL
    // =====================================================

    html =
        replaceHeadTag(

            html,

            /<meta[^>]+property=["']og:url["'][^>]*>/i,

            `<meta property="og:url" content="${canonicalUrl}" />`

        );


    // =====================================================
    // OPEN GRAPH IMAGE
    // =====================================================

    html =
        replaceHeadTag(

            html,

            /<meta[^>]+property=["']og:image["'][^>]*>/i,

            `<meta property="og:image" content="${profileImage}" />`

        );


    // =====================================================
    // OPEN GRAPH IMAGE ALT
    // =====================================================

    html =
        replaceHeadTag(

            html,

            /<meta[^>]+property=["']og:image:alt["'][^>]*>/i,

            '<meta property="og:image:alt" content="Hossein Alavi, Product Designer" />'

        );


    // =====================================================
    // OPEN GRAPH LOCALE
    // =====================================================

    html =
        replaceHeadTag(

            html,

            /<meta[^>]+property=["']og:locale["'][^>]*>/i,

            `<meta property="og:locale" content="${escapeHtml(
                route.ogLocale ||
                'en_US'
            )}" />`

        );


    // =====================================================
    // REMOVE OLD OG ALTERNATE LOCALES
    // =====================================================

    html =
        removeOgLocaleAlternates(
            html
        );


    // =====================================================
    // ADD OG ALTERNATE LOCALE
    // =====================================================

    if (
        route.ogLocaleAlternate
    ) {

        html =
            html.replace(

                '</head>',

                `    <meta property="og:locale:alternate" content="${escapeHtml(
                    route.ogLocaleAlternate
                )}" />\n  </head>`

            );

    }


    // =====================================================
    // TWITTER CARD
    // =====================================================

    html =
        replaceHeadTag(

            html,

            /<meta[^>]+name=["']twitter:card["'][^>]*>/i,

            '<meta name="twitter:card" content="summary_large_image" />'

        );


    // =====================================================
    // TWITTER TITLE
    // =====================================================

    html =
        replaceHeadTag(

            html,

            /<meta[^>]+name=["']twitter:title["'][^>]*>/i,

            `<meta name="twitter:title" content="${title}" />`

        );


    // =====================================================
    // TWITTER DESCRIPTION
    // =====================================================

    html =
        replaceHeadTag(

            html,

            /<meta[^>]+name=["']twitter:description["'][^>]*>/i,

            `<meta name="twitter:description" content="${description}" />`

        );


    // =====================================================
    // TWITTER IMAGE
    // =====================================================

    html =
        replaceHeadTag(

            html,

            /<meta[^>]+name=["']twitter:image["'][^>]*>/i,

            `<meta name="twitter:image" content="${profileImage}" />`

        );


    // =====================================================
    // TWITTER IMAGE ALT
    // =====================================================

    html =
        replaceHeadTag(

            html,

            /<meta[^>]+name=["']twitter:image:alt["'][^>]*>/i,

            '<meta name="twitter:image:alt" content="Hossein Alavi, Product Designer" />'

        );


    // =====================================================
    // HREFLANG
    // =====================================================

    html =
        removeAlternateLanguages(
            html
        );


    html =
        addAlternateLanguages(
            html,
            route.alternateLanguages
        );


    // =====================================================
    // STRUCTURED DATA
    // =====================================================

    html =
        removeStructuredData(
            html
        );


    if (
        route.schemaType
    ) {

        html =
            addStructuredData(

                html,

                createStructuredData(
                    route,
                    canonicalUrl
                )

            );

    }


    // =====================================================
    // CREATE DIRECTORY
    // =====================================================

    fs.mkdirSync(

        routeDirectory,

        {
            recursive:
                true
        }

    );


    // =====================================================
    // WRITE FILE
    // =====================================================

    fs.writeFileSync(

        routeIndex,

        html,

        'utf8'

    );


    console.log(
        `Created SEO route: /${route.path}/`
    );

}


// =========================================================
// GENERATE SITEMAP
// =========================================================

function generateSitemap() {

    const sitemapRoutes = [

        // Homepage
        {
            url:
                `${baseUrl}/`,

            changefreq:
                'monthly',

            priority:
                '1.0'
        },


        // Generated routes
        ...routes
            .filter(
                (route) =>
                    route.includeInSitemap !==
                    false
            )
            .map(
                (route) => ({

                    url:
                        createAbsoluteUrl(
                            route.path
                        ),

                    changefreq:
                        route.changefreq ||
                        'monthly',

                    priority:
                        route.priority ||
                        '0.8',

                    alternateLanguages:
                        route.alternateLanguages

                })
            )

    ];


    const entries =
        sitemapRoutes
            .map(
                (route) => {

                    const alternateLinks =
                        route.alternateLanguages

                            ? Object.entries(
                                route.alternateLanguages
                            )
                                .map(
                                    ([
                                        language,
                                        alternatePath
                                    ]) => {

                                        const alternateUrl =
                                            createAbsoluteUrl(
                                                alternatePath
                                            );


                                        return (
                                            `    <xhtml:link rel="alternate" hreflang="${escapeXml(language)}" href="${escapeXml(alternateUrl)}" />`
                                        );

                                    }
                                )
                                .join('\n')

                            : '';


                    return [
                        '  <url>',

                        `    <loc>${escapeXml(
                            route.url
                        )}</loc>`,

                        alternateLinks,

                        `    <changefreq>${escapeXml(
                            route.changefreq
                        )}</changefreq>`,

                        `    <priority>${escapeXml(
                            route.priority
                        )}</priority>`,

                        '  </url>'

                    ]
                        .filter(Boolean)
                        .join('\n');

                }
            )
            .join('\n\n');


    const sitemap =
        `<?xml version="1.0" encoding="UTF-8"?>
<urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xhtml="http://www.w3.org/1999/xhtml"
>

${entries}

</urlset>
`;


    fs.writeFileSync(

        sitemapPath,

        sitemap,

        'utf8'

    );


    console.log(
        'Created sitemap.xml'
    );

}


// =========================================================
// VALIDATE BUILD
// =========================================================

if (
    !fs.existsSync(
        sourceIndex
    )
) {

    console.error('');
    console.error(
        'build/index.html was not found.'
    );

    console.error(
        'Run npm run build first.'
    );

    console.error('');

    process.exit(1);

}


// =========================================================
// READ SOURCE
// =========================================================

const sourceHtml =
    fs.readFileSync(
        sourceIndex,
        'utf8'
    );


// =========================================================
// GENERATE ALL STATIC ROUTES
// =========================================================

routes.forEach(
    (route) => {

        generateRoute(
            sourceHtml,
            route
        );

    }
);


// =========================================================
// GENERATE SITEMAP
// =========================================================

generateSitemap();


// =========================================================
// SUCCESS
// =========================================================

console.log('');
console.log(
    'Static SEO routes generated successfully.'
);

console.log(
    `Generated ${routes.length} static routes.`
);

console.log(
    'Sitemap generated successfully.'
);

console.log('');