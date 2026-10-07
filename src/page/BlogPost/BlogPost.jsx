import {
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState
} from 'react';

import {
    Link,
    useParams
} from 'react-router-dom';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import {
    HiArrowLeft,
    HiArrowRight,
    HiArrowUp,
    HiCalendar,
    HiClock,
    HiChevronDown
} from 'react-icons/hi';

import MainNavBar from '../../Component/MainNavBar/MainNavBar';
import Footer from '../../Component/footer/Footer';
import LanguageSwitch from '../../Component/LanguageSwitch/LanguageSwitch';

import blogPosts from '../../generated/blogPosts.json';

import {
    getBlogCategoryLabel
} from '../../data/blogCategories';

import './BlogPost.css';


const BASE_URL =
    'https://hosseinalavifarzin.ir';


const ARTICLE_SCROLL_OFFSET =
    112;


// =========================================================
// TEXT
// =========================================================

function getTextFromChildren(children) {

    if (
        typeof children === 'string' ||
        typeof children === 'number'
    ) {
        return String(children);
    }


    if (
        Array.isArray(children)
    ) {

        return children
            .map(getTextFromChildren)
            .join('');

    }


    if (
        children?.props?.children
    ) {

        return getTextFromChildren(
            children.props.children
        );

    }


    return '';

}


// =========================================================
// AUTHOR INITIALS
// =========================================================

function getInitials(
    name = ''
) {

    const initials =
        String(name)
            .trim()
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map(
                (part) =>
                    part.charAt(0)
            )
            .join('')
            .toUpperCase();


    return initials || 'HA';

}


// =========================================================
// FALLBACK HEADING ID
// =========================================================

function createHeadingId(
    value = ''
) {

    const normalized =
        String(value)
            .normalize('NFKC')
            .toLowerCase()
            .replace(
                /[^\p{L}\p{N}\s-]/gu,
                ''
            )
            .trim()
            .replace(
                /\s+/g,
                '-'
            )
            .replace(
                /-+/g,
                '-'
            );


    return normalized || 'section';

}


// =========================================================
// CLEAN EXTERNAL URL
// =========================================================

function cleanExternalUrl(
    href = ''
) {

    if (
        !href ||
        href.startsWith('/') ||
        href.startsWith('#')
    ) {

        return href;

    }


    try {

        const url =
            new URL(href);


        [
            ...url.searchParams.keys()
        ].forEach(
            (key) => {

                if (
                    key
                        .toLowerCase()
                        .startsWith('utm_')
                ) {

                    url.searchParams.delete(
                        key
                    );

                }

            }
        );


        return url.toString();

    } catch (error) {

        return href;

    }

}


// =========================================================
// DATE
// =========================================================

function formatDate(
    date,
    language
) {

    if (!date) {
        return '';
    }


    try {

        const value =
            new Date(
                `${date}T00:00:00Z`
            );


        return new Intl.DateTimeFormat(
            language === 'fa'
                ? 'fa-IR'
                : 'en-US',
            {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timeZone: 'UTC'
            }
        ).format(value);

    } catch (error) {

        return date;

    }

}


// =========================================================
// READ TIME
// =========================================================

function getReadTimeLabel(
    minutes,
    language
) {

    if (!minutes) {
        return '';
    }


    if (
        language === 'fa'
    ) {

        const number =
            new Intl.NumberFormat(
                'fa-IR'
            ).format(
                minutes
            );


        return `${number} دقیقه مطالعه`;

    }


    return `${minutes} min read`;

}


// =========================================================
// META
// =========================================================

function setMeta(
    selector,
    attributes
) {

    let element =
        document.head.querySelector(
            selector
        );


    if (!element) {

        element =
            document.createElement(
                'meta'
            );

        document.head.appendChild(
            element
        );

    }


    Object.entries(
        attributes
    ).forEach(
        ([key, value]) => {

            element.setAttribute(
                key,
                value
            );

        }
    );

}


// =========================================================
// CANONICAL
// =========================================================

function setCanonical(
    href
) {

    let canonical =
        document.head.querySelector(
            'link[rel="canonical"]'
        );


    if (!canonical) {

        canonical =
            document.createElement(
                'link'
            );

        canonical.rel =
            'canonical';

        document.head.appendChild(
            canonical
        );

    }


    canonical.href =
        href;

}


// =========================================================
// HREFLANG
// =========================================================

