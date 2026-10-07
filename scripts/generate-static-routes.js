const fs = require('fs');
const path = require('path');


// =========================================================
// CONFIG
// =========================================================

const BASE_URL =
    'https://hosseinalavifarzin.ir';


const ROOT_DIR =
    path.resolve(
        __dirname,
        '..'
    );


const BUILD_DIR =
    path.join(
        ROOT_DIR,
        'build'
    );


const TEMPLATE_PATH =
    path.join(
        BUILD_DIR,
        'index.html'
    );


const BLOG_DATA_PATH =
    path.join(
        ROOT_DIR,
        'src',
        'generated',
        'blogPosts.json'
    );


// =========================================================
// HELPERS
// =========================================================

function escapeHtml(
    value = ''
) {

    return String(value)
        .replace(
            /&/g,
            '&amp;'
        )
        .replace(
            /</g,
            '&lt;'
        )
        .replace(
            />/g,
            '&gt;'
        )
        .replace(
            /"/g,
            '&quot;'
        )
        .replace(
            /'/g,
            '&#039;'
        );

}


function absoluteUrl(
    value = ''
) {

    if (!value) {
        return '';
    }


    if (
        /^https?:\/\//i.test(
            value
        )
    ) {

        return value;

    }


    return `${BASE_URL}${
        value.startsWith('/')
            ? value
            : `/${value}`
    }`;

}


function normalizeRoute(
    route
) {

    if (
        !route ||
        route === '/'
    ) {

        return '/';

    }


    return `/${
        route
            .replace(
                /^\/+|\/+$/g,
                ''
            )
    }/`;

}


function routeToDirectory(
    route
) {

    const normalized =
        normalizeRoute(
            route
        );


    if (
        normalized === '/'
    ) {

        return BUILD_DIR;

    }


    return path.join(
        BUILD_DIR,
        ...normalized
            .split('/')
            .filter(Boolean)
    );

}


function writeRoute(
    route,
    html
) {

    const directory =
        routeToDirectory(
            route
        );


    fs.mkdirSync(
        directory,
        {
            recursive: true
        }
    );


    fs.writeFileSync(
        path.join(
            directory,
            'index.html'
        ),
        html,
        'utf8'
    );


    console.log(
        `Generated: ${normalizeRoute(route)}`
    );

}


// =========================================================
// REMOVE EXISTING SEO TAGS FROM CRA TEMPLATE
// =========================================================

