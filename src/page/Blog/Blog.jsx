import {
    useEffect,
    useMemo,
    useState
} from 'react';

import {
    Link,
    Navigate,
    useParams
} from 'react-router-dom';

import {
    HiArrowLeft,
    HiArrowRight,
    HiCalendar,
    HiClock
} from 'react-icons/hi';

import MainNavBar from '../../Component/MainNavBar/MainNavBar';
import Footer from '../../Component/footer/Footer';
import LanguageSwitch from '../../Component/LanguageSwitch/LanguageSwitch';

import blogPosts from '../../generated/blogPosts.json';

import {
    BLOG_CATEGORIES,
    getBlogCategoryLabel
} from '../../data/blogCategories';

import './Blog.css';


const BASE_URL =
    'https://hosseinalavifarzin.ir';


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


        return `${number} دقیقه`;

    }


    return `${minutes} min`;

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
                month: 'short',
                day: 'numeric',
                timeZone: 'UTC'
            }
        ).format(
            value
        );

    } catch (error) {

        return date;

    }

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

function setLanguageAlternates() {

    document.head
        .querySelectorAll(
            'link[data-blog-index-hreflang="true"]'
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
            'data-blog-index-hreflang',
            'true'
        );


        document.head.appendChild(
            link
        );

    };


    addAlternate(
        'en',
        `${BASE_URL}/blog/en/`
    );


    addAlternate(
        'fa',
        `${BASE_URL}/blog/fa/`
    );


    addAlternate(
        'x-default',
        `${BASE_URL}/blog/en/`
    );

}


// =========================================================
// BLOG CARD
// =========================================================

function BlogCard({
    post,
    language
}) {

    const isPersian =
        language === 'fa';


    const content =
        post?.[language];


    if (!content) {
        return null;
    }


    const category =
        getBlogCategoryLabel(
            post.category,
            language
        );


    return (

        <article className="blog-card">

            <Link
                to={`/blog/${language}/${post.slug}`}
                className="blog-card-link"
            >

                {/* =========================================
                    IMAGE WITH INNER PADDING
                ========================================== */}

                <div className="blog-card-media">

                    <div className="blog-card-image">

                        {post.cover ? (

                            <img
                                src={post.cover}
                                alt={content.title}
                                loading="lazy"
                                decoding="async"
                            />

                        ) : (

                            <div className="blog-card-placeholder">

                                <span>
                                    H.
                                </span>

                            </div>

                        )}

                    </div>

                </div>


                {/* =========================================
                    CONTENT
                ========================================== */}

                <div className="blog-card-content">

                    {/* META */}

                    <div className="blog-card-meta">

                        <span className="blog-card-category">

                            <span
                                className="blog-card-category-dot"
                                aria-hidden="true"
                            />


                            <span>

                                {category}

                            </span>

                        </span>


                        {content.readTimeMinutes && (

                            <span className="blog-card-read-time">

                                <HiClock />


                                <span>

                                    {getReadTimeLabel(
                                        content.readTimeMinutes,
                                        language
                                    )}

                                </span>

                            </span>

                        )}

                    </div>


                    {/* TITLE */}

                    <h2 className="blog-card-title">

                        {content.title}

                    </h2>


                    {/* DESCRIPTION */}

                    {content.description && (

                        <p className="blog-card-description">

                            {content.description}

                        </p>

                    )}


                    {/* FOOTER */}

                    <div className="blog-card-footer">

                        <div className="blog-card-footer-left">

                            {post.publishedAt && (

                                <span className="blog-card-date">

                                    <HiCalendar />


                                    <span>

                                        {formatDate(
                                            post.publishedAt,
                                            language
                                        )}

                                    </span>

                                </span>

                            )}

                        </div>


                        <span className="blog-card-action">

                            <span>

                                {
                                    isPersian
                                        ? 'مطالعه مقاله'
                                        : 'Read article'
                                }

                            </span>


                            <span className="blog-card-action-icon">

                                {isPersian ? (

                                    <HiArrowLeft />

                                ) : (

                                    <HiArrowRight />

                                )}

                            </span>

                        </span>

                    </div>

                </div>

            </Link>

        </article>

    );

}


// =========================================================
// BLOG PAGE
// =========================================================