function setLanguageAlternates(
    post
) {

    document.head
        .querySelectorAll(
            'link[data-blog-hreflang="true"]'
        )
        .forEach(
            (element) => {

                element.remove();

            }
        );


    const addAlternate = (
        language,
        href
    ) => {

        const link =
            document.createElement(
                'link'
            );


        link.rel =
            'alternate';

        link.hreflang =
            language;

        link.href =
            href;

        link.setAttribute(
            'data-blog-hreflang',
            'true'
        );


        document.head.appendChild(
            link
        );

    };


    if (
        post.languages?.en
    ) {

        addAlternate(
            'en',
            `${BASE_URL}/blog/en/${post.slug}/`
        );

    }


    if (
        post.languages?.fa
    ) {

        addAlternate(
            'fa',
            `${BASE_URL}/blog/fa/${post.slug}/`
        );

    }


    const defaultLanguage =
        post.languages?.en
            ? 'en'
            : 'fa';


    addAlternate(
        'x-default',
        `${BASE_URL}/blog/${defaultLanguage}/${post.slug}/`
    );

}


// =========================================================
// MARKDOWN
// =========================================================

function MarkdownArticle({
    body,
    tableOfContents
}) {

    let headingCursor = 0;


    const getHeadingId = (
        children
    ) => {

        const tocItem =
            tableOfContents?.[
                headingCursor
            ];


        headingCursor += 1;


        if (
            tocItem?.id
        ) {

            return tocItem.id;

        }


        return createHeadingId(
            getTextFromChildren(
                children
            )
        );

    };


    return (

        <ReactMarkdown
            remarkPlugins={[
                remarkGfm
            ]}
            components={{

                h2({
                    children
                }) {

                    return (

                        <h2
                            id={
                                getHeadingId(
                                    children
                                )
                            }
                            className="
                                blog-article-h2
                                text-theme-primary
                            "
                        >
                            {children}
                        </h2>

                    );

                },


                h3({
                    children
                }) {

                    return (

                        <h3
                            id={
                                getHeadingId(
                                    children
                                )
                            }
                            className="
                                blog-article-h3
                                text-theme-primary
                            "
                        >
                            {children}
                        </h3>

                    );

                },


                h4({
                    children
                }) {

                    return (

                        <h4
                            className="
                                blog-article-h4
                                text-theme-primary
                            "
                        >
                            {children}
                        </h4>

                    );

                },


                strong({
                    children
                }) {

                    return (

                        <strong
                            className="
                                text-theme-primary
                                font-bold
                            "
                        >
                            {children}
                        </strong>

                    );

                },


                blockquote({
                    children
                }) {

                    return (

                        <blockquote
                            className="
                                blog-article-quote
                                text-theme-primary
                            "
                        >
                            {children}
                        </blockquote>

                    );

                },


                a({
                    href = '',
                    children
                }) {

                    const cleanedHref =
                        cleanExternalUrl(
                            href
                        );


                    if (
                        cleanedHref.startsWith(
                            '/'
                        )
                    ) {

                        return (

                            <Link
                                to={
                                    cleanedHref
                                }
                                className="
                                    blog-article-link
                                    text-primary-500
                                "
                            >
                                {children}
                            </Link>

                        );

                    }


                    return (

                        <a
                            href={
                                cleanedHref
                            }
                            target={
                                cleanedHref.startsWith(
                                    '#'
                                )
                                    ? undefined
                                    : '_blank'
                            }
                            rel={
                                cleanedHref.startsWith(
                                    '#'
                                )
                                    ? undefined
                                    : 'noopener noreferrer'
                            }
                            className="
                                blog-article-link
                                text-primary-500
                            "
                        >
                            {children}
                        </a>

                    );

                },


                img({
                    src,
                    alt = ''
                }) {

                    return (

                        <img
                            src={src}
                            alt={alt}
                            loading="lazy"
                            decoding="async"
                            className="
                                blog-inline-image
                            "
                        />

                    );

                },


                table({
                    children
                }) {

                    return (

                        <div className="blog-table-container">

                            <table>
                                {children}
                            </table>

                        </div>

                    );

                },


                th({
                    children
                }) {

                    return (

                        <th className="text-theme-primary">
                            {children}
                        </th>

                    );

                },


                pre({
                    children
                }) {

                    return (

                        <pre dir="ltr">
                            {children}
                        </pre>

                    );

                },


                code({
                    children,
                    ...props
                }) {

                    return (

                        <code
                            dir="ltr"
                            {...props}
                        >
                            {children}
                        </code>

                    );

                }

            }}
        >

            {body}

        </ReactMarkdown>

    );

}


// =========================================================
// TOC LINKS
// =========================================================