function cleanHeadSeo(
    html
) {

    return html

        // Title
        .replace(
            /<title>[\s\S]*?<\/title>/gi,
            ''
        )

        // Description
        .replace(
            /<meta[^>]+name=["']description["'][^>]*>/gi,
            ''
        )

        // Robots
        .replace(
            /<meta[^>]+name=["']robots["'][^>]*>/gi,
            ''
        )

        // Canonical
        .replace(
            /<link[^>]+rel=["']canonical["'][^>]*>/gi,
            ''
        )

        // hreflang
        .replace(
            /<link[^>]+rel=["']alternate["'][^>]+hreflang=["'][^"']+["'][^>]*>/gi,
            ''
        )

        // Open Graph
        .replace(
            /<meta[^>]+property=["']og:[^"']+["'][^>]*>/gi,
            ''
        )

        // Twitter
        .replace(
            /<meta[^>]+name=["']twitter:[^"']+["'][^>]*>/gi,
            ''
        )

        // Existing BlogPosting schema
        .replace(
            /<script[^>]+id=["']blogposting-jsonld["'][^>]*>[\s\S]*?<\/script>/gi,
            ''
        );

}


// =========================================================
// INJECT INTO HEAD
// =========================================================

function injectIntoHead(
    template,
    markup
) {

    const cleanTemplate =
        cleanHeadSeo(
            template
        );


    return cleanTemplate.replace(
        '</head>',
        `${markup}\n</head>`
    );

}


// =========================================================
// GENERIC PAGE SEO
// =========================================================

function createPageHtml({
    template,
    title,
    description,
    canonical,
    robots = 'index, follow, max-image-preview:large',
    language = 'en',
    ogType = 'website',
    image = '',
    alternates = []
}) {

    const safeTitle =
        escapeHtml(
            title
        );


    const safeDescription =
        escapeHtml(
            description
        );


    const safeCanonical =
        escapeHtml(
            canonical
        );


    const imageUrl =
        image
            ? absoluteUrl(
                image
            )
            : '';


    const alternateTags =
        alternates
            .map(
                ({
                    hreflang,
                    href
                }) =>
                    `<link rel="alternate" hreflang="${escapeHtml(
                        hreflang
                    )}" href="${escapeHtml(
                        href
                    )}" />`
            )
            .join('\n');


    const imageTags =
        imageUrl

            ? `
<meta property="og:image" content="${escapeHtml(
                imageUrl
            )}" />
<meta name="twitter:image" content="${escapeHtml(
                imageUrl
            )}" />`

            : '';


    const markup =
`
<title>${safeTitle}</title>

<meta
    name="description"
    content="${safeDescription}"
/>

<meta
    name="robots"
    content="${escapeHtml(
        robots
    )}"
/>

<link
    rel="canonical"
    href="${safeCanonical}"
/>

${alternateTags}

<meta
    property="og:type"
    content="${escapeHtml(
        ogType
    )}"
/>

<meta
    property="og:title"
    content="${safeTitle}"
/>

<meta
    property="og:description"
    content="${safeDescription}"
/>

<meta
    property="og:url"
    content="${safeCanonical}"
/>

<meta
    property="og:locale"
    content="${
        language === 'fa'
            ? 'fa_IR'
            : 'en_US'
    }"
/>

${imageTags}

<meta
    name="twitter:card"
    content="summary_large_image"
/>

<meta
    name="twitter:title"
    content="${safeTitle}"
/>

<meta
    name="twitter:description"
    content="${safeDescription}"
/>
`;


    return injectIntoHead(
        template,
        markup
    );

}


// =========================================================
// ARTICLE HTML
// =========================================================

function createArticleHtml({
    template,
    post,
    language
}) {

    const content =
        post?.[language];


    if (!content) {
        return null;
    }


    const canonical =
        `${BASE_URL}/blog/${language}/${post.slug}/`;


    const title =
        `${content.title} | Hossein Alavi`;


    const description =
        content.description ||
        'Product design article by Hossein Alavi.';


    const imageUrl =
        post.cover
            ? absoluteUrl(
                post.cover
            )
            : '';


    const hasEnglish =
        Boolean(
            post.languages?.en &&
            post.en
        );


    const hasPersian =
        Boolean(
            post.languages?.fa &&
            post.fa
        );


    const defaultLanguage =
        hasEnglish
            ? 'en'
            : 'fa';


    const alternates = [];


    if (
        hasEnglish
    ) {

        alternates.push({
            hreflang:
                'en',

            href:
                `${BASE_URL}/blog/en/${post.slug}/`
        });

    }


    if (
        hasPersian
    ) {

        alternates.push({
            hreflang:
                'fa',

            href:
                `${BASE_URL}/blog/fa/${post.slug}/`
        });

    }


    alternates.push({
        hreflang:
            'x-default',

        href:
            `${BASE_URL}/blog/${defaultLanguage}/${post.slug}/`
    });


    const structuredData = {

        '@context':
            'https://schema.org',

        '@type':
            'BlogPosting',

        headline:
            content.title,

        description:
            description,

        url:
            canonical,

        mainEntityOfPage: {

            '@type':
                'WebPage',

            '@id':
                canonical

        },

        author: {

            '@type':
                'Person',

            name:
                post.author ||
                'Hossein Alavi',

            url:
                BASE_URL

        },

        publisher: {

            '@type':
                'Person',

            name:
                'Hossein Alavi',

            url:
                BASE_URL

        },

        inLanguage:
            language

    };


    if (
        imageUrl
    ) {

        structuredData.image =
            imageUrl;

    }


    /*
     * Never invent dates.
     * Only include datePublished
     * when the CMS actually provides one.
     */

    if (
        post.publishedAt
    ) {

        structuredData.datePublished =
            post.publishedAt;

    }


    const pageHtml =
        createPageHtml({
            template,
            title,
            description,
            canonical,
            language,
            ogType:
                'article',
            image:
                post.cover || '',
            alternates
        });


    const articleExtras =
`
${
    post.publishedAt
        ? `
<meta
    property="article:published_time"
    content="${escapeHtml(
        post.publishedAt
    )}"
/>`
        : ''
}

<script
    type="application/ld+json"
    id="blogposting-jsonld"
>${JSON.stringify(
        structuredData
    ).replace(
        /</g,
        '\\u003c'
    )}</script>
`;


    return pageHtml.replace(
        '</head>',
        `${articleExtras}\n</head>`
    );

}


// =========================================================
// LOAD BUILD
// =========================================================

if (
    !fs.existsSync(
        TEMPLATE_PATH
    )
) {

    console.error(
        '\n❌ build/index.html not found.'
    );


    console.error(
        'Run react-scripts build before generate-static-routes.js.\n'
    );


    process.exit(1);

}


const template =
    fs.readFileSync(
        TEMPLATE_PATH,
        'utf8'
    );


// =========================================================
// LOAD BLOG POSTS
// =========================================================

let blogPosts = [];


if (
    fs.existsSync(
        BLOG_DATA_PATH
    )
) {

    try {

        blogPosts =
            JSON.parse(
                fs.readFileSync(
                    BLOG_DATA_PATH,
                    'utf8'
                )
            );


        if (
            !Array.isArray(
                blogPosts
            )
        ) {

            blogPosts =
                [];

        }

    } catch (error) {

        console.error(
            '❌ Could not read blogPosts.json'
        );


        console.error(
            error
        );


        process.exit(1);

    }

}


// =========================================================
// NORMAL STATIC ROUTES
// =========================================================

const plainRoutes = [

    '/portfolio/',

    '/projects/tipax/',
    '/projects/citynet/',
    '/projects/blue/',
    '/projects/3click/',
    '/projects/darzi/',
    '/projects/yahoo/'

];


plainRoutes.forEach(
    (route) => {

        writeRoute(
            route,
            template
        );

    }
);


// =========================================================
// BLOG GATEWAY
// /blog/ redirects in React to /blog/en/
// Keep gateway noindex.
// =========================================================

const blogGatewayHtml =
    createPageHtml({

        template,

        title:
            'Product Design Blog | Hossein Alavi',

        description:
            'Product design articles by Hossein Alavi.',

        canonical:
            `${BASE_URL}/blog/en/`,

        robots:
            'noindex, follow',

        language:
            'en',

        alternates: [

            {
                hreflang:
                    'en',

                href:
                    `${BASE_URL}/blog/en/`
            },

            {
                hreflang:
                    'fa',

                href:
                    `${BASE_URL}/blog/fa/`
            },

            {
                hreflang:
                    'x-default',

                href:
                    `${BASE_URL}/blog/en/`
            }

        ]

    });


writeRoute(
    '/blog/',
    blogGatewayHtml
);


// =========================================================
// ENGLISH BLOG INDEX
// =========================================================

const englishBlogHtml =
    createPageHtml({

        template,

        title:
            'Product Design Blog | Hossein Alavi',

        description:
            'Articles and notes by Hossein Alavi about product design, user research, problem framing, product thinking, and design systems.',

        canonical:
            `${BASE_URL}/blog/en/`,

        language:
            'en',

        alternates: [

            {
                hreflang:
                    'en',

                href:
                    `${BASE_URL}/blog/en/`
            },

            {
                hreflang:
                    'fa',

                href:
                    `${BASE_URL}/blog/fa/`
            },

            {
                hreflang:
                    'x-default',

                href:
                    `${BASE_URL}/blog/en/`
            }

        ]

    });


writeRoute(
    '/blog/en/',
    englishBlogHtml
);


// =========================================================
// PERSIAN BLOG INDEX
// =========================================================

const persianBlogHtml =
    createPageHtml({

        template,

        title:
            'بلاگ طراحی محصول | حسین علوی',

        description:
            'یادداشت‌ها و مقاله‌های حسین علوی درباره طراحی محصول، تحقیق کاربر، تعریف مسئله، تفکر محصول و سیستم‌های طراحی.',

        canonical:
            `${BASE_URL}/blog/fa/`,

        language:
            'fa',

        alternates: [

            {
                hreflang:
                    'en',

                href:
                    `${BASE_URL}/blog/en/`
            },

            {
                hreflang:
                    'fa',

                href:
                    `${BASE_URL}/blog/fa/`
            },

            {
                hreflang:
                    'x-default',

                href:
                    `${BASE_URL}/blog/en/`
            }

        ]

    });


writeRoute(
    '/blog/fa/',
    persianBlogHtml
);


// =========================================================
// ARTICLE STATIC ROUTES
// =========================================================

const articleUrls = [];


blogPosts.forEach(
    (post) => {

        if (
            !post ||
            !post.slug
        ) {

            return;

        }


        // ---------------------------------------------
        // EN
        // ---------------------------------------------

        if (
            post.languages?.en &&
            post.en &&
            post.en.enabled !== false
        ) {

            const route =
                `/blog/en/${post.slug}/`;


            const html =
                createArticleHtml({
                    template,
                    post,
                    language:
                        'en'
                });


            if (
                html
            ) {

                writeRoute(
                    route,
                    html
                );


                articleUrls.push(
                    `${BASE_URL}${route}`
                );

            }

        }


        // ---------------------------------------------
        // FA
        // ---------------------------------------------

        if (
            post.languages?.fa &&
            post.fa &&
            post.fa.enabled !== false
        ) {

            const route =
                `/blog/fa/${post.slug}/`;


            const html =
                createArticleHtml({
                    template,
                    post,
                    language:
                        'fa'
                });


            if (
                html
            ) {

                writeRoute(
                    route,
                    html
                );


                articleUrls.push(
                    `${BASE_URL}${route}`
                );

            }

        }

    }
);


// =========================================================
// SITEMAP
// =========================================================

const sitemapUrls = [

    `${BASE_URL}/`,
    `${BASE_URL}/portfolio/`,

    `${BASE_URL}/blog/en/`,
    `${BASE_URL}/blog/fa/`,

    `${BASE_URL}/projects/tipax/`,
    `${BASE_URL}/projects/citynet/`,
    `${BASE_URL}/projects/blue/`,
    `${BASE_URL}/projects/3click/`,
    `${BASE_URL}/projects/darzi/`,
    `${BASE_URL}/projects/yahoo/`,

    ...articleUrls

];


// Remove duplicates
const uniqueSitemapUrls =
    [
        ...new Set(
            sitemapUrls
        )
    ];


const sitemap =
`<?xml version="1.0" encoding="UTF-8"?>
<urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
${uniqueSitemapUrls
    .map(
        (url) =>
`    <url>
        <loc>${escapeHtml(url)}</loc>
    </url>`
    )
    .join('\n')}
</urlset>
`;


fs.writeFileSync(
    path.join(
        BUILD_DIR,
        'sitemap.xml'
    ),
    sitemap,
    'utf8'
);


// =========================================================
// ROBOTS.TXT
// =========================================================

const robots =
`User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;


fs.writeFileSync(
    path.join(
        BUILD_DIR,
        'robots.txt'
    ),
    robots,
    'utf8'
);


// =========================================================
// FINISH
// =========================================================

console.log('\n✅ Static routes generated.');
console.log(
    `✅ Blog articles: ${articleUrls.length}`
);
console.log(
    `✅ Sitemap URLs: ${uniqueSitemapUrls.length}`
);
console.log(
    '✅ sitemap.xml generated.'
);
console.log(
    '✅ robots.txt generated.\n'
);