function Blog() {

    const {
        language
    } = useParams();


    const validLanguage =
        language === 'fa' ||
        language === 'en';


    const isPersian =
        language === 'fa';


    const direction =
        isPersian
            ? 'rtl'
            : 'ltr';


    const [
        activeCategory,
        setActiveCategory
    ] = useState('all');


    // =====================================================
    // AVAILABLE POSTS
    // =====================================================

    const availablePosts =
        useMemo(
            () => {

                if (
                    !validLanguage
                ) {

                    return [];

                }


                return blogPosts.filter(
                    (post) => {

                        const content =
                            post?.[language];


                        return Boolean(
                            content &&
                            content.enabled !== false &&
                            content.title
                        );

                    }
                );

            },
            [
                language,
                validLanguage
            ]
        );


    // =====================================================
    // FILTERED POSTS
    // =====================================================

    const filteredPosts =
        useMemo(
            () => {

                if (
                    activeCategory === 'all'
                ) {

                    return availablePosts;

                }


                return availablePosts.filter(
                    (post) =>
                        post.category ===
                        activeCategory
                );

            },
            [
                availablePosts,
                activeCategory
            ]
        );


    // =====================================================
    // CATEGORY COUNTS
    // =====================================================

    const categoryCounts =
        useMemo(
            () => {

                const counts = {

                    all:
                        availablePosts.length

                };


                availablePosts.forEach(
                    (post) => {

                        counts[
                            post.category
                        ] =
                            (
                                counts[
                                    post.category
                                ] ||
                                0
                            ) + 1;

                    }
                );


                return counts;

            },
            [
                availablePosts
            ]
        );


    // =====================================================
    // ACTIVE CATEGORY LABEL
    // =====================================================

    const activeCategoryLabel =
        activeCategory === 'all'

            ? (
                isPersian
                    ? 'همه نوشته‌ها'
                    : 'All articles'
            )

            : getBlogCategoryLabel(
                activeCategory,
                language
            );


    // =====================================================
    // RESET FILTER AFTER LANGUAGE CHANGE
    // =====================================================

    useEffect(
        () => {

            setActiveCategory(
                'all'
            );

        },
        [
            language
        ]
    );


    // =====================================================
    // DOCUMENT LANGUAGE
    // =====================================================

    useEffect(
        () => {

            if (
                !validLanguage
            ) {

                return;

            }


            document.documentElement.lang =
                language;


            /*
             * Keep global website shell LTR.
             */

            document.documentElement.dir =
                'ltr';

        },
        [
            language,
            validLanguage
        ]
    );


    // =====================================================
    // SEO
    // =====================================================

    useEffect(
        () => {

            if (
                !validLanguage
            ) {

                return;

            }


            const title =
                isPersian
                    ? 'بلاگ طراحی محصول | حسین علوی'
                    : 'Product Design Blog | Hossein Alavi';


            const description =
                isPersian
                    ? 'یادداشت‌ها و مقاله‌های حسین علوی درباره طراحی محصول، تحقیق کاربر، تعریف مسئله، تفکر محصول و سیستم‌های طراحی.'
                    : 'Articles and notes by Hossein Alavi about product design, user research, problem framing, product thinking, and design systems.';


            const canonical =
                `${BASE_URL}/blog/${language}/`;


            document.title =
                title;


            setCanonical(
                canonical
            );


            setMeta(
                'meta[name="description"]',
                {
                    name:
                        'description',

                    content:
                        description
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
                        'website'
                }
            );


            setMeta(
                'meta[property="og:title"]',
                {
                    property:
                        'og:title',

                    content:
                        title
                }
            );


            setMeta(
                'meta[property="og:description"]',
                {
                    property:
                        'og:description',

                    content:
                        description
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
                        title
                }
            );


            setMeta(
                'meta[name="twitter:description"]',
                {
                    name:
                        'twitter:description',

                    content:
                        description
                }
            );


            setLanguageAlternates();

        },
        [
            language,
            validLanguage,
            isPersian
        ]
    );


    // =====================================================
    // INVALID LANGUAGE
    // =====================================================

    if (
        !validLanguage
    ) {

        return (

            <Navigate
                to="/blog/en"
                replace
            />

        );

    }


    return (

        <main className="
            blog-page
            min-h-screen
            bg-theme-primary
        ">

            {/* =============================================
                NAVBAR
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
                        ? 'blog-page-fa'
                        : 'blog-page-en'
                }
            >

                {/* =========================================
                    HEADER
                ========================================== */}

                <header className="blog-index-header">

                    <div className="
                        container
                        mx-auto
                        px-4
                    ">

                        <div className="
                            max-w-6xl
                            mx-auto
                        ">

                            {/* TOP BAR */}

                            <div className="blog-index-topbar">

                                <span className="blog-index-eyebrow">

                                    <span
                                        className="blog-index-eyebrow-dot"
                                        aria-hidden="true"
                                    />


                                    {
                                        isPersian
                                            ? 'یادداشت‌های طراحی محصول'
                                            : 'Product Design Notes'
                                    }

                                </span>


                                <LanguageSwitch
                                    language={
                                        language
                                    }
                                    availableLanguages={{
                                        en: true,
                                        fa: true
                                    }}
                                />

                            </div>


                            {/* INTRO */}

                            <div className="blog-index-intro">

                                <h1 className="blog-index-title">

                                    {
                                        isPersian
                                            ? 'درباره‌ی مسئله، کاربر و تصمیم‌های طراحی'
                                            : 'Writing about problems, users, and product decisions'
                                    }

                                </h1>


                                <p className="blog-index-description">

                                    {
                                        isPersian
                                            ? 'یادداشت‌هایی درباره طراحی محصول، تحقیق کاربر، تعریف مسئله و تصمیم‌هایی که به ساخت تجربه‌های بهتر کمک می‌کنند.'
                                            : 'Notes on product design, user research, problem framing, and the decisions behind clearer digital products.'
                                    }

                                </p>

                            </div>

                        </div>

                    </div>

                </header>


                {/* =========================================
                    CATEGORIES
                ========================================== */}

                <section className="blog-topics-section">

                    <div className="
                        container
                        mx-auto
                        px-4
                    ">

                        <div className="
                            max-w-6xl
                            mx-auto
                        ">

                            <div className="blog-topics-heading">

                                <div>

                                    <span className="blog-section-kicker">

                                        {
                                            isPersian
                                                ? 'موضوعات'
                                                : 'Topics'
                                        }

                                    </span>


                                    <h2>

                                        {
                                            isPersian
                                                ? 'دسته‌بندی نوشته‌ها'
                                                : 'Browse by category'
                                        }

                                    </h2>

                                </div>


                                <p>

                                    {
                                        isPersian
                                            ? 'نوشته‌ها را بر اساس موضوعی که دنبال می‌کنی پیدا کن.'
                                            : 'Explore articles based on the product design topic you need.'
                                    }

                                </p>

                            </div>


                            <div className="blog-topics-grid">

                                {BLOG_CATEGORIES.map(
                                    (category) => {

                                        const active =
                                            activeCategory ===
                                            category.id;


                                        const count =
                                            categoryCounts[
                                                category.id
                                            ] || 0;


                                        return (

                                            <button
                                                key={
                                                    category.id
                                                }
                                                type="button"
                                                onClick={
                                                    () =>
                                                        setActiveCategory(
                                                            category.id
                                                        )
                                                }
                                                className={`
                                                    blog-topic-card

                                                    ${
                                                        active
                                                            ? 'blog-topic-card-active'
                                                            : ''
                                                    }
                                                `}
                                            >

                                                <span className="blog-topic-main">

                                                    <span
                                                        className="blog-topic-dot"
                                                        aria-hidden="true"
                                                    />


                                                    <span className="blog-topic-name">

                                                        {
                                                            category[
                                                                language
                                                            ] ||
                                                            category.en
                                                        }

                                                    </span>

                                                </span>


                                                <span className="blog-topic-count">

                                                    {
                                                        new Intl.NumberFormat(
                                                            isPersian
                                                                ? 'fa-IR'
                                                                : 'en-US'
                                                        ).format(
                                                            count
                                                        )
                                                    }

                                                </span>

                                            </button>

                                        );

                                    }
                                )}

                            </div>

                        </div>

                    </div>

                </section>


                {/* =========================================
                    ARTICLES
                ========================================== */}

                <section className="blog-index-content">

                    <div className="
                        container
                        mx-auto
                        px-4
                    ">

                        <div className="
                            max-w-6xl
                            mx-auto
                        ">

                            <div className="blog-list-header">

                                <div>

                                    <span className="blog-section-kicker">

                                        {
                                            isPersian
                                                ? 'مطالب'
                                                : 'Articles'
                                        }

                                    </span>


                                    <h2 className="blog-list-title">

                                        {activeCategoryLabel}

                                    </h2>

                                </div>


                                <span className="blog-list-count">

                                    {
                                        new Intl.NumberFormat(
                                            isPersian
                                                ? 'fa-IR'
                                                : 'en-US'
                                        ).format(
                                            filteredPosts.length
                                        )
                                    }

                                    {' '}

                                    {
                                        isPersian
                                            ? 'مطلب'
                                            : filteredPosts.length === 1
                                                ? 'article'
                                                : 'articles'
                                    }

                                </span>

                            </div>


                            {/* BLOG GRID */}

                            {filteredPosts.length > 0 ? (

                                <div className="blog-grid">

                                    {filteredPosts.map(
                                        (post) => (

                                            <BlogCard
                                                key={
                                                    post.slug
                                                }
                                                post={
                                                    post
                                                }
                                                language={
                                                    language
                                                }
                                            />

                                        )
                                    )}

                                </div>

                            ) : (

                                <div className="blog-empty-state">

                                    <span
                                        className="blog-empty-dot"
                                        aria-hidden="true"
                                    />


                                    <h3>

                                        {
                                            isPersian
                                                ? 'هنوز مطلبی در این دسته منتشر نشده'
                                                : 'No articles in this category yet'
                                        }

                                    </h3>


                                    <p>

                                        {
                                            isPersian
                                                ? 'به‌زودی نوشته‌های بیشتری به این بخش اضافه می‌کنم.'
                                                : 'More writing will be added here soon.'
                                        }

                                    </p>


                                    <button
                                        type="button"
                                        onClick={
                                            () =>
                                                setActiveCategory(
                                                    'all'
                                                )
                                        }
                                    >

                                        {
                                            isPersian
                                                ? 'نمایش همه مطالب'
                                                : 'View all articles'
                                        }

                                    </button>

                                </div>

                            )}

                        </div>

                    </div>

                </section>

            </div>


            {/* =============================================
                FOOTER
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


export default Blog;