function TocLinks({
    items,
    activeId,
    onNavigate
}) {

    const handleClick = (
        event,
        item,
        index
    ) => {

        event.preventDefault();


        let target =
            document.getElementById(
                item.id
            );


        if (!target) {

            const headings =
                document.querySelectorAll(
                    '.blog-article h2, .blog-article h3'
                );


            target =
                headings[index] ||
                null;


            if (
                target
            ) {

                target.id =
                    item.id;

            }

        }


        if (!target) {
            return;
        }


        onNavigate?.(
            item.id
        );


        const targetTop =
            target
                .getBoundingClientRect()
                .top +
            window.scrollY -
            ARTICLE_SCROLL_OFFSET;


        window.scrollTo({
            top:
                Math.max(
                    0,
                    targetTop
                ),

            behavior:
                'smooth'
        });


        window.history.replaceState(
            null,
            '',
            `${window.location.pathname}${window.location.search}#${encodeURIComponent(item.id)}`
        );

    };


    return (

        <nav
            className="blog-toc-links"
            aria-label="Article sections"
        >

            {items.map(
                (
                    item,
                    index
                ) => {

                    const isActive =
                        activeId ===
                        item.id;


                    return (

                        <a
                            key={
                                item.id
                            }
                            href={`#${item.id}`}
                            onClick={
                                (event) =>
                                    handleClick(
                                        event,
                                        item,
                                        index
                                    )
                            }
                            aria-current={
                                isActive
                                    ? 'location'
                                    : undefined
                            }
                            className={`
                                blog-toc-link

                                ${
                                    item.level === 3
                                        ? 'blog-toc-sub-link'
                                        : ''
                                }
                            `}
                        >

                            <span
                                className="blog-toc-dot"
                                aria-hidden="true"
                            />


                            <span
                                className={`
                                    blog-toc-link-text

                                    ${
                                        isActive
                                            ? 'blog-toc-link-text-active'
                                            : ''
                                    }
                                `}
                            >
                                {item.title}
                            </span>

                        </a>

                    );

                }
            )}

        </nav>

    );

}


// =========================================================
// BLOG POST
// =========================================================

function BlogPost() {

    const {
        language,
        slug
    } = useParams();


    const validLanguage =
        language === 'fa' ||
        language === 'en';


    const post =
        useMemo(
            () =>
                blogPosts.find(
                    (item) =>
                        item.slug === slug
                ) || null,
            [
                slug
            ]
        );


    const content =
        validLanguage
            ? post?.[language]
            : null;


    const isPersian =
        language === 'fa';


    const direction =
        isPersian
            ? 'rtl'
            : 'ltr';


    const hasBothLanguages =
        Boolean(
            post?.languages?.fa &&
            post?.languages?.en
        );


    const tocItems =
        content?.tableOfContents ||
        [];


    const [
        activeHeading,
        setActiveHeading
    ] = useState('');


    const pendingTocTargetRef =
        useRef(null);


    const handleTocNavigate = (
        id
    ) => {

        pendingTocTargetRef.current =
            id;


        setActiveHeading(
            id
        );

    };


    // =====================================================
    // DOCUMENT
    // =====================================================

    useLayoutEffect(
        () => {

            document.documentElement.lang =
                validLanguage
                    ? language
                    : 'en';


            document.documentElement.dir =
                'ltr';

        },
        [
            language,
            validLanguage
        ]
    );


    // =====================================================
    // PAGE TOP
    // =====================================================

    useEffect(
        () => {

            window.scrollTo({
                top: 0,
                behavior: 'auto'
            });


            pendingTocTargetRef.current =
                null;


            setActiveHeading(
                ''
            );

        },
        [
            language,
            slug
        ]
    );


    // =====================================================
    // GUARANTEE TOC IDS
    // =====================================================

    useLayoutEffect(
        () => {

            if (
                !tocItems.length
            ) {

                return;

            }


            const headings =
                document.querySelectorAll(
                    '.blog-article h2, .blog-article h3'
                );


            tocItems.forEach(
                (
                    item,
                    index
                ) => {

                    const heading =
                        headings[index];


                    if (!heading) {
                        return;
                    }


                    heading.id =
                        item.id;

                }
            );

        },
        [
            content,
            tocItems
        ]
    );


    // =====================================================
    // INITIAL HASH
    // =====================================================

    useEffect(
        () => {

            if (
                !content ||
                !window.location.hash
            ) {

                return undefined;

            }


            let id =
                window.location.hash
                    .slice(1);


            try {

                id =
                    decodeURIComponent(
                        id
                    );

            } catch (error) {

                // Keep raw hash.

            }


            const timer =
                window.setTimeout(
                    () => {

                        const target =
                            document.getElementById(
                                id
                            );


                        if (!target) {
                            return;
                        }


                        const top =
                            target
                                .getBoundingClientRect()
                                .top +
                            window.scrollY -
                            ARTICLE_SCROLL_OFFSET;


                        window.scrollTo({
                            top:
                                Math.max(
                                    0,
                                    top
                                ),

                            behavior:
                                'auto'
                        });


                        setActiveHeading(
                            id
                        );

                    },
                    80
                );


            return () => {

                window.clearTimeout(
                    timer
                );

            };

        },
        [
            content,
            slug,
            language
        ]
    );


    // =====================================================
    // ACTIVE TOC ON SCROLL
    // =====================================================

    useEffect(
        () => {

            if (
                !tocItems.length
            ) {

                return undefined;

            }


            let requestId =
                null;


            const updateActiveHeading =
                () => {

                    requestId =
                        null;


                    const pendingId =
                        pendingTocTargetRef.current;


                    if (
                        pendingId
                    ) {

                        const pendingElement =
                            document.getElementById(
                                pendingId
                            );


                        if (
                            pendingElement
                        ) {

                            const pendingTop =
                                pendingElement
                                    .getBoundingClientRect()
                                    .top;


                            const reachedTarget =
                                Math.abs(
                                    pendingTop -
                                    ARTICLE_SCROLL_OFFSET
                                ) <= 14;


                            const reachedBottom =
                                window.innerHeight +
                                    window.scrollY >=
                                document.documentElement
                                    .scrollHeight -
                                    12;


                            if (
                                !reachedTarget &&
                                !reachedBottom
                            ) {

                                setActiveHeading(
                                    pendingId
                                );

                                return;

                            }


                            pendingTocTargetRef.current =
                                null;


                            setActiveHeading(
                                pendingId
                            );


                            return;

                        }


                        pendingTocTargetRef.current =
                            null;

                    }


                    let current =
                        tocItems[0]?.id ||
                        '';


                    for (
                        const item
                        of tocItems
                    ) {

                        const element =
                            document.getElementById(
                                item.id
                            );


                        if (!element) {
                            continue;
                        }


                        const top =
                            element
                                .getBoundingClientRect()
                                .top;


                        if (
                            top <=
                            ARTICLE_SCROLL_OFFSET +
                                24
                        ) {

                            current =
                                item.id;

                        } else {

                            break;

                        }

                    }


                    const reachedPageBottom =
                        window.innerHeight +
                            window.scrollY >=
                        document.documentElement
                            .scrollHeight -
                            12;


                    if (
                        reachedPageBottom &&
                        tocItems.length
                    ) {

                        current =
                            tocItems[
                                tocItems.length - 1
                            ].id;

                    }


                    setActiveHeading(
                        current
                    );

                };


            const handleScroll =
                () => {

                    if (
                        requestId !== null
                    ) {

                        return;

                    }


                    requestId =
                        window.requestAnimationFrame(
                            updateActiveHeading
                        );

                };


            updateActiveHeading();


            window.addEventListener(
                'scroll',
                handleScroll,
                {
                    passive: true
                }
            );


            window.addEventListener(
                'resize',
                handleScroll
            );


            return () => {

                window.removeEventListener(
                    'scroll',
                    handleScroll
                );


                window.removeEventListener(
                    'resize',
                    handleScroll
                );


                if (
                    requestId !== null
                ) {

                    window.cancelAnimationFrame(
                        requestId
                    );

                }

            };

        },
        [
            tocItems
        ]
    );


    // =====================================================
    // SEO
    // =====================================================

    useEffect(
        () => {

            if (
                !post ||
                !content ||
                !validLanguage
            ) {

                document.title =
                    'Article Not Found | Hossein Alavi';


                setMeta(
                    'meta[name="robots"]',
                    {
                        name:
                            'robots',

                        content:
                            'noindex, follow'
                    }
                );


                return;

            }


            const canonical =
                `${BASE_URL}/blog/${language}/${post.slug}/`;


            document.title =
                `${content.title} | Hossein Alavi`;


            setCanonical(
                canonical
            );


            setMeta(
                'meta[name="description"]',
                {
                    name:
                        'description',

                    content:
                        content.description ||
                        ''
                }
            );


            setMeta(
                'meta[name="robots"]',
                {
                    name:
                        'robots',

                    content:
                        'index, follow, max-image-preview:large'
                }
            );


            setMeta(
                'meta[property="og:type"]',
                {
                    property:
                        'og:type',

                    content:
                        'article'
                }
            );


            setMeta(
                'meta[property="og:title"]',
                {
                    property:
                        'og:title',

                    content:
                        content.title
                }
            );


            setMeta(
                'meta[property="og:description"]',
                {
                    property:
                        'og:description',

                    content:
                        content.description ||
                        ''
                }
            );


            setMeta(
                'meta[property="og:url"]',
                {
                    property:
                        'og:url',

                    content:
                        canonical
                }
            );


            setMeta(
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


            setMeta(
                'meta[name="twitter:card"]',
                {
                    name:
                        'twitter:card',

                    content:
                        'summary_large_image'
                }
            );


            setMeta(
                'meta[name="twitter:title"]',
                {
                    name:
                        'twitter:title',

                    content:
                        content.title
                }
            );


            setMeta(
                'meta[name="twitter:description"]',
                {
                    name:
                        'twitter:description',

                    content:
                        content.description ||
                        ''
                }
            );


            if (
                post.cover
            ) {

                const imageUrl =
                    post.cover.startsWith(
                        'http'
                    )

                        ? post.cover

                        : `${BASE_URL}${post.cover}`;


                setMeta(
                    'meta[property="og:image"]',
                    {
                        property:
                            'og:image',

                        content:
                            imageUrl
                    }
                );


                setMeta(
                    'meta[name="twitter:image"]',
                    {
                        name:
                            'twitter:image',

                        content:
                            imageUrl
                    }
                );

            }


            setLanguageAlternates(
                post
            );


            let schema =
                document.getElementById(
                    'blogposting-jsonld'
                );


            if (!schema) {

                schema =
                    document.createElement(
                        'script'
                    );


                schema.type =
                    'application/ld+json';


                schema.id =
                    'blogposting-jsonld';


                document.head.appendChild(
                    schema
                );

            }


            const structuredData = {

                '@context':
                    'https://schema.org',

                '@type':
                    'BlogPosting',

                headline:
                    content.title,

                description:
                    content.description ||
                    '',

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
                        'Hossein Alavi'

                },

                inLanguage:
                    language

            };


            if (
                post.cover
            ) {

                structuredData.image =
                    post.cover.startsWith(
                        'http'
                    )

                        ? post.cover

                        : `${BASE_URL}${post.cover}`;

            }


            if (
                post.publishedAt
            ) {

                structuredData.datePublished =
                    post.publishedAt;

            }


            schema.textContent =
                JSON.stringify(
                    structuredData
                );


            return () => {

                document
                    .getElementById(
                        'blogposting-jsonld'
                    )
                    ?.remove();

            };

        },
        [
            post,
            content,
            language,
            validLanguage,
            isPersian
        ]
    );


    // =====================================================
    // NOT FOUND
    // =====================================================

    if (
        !validLanguage ||
        !post
    ) {

        return (

            <main className="
                min-h-screen
                bg-theme-primary
            ">

                <div
                    lang="en"
                    dir="ltr"
                >
                    <MainNavBar />
                </div>


                <section className="
                    min-h-[80vh]
                    pt-32
                    px-4
                    flex
                    items-center
                    justify-center
                ">

                    <div className="
                        text-center
                        max-w-xl
                    ">

                        <p className="
                            text-primary-500
                            font-bold
                            mb-3
                        ">
                            404
                        </p>


                        <h1 className="
                            text-4xl
                            font-bold
                            text-theme-primary
                            mb-6
                        ">
                            Article not found
                        </h1>


                        <Link
                            to="/blog/en"
                            className="
                                btn-primary
                                inline-flex
                                items-center
                                gap-2
                            "
                        >

                            <HiArrowLeft />

                            Back to Blog

                        </Link>

                    </div>

                </section>


                <div
                    lang="en"
                    dir="ltr"
                >
                    <Footer />
                </div>

            </main>

        );

    }


    // =====================================================
    // TRANSLATION NOT AVAILABLE
    // =====================================================

    if (
        !content
    ) {

        const fallbackLanguage =
            post.languages?.fa
                ? 'fa'
                : 'en';


        return (

            <main className="
                min-h-screen
                bg-theme-primary
            ">

                <div
                    lang="en"
                    dir="ltr"
                >
                    <MainNavBar />
                </div>


                <section className="
                    min-h-[80vh]
                    pt-32
                    px-4
                    flex
                    items-center
                    justify-center
                ">

                    <div className="
                        text-center
                        max-w-xl
                    ">

                        <h1 className="
                            text-3xl
                            sm:text-5xl
                            font-bold
                            text-theme-primary
                            mb-8
                        ">
                            This translation isn't available yet.
                        </h1>


                        <Link
                            to={`/blog/${fallbackLanguage}/${post.slug}`}
                            className="
                                btn-primary
                                inline-flex
                                items-center
                                gap-2
                            "
                        >

                            View available version

                            <HiArrowRight />

                        </Link>

                    </div>

                </section>


                <div
                    lang="en"
                    dir="ltr"
                >
                    <Footer />
                </div>

            </main>

        );

    }


    // =====================================================
    // ARTICLE DATA
    // =====================================================

    const category =
        getBlogCategoryLabel(
            post.category,
            language
        );


    const authorName =
        post.author ||
        'Hossein Alavi';


    const languagePosts =
        blogPosts.filter(
            (item) =>
                item?.[language]?.enabled
        );


    const currentIndex =
        languagePosts.findIndex(
            (item) =>
                item.slug === post.slug
        );


    const previousPost =
        currentIndex > 0

            ? languagePosts[
                currentIndex - 1
            ]

            : null;


    const nextPost =
        currentIndex >= 0 &&
        currentIndex <
            languagePosts.length - 1

            ? languagePosts[
                currentIndex + 1
            ]

            : null;


    const relatedPosts =
        languagePosts
            .filter(
                (item) =>
                    item.slug !== post.slug &&
                    item.category === post.category
            )
            .slice(
                0,
                3
            );


    const scrollToTop =
        () => {

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

        };


    return (

        <main className="
            blog-post-page
            min-h-screen
            bg-theme-primary
        ">

            {/* =============================================
                GLOBAL NAV
            ============================================== */}

            <div
                lang="en"
                dir="ltr"
            >
                <MainNavBar />
            </div>


            {/* =============================================
                LOCALIZED PAGE
            ============================================== */}

            <div
                lang={language}
                dir={direction}
                className={
                    isPersian
                        ? 'blog-content-fa'
                        : 'blog-content-en'
                }
            >

                {/* =========================================
                    ARTICLE TOP BAR
                ========================================== */}

                <header className="blog-post-topbar">

                    <div className="
                        container
                        mx-auto
                        px-4
                    ">

                        <div className="
                            max-w-6xl
                            mx-auto
                        ">

                            <div className="blog-post-topbar-inner">

                                <Link
                                    to={`/blog/${language}`}
                                    className="blog-post-back"
                                >

                                    {isPersian ? (

                                        <>
                                            <HiArrowRight />

                                            <span>
                                                بازگشت به بلاگ
                                            </span>
                                        </>

                                    ) : (

                                        <>
                                            <HiArrowLeft />

                                            <span>
                                                Back to Blog
                                            </span>
                                        </>

                                    )}

                                </Link>


                                {hasBothLanguages && (

                                    <div className="blog-post-language">

                                        <LanguageSwitch
                                            language={
                                                language
                                            }
                                            availableLanguages={
                                                post.languages
                                            }
                                        />

                                    </div>

                                )}

                            </div>

                        </div>

                    </div>

                </header>


                {/* =========================================
                    READING AREA
                ========================================== */}

                <section className="
                    pt-4
                    pb-16
                    sm:pb-24
                ">

                    <div className="
                        container
                        mx-auto
                        px-4
                    ">

                        <div
                            dir="ltr"
                            className="
                                max-w-6xl
                                mx-auto
                                grid
                                lg:grid-cols-[280px_minmax(0,1fr)]
                                gap-10
                                xl:gap-14
                                items-stretch
                            "
                        >

                            {/* =================================
                                LEFT DESKTOP TOC
                            ================================== */}

                            {tocItems.length > 0 && (

                                <aside
                                    dir={direction}
                                    className="
                                        hidden
                                        lg:block
                                        relative
                                        min-w-0
                                    "
                                >

                                    <div className="
                                        blog-toc-sticky
                                        glass
                                        border
                                        border-black/10
                                        dark:border-white/10
                                    ">

                                        <div className="blog-toc-heading">

                                            <span
                                                className="blog-toc-heading-dot"
                                                aria-hidden="true"
                                            />


                                            <span className="text-theme-primary">

                                                {
                                                    isPersian
                                                        ? 'در این مقاله'
                                                        : 'In this article'
                                                }

                                            </span>

                                        </div>


                                        <div className="blog-toc-separator" />


                                        <TocLinks
                                            items={
                                                tocItems
                                            }
                                            activeId={
                                                activeHeading
                                            }
                                            onNavigate={
                                                handleTocNavigate
                                            }
                                        />

                                    </div>

                                </aside>

                            )}


                            {/* =================================
                                RIGHT ARTICLE
                            ================================== */}

                            <div
                                dir={direction}
                                className="
                                    min-w-0
                                "
                            >

                                {/* MOBILE TOC */}

                                {tocItems.length > 0 && (

                                    <details className="
                                        blog-mobile-toc
                                        lg:hidden
                                        glass
                                        mb-8
                                    ">

                                        <summary className="
                                            flex
                                            items-center
                                            justify-between
                                            gap-4
                                            px-4
                                            py-4
                                            text-theme-primary
                                            font-semibold
                                            cursor-pointer
                                        ">

                                            <span>

                                                {
                                                    isPersian
                                                        ? 'در این مقاله'
                                                        : 'In this article'
                                                }

                                            </span>


                                            <HiChevronDown />

                                        </summary>


                                        <div className="
                                            px-3
                                            pb-4
                                        ">

                                            <TocLinks
                                                items={
                                                    tocItems
                                                }
                                                activeId={
                                                    activeHeading
                                                }
                                                onNavigate={
                                                    handleTocNavigate
                                                }
                                            />

                                        </div>

                                    </details>

                                )}


                                {/* =================================
                                    ARTICLE
                                ================================== */}

                                <article className="
                                    max-w-3xl
                                    ml-auto
                                ">

                                    {/* =============================
                                        ARTICLE HEADER
                                    ============================== */}

                                    <header className="blog-article-header">

                                        {/* TITLE */}

                                        <h1 className="
                                            blog-post-title
                                            text-2xl
                                            sm:text-3xl
                                            lg:text-4xl
                                            font-bold
                                            text-theme-primary
                                            leading-tight
                                            mb-6
                                        ">

                                            {content.title}

                                        </h1>


                                        {/* DESCRIPTION */}

                                        {content.description && (

                                            <p className="
                                                blog-post-description
                                                text-base
                                                sm:text-lg
                                                text-theme-secondary
                                                leading-8
                                            ">

                                                {content.description}

                                            </p>

                                        )}


                                        {/* =========================
                                            ARTICLE META
                                        ========================== */}

                                        <div className="blog-article-meta">

                                            {/* AUTHOR */}

                                            <div className="blog-author">

                                                <span
                                                    className="blog-author-avatar"
                                                    aria-hidden="true"
                                                >

                                                    {getInitials(
                                                        authorName
                                                    )}

                                                </span>


                                                <span className="blog-author-info">

                                                    <strong className="blog-author-name">

                                                        {authorName}

                                                    </strong>


                                                    <span className="blog-author-role">

                                                        {
                                                            isPersian
                                                                ? 'طراح محصول'
                                                                : 'Product Designer'
                                                        }

                                                    </span>

                                                </span>

                                            </div>


                                            {/* DATE */}

                                            {post.publishedAt && (

                                                <>
                                                    <span
                                                        className="blog-meta-divider"
                                                        aria-hidden="true"
                                                    />


                                                    <span className="blog-meta-item">

                                                        <HiCalendar />


                                                        <span>

                                                            {formatDate(
                                                                post.publishedAt,
                                                                language
                                                            )}

                                                        </span>

                                                    </span>
                                                </>

                                            )}


                                            {/* READ TIME */}

                                            {content.readTimeMinutes && (

                                                <>
                                                    <span
                                                        className="blog-meta-divider"
                                                        aria-hidden="true"
                                                    />


                                                    <span className="blog-meta-item blog-meta-read-time">

                                                        <HiClock />


                                                        <span>

                                                            {getReadTimeLabel(
                                                                content.readTimeMinutes,
                                                                language
                                                            )}

                                                        </span>

                                                    </span>
                                                </>

                                            )}


                                            {/* CATEGORY */}

                                            {category && (

                                                <>
                                                    <span
                                                        className="blog-meta-divider"
                                                        aria-hidden="true"
                                                    />


                                                    <span className="blog-meta-category">

                                                        <span
                                                            className="blog-meta-category-dot"
                                                            aria-hidden="true"
                                                        />


                                                        <span>

                                                            {category}

                                                        </span>

                                                    </span>
                                                </>

                                            )}

                                        </div>


                                        {/* =========================
                                            COVER
                                        ========================== */}

                                        {post.cover && (

                                            <figure className="
                                                blog-cover-frame
                                                mt-8
                                                sm:mt-10
                                                rounded-2xl
                                                border
                                                border-black/10
                                                dark:border-white/10
                                            ">

                                                <img
                                                    src={
                                                        post.cover
                                                    }
                                                    alt={
                                                        content.title
                                                    }
                                                    fetchPriority="high"
                                                    decoding="async"
                                                />

                                            </figure>

                                        )}

                                    </header>


                                    {/* =============================
                                        ARTICLE BODY
                                    ============================== */}

                                    <div className="
                                        blog-article
                                        text-theme-secondary
                                    ">

                                        <MarkdownArticle
                                            body={
                                                content.body
                                            }
                                            tableOfContents={
                                                tocItems
                                            }
                                        />

                                    </div>


                                    {/* =============================
                                        BACK TO TOP
                                    ============================== */}

                                    <div className="
                                        mt-14
                                        pt-6
                                        border-t
                                        border-black/10
                                        dark:border-white/10
                                    ">

                                        <button
                                            type="button"
                                            onClick={
                                                scrollToTop
                                            }
                                            className="
                                                inline-flex
                                                items-center
                                                gap-2
                                                text-sm
                                                font-medium
                                                text-theme-secondary
                                                hover:text-primary-500
                                                transition-colors
                                            "
                                        >

                                            <HiArrowUp />


                                            <span>

                                                {
                                                    isPersian
                                                        ? 'بازگشت به ابتدای مقاله'
                                                        : 'Back to top'
                                                }

                                            </span>

                                        </button>

                                    </div>

                                </article>

                            </div>

                        </div>

                    </div>

                </section>


                {/* =========================================
                    RELATED POSTS
                ========================================== */}

                {relatedPosts.length > 0 && (

                    <section className="
                        py-16
                        sm:py-20
                        bg-theme-secondary
                    ">

                        <div className="
                            container
                            mx-auto
                            px-4
                        ">

                            <div className="
                                max-w-6xl
                                mx-auto
                            ">

                                <span className="
                                    text-primary-500
                                    text-sm
                                    font-semibold
                                ">

                                    {
                                        isPersian
                                            ? 'مطالعه بیشتر'
                                            : 'Continue reading'
                                    }

                                </span>


                                <h2 className="
                                    mt-2
                                    mb-8
                                    text-2xl
                                    sm:text-3xl
                                    font-bold
                                    text-theme-primary
                                ">

                                    {
                                        isPersian
                                            ? 'مطالب مرتبط'
                                            : 'Related articles'
                                    }

                                </h2>


                                <div className="
                                    grid
                                    md:grid-cols-2
                                    lg:grid-cols-3
                                    gap-5
                                ">

                                    {relatedPosts.map(
                                        (related) => {

                                            const relatedContent =
                                                related[
                                                    language
                                                ];


                                            return (

                                                <Link
                                                    key={
                                                        related.slug
                                                    }
                                                    to={`/blog/${language}/${related.slug}`}
                                                    className="
                                                        blog-related-card
                                                        glass
                                                        rounded-2xl
                                                        overflow-hidden
                                                        border
                                                        border-black/10
                                                        dark:border-white/10
                                                    "
                                                >

                                                    {related.cover && (

                                                        <div className="
                                                            aspect-video
                                                            overflow-hidden
                                                        ">

                                                            <img
                                                                src={
                                                                    related.cover
                                                                }
                                                                alt={
                                                                    relatedContent.title
                                                                }
                                                                loading="lazy"
                                                                decoding="async"
                                                                className="
                                                                    w-full
                                                                    h-full
                                                                    object-cover
                                                                "
                                                            />

                                                        </div>

                                                    )}


                                                    <div className="p-5">

                                                        <span className="
                                                            text-xs
                                                            font-semibold
                                                            text-primary-500
                                                        ">

                                                            {
                                                                getBlogCategoryLabel(
                                                                    related.category,
                                                                    language
                                                                )
                                                            }

                                                        </span>


                                                        <h3 className="
                                                            mt-2
                                                            text-lg
                                                            font-bold
                                                            text-theme-primary
                                                            leading-7
                                                        ">

                                                            {
                                                                relatedContent.title
                                                            }

                                                        </h3>

                                                    </div>

                                                </Link>

                                            );

                                        }
                                    )}

                                </div>

                            </div>

                        </div>

                    </section>

                )}


                {/* =========================================
                    PREVIOUS / NEXT
                ========================================== */}

                {(previousPost || nextPost) && (

                    <section className="
                        py-14
                        sm:py-16
                    ">

                        <div className="
                            container
                            mx-auto
                            px-4
                        ">

                            <div
                                dir="ltr"
                                className="
                                    max-w-6xl
                                    mx-auto
                                    grid
                                    sm:grid-cols-2
                                    gap-4
                                "
                            >

                                <div>

                                    {previousPost && (

                                        <Link
                                            dir={direction}
                                            to={`/blog/${language}/${previousPost.slug}`}
                                            className="
                                                blog-next-card
                                                glass
                                            "
                                        >

                                            <span className="
                                                inline-flex
                                                items-center
                                                gap-2
                                                text-xs
                                                text-theme-muted
                                                mb-2
                                            ">

                                                {isPersian ? (

                                                    <HiArrowRight />

                                                ) : (

                                                    <HiArrowLeft />

                                                )}


                                                {
                                                    isPersian
                                                        ? 'مطلب قبلی'
                                                        : 'Previous article'
                                                }

                                            </span>


                                            <strong className="
                                                block
                                                text-theme-primary
                                                leading-7
                                            ">

                                                {
                                                    previousPost[
                                                        language
                                                    ].title
                                                }

                                            </strong>

                                        </Link>

                                    )}

                                </div>


                                <div>

                                    {nextPost && (

                                        <Link
                                            dir={direction}
                                            to={`/blog/${language}/${nextPost.slug}`}
                                            className="
                                                blog-next-card
                                                glass
                                            "
                                        >

                                            <span className="
                                                inline-flex
                                                items-center
                                                gap-2
                                                text-xs
                                                text-theme-muted
                                                mb-2
                                            ">

                                                {
                                                    isPersian
                                                        ? 'مطلب بعدی'
                                                        : 'Next article'
                                                }


                                                {isPersian ? (

                                                    <HiArrowLeft />

                                                ) : (

                                                    <HiArrowRight />

                                                )}

                                            </span>


                                            <strong className="
                                                block
                                                text-theme-primary
                                                leading-7
                                            ">

                                                {
                                                    nextPost[
                                                        language
                                                    ].title
                                                }

                                            </strong>

                                        </Link>

                                    )}

                                </div>

                            </div>

                        </div>

                    </section>

                )}

            </div>


            {/* =============================================
                GLOBAL FOOTER
            ============================================== */}

            <div
                lang="en"
                dir="ltr"
            >
                <Footer />
            </div>

        </main>

    );

}


export default BlogPost;