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

    HiClock,

    HiSearch,

    HiX

} from 'react-icons/hi';



import MainNavBar from '../../Component/MainNavBar/MainNavBar';

import Footer from '../../Component/footer/Footer';



import blogPosts from '../../generated/blogPosts.json';



import {

    BLOG_CATEGORIES,

    getBlogCategoryLabel

} from '../../data/blogCategories';



import './Blog.css';





const BASE_URL =

    'https://hosseinalavifarzin.ir';





function getReadTimeLabel(

    minutes,

    language

) {

    if (!minutes) {

        return '';

    }



    if (language === 'fa') {

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

        `${BASE_URL}/blog/fa/`

    );

}





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



                <div className="blog-card-content">

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



                    <h2 className="blog-card-title">

                        {content.title}

                    </h2>



                    {content.description && (

                        <p className="blog-card-description">

                            {content.description}

                        </p>

                    )}



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



    const [

        searchQuery,

        setSearchQuery

    ] = useState('');





    const availablePosts =

        useMemo(

            () => {

                if (!validLanguage) {

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





    const filteredPosts =

        useMemo(

            () => {

                const normalizedSearch =

                    searchQuery

                        .trim()

                        .toLocaleLowerCase(

                            isPersian

                                ? 'fa-IR'

                                : 'en-US'

                        );



                return availablePosts.filter(

                    (post) => {

                        const categoryMatches =

                            activeCategory === 'all' ||

                            post.category ===

                                activeCategory;



                        if (!categoryMatches) {

                            return false;

                        }



                        if (!normalizedSearch) {

                            return true;

                        }



                        const content =

                            post?.[language] || {};



                        const category =

                            getBlogCategoryLabel(

                                post.category,

                                language

                            );



                        const searchableText = [

                            content.title,

                            content.description,

                            content.body,

                            category

                        ]

                            .filter(Boolean)

                            .join(' ')

                            .toLocaleLowerCase(

                                isPersian

                                    ? 'fa-IR'

                                    : 'en-US'

                            );



                        return searchableText.includes(

                            normalizedSearch

                        );

                    }

                );

            },

            [

                availablePosts,

                activeCategory,

                searchQuery,

                language,

                isPersian

            ]

        );





    const hasSearch =

        Boolean(

            searchQuery.trim()

        );





    const resetFilters = () => {

        setActiveCategory('all');

        setSearchQuery('');

    };





    useEffect(

        () => {

            setActiveCategory(

                'all'

            );



            setSearchQuery(

                ''

            );

        },

        [

            language

        ]

    );





    useEffect(

        () => {

            if (!validLanguage) {

                return;

            }



            document.documentElement.lang =

                language;



            document.documentElement.dir =

                'ltr';

        },

        [

            language,

            validLanguage

        ]

    );





    useEffect(

        () => {

            if (!validLanguage) {

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





    if (!validLanguage) {

        return (

            <Navigate

                to="/blog/fa"

                replace

            />

        );

    }





    return (
        <main className="blog-page min-h-screen bg-theme-primary">
            <div lang="en" dir="ltr">
                <MainNavBar />
            </div>

            <div
                lang={language}
                dir={direction}
                className={
                    isPersian
                        ? 'blog-page-fa'
                        : 'blog-page-en'
                }
            >
                <header className="blog-simple-header">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <form
                                className="blog-search blog-hero-search"
                                onSubmit={(event) => {
                                    event.preventDefault();

                                    document
                                        .getElementById('blog-results')
                                        ?.scrollIntoView({
                                            behavior: 'smooth',
                                            block: 'start'
                                        });
                                }}
                            >
                                <input
                                    type="search"
                                    value={searchQuery}
                                    onChange={(event) =>
                                        setSearchQuery(
                                            event.target.value
                                        )
                                    }
                                    placeholder={
                                        isPersian
                                            ? 'جستجو بین مقاله‌ها...'
                                            : 'Search articles...'
                                    }
                                    aria-label={
                                        isPersian
                                            ? 'جستجو بین مقاله‌ها'
                                            : 'Search articles'
                                    }
                                />

                                {hasSearch && (
                                    <button
                                        type="button"
                                        className="blog-search-clear"
                                        onClick={() =>
                                            setSearchQuery('')
                                        }
                                        aria-label={
                                            isPersian
                                                ? 'پاک کردن جستجو'
                                                : 'Clear search'
                                        }
                                    >
                                        <HiX />
                                    </button>
                                )}

                                <button
                                    type="submit"
                                    className="blog-search-action"
                                    aria-label={
                                        isPersian
                                            ? 'جستجو'
                                            : 'Search'
                                    }
                                >
                                    <HiSearch aria-hidden="true" />
                                    <span>
                                        {isPersian
                                            ? 'جستجو'
                                            : 'Search'}
                                    </span>
                                </button>
                            </form>

                            <div
                                className="blog-topics-tabs"
                                role="tablist"
                                aria-label={
                                    isPersian
                                        ? 'دسته‌بندی مقاله‌ها'
                                        : 'Article categories'
                                }
                            >
                                {BLOG_CATEGORIES.map(
                                    (category) => {
                                        const active =
                                            activeCategory === category.id;

                                        return (
                                            <button
                                                key={category.id}
                                                type="button"
                                                role="tab"
                                                aria-selected={active}
                                                onClick={() =>
                                                    setActiveCategory(
                                                        category.id
                                                    )
                                                }
                                                className={`blog-topic-tab ${
                                                    active
                                                        ? 'blog-topic-tab-active'
                                                        : ''
                                                }`}
                                            >
                                                <span className="blog-topic-tab-label">
                                                    {category[language] || category.en}
                                                </span>
                                            </button>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                <section
                    id="blog-results"
                    className="blog-index-content"
                >
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            {filteredPosts.length > 0 ? (
                                <div className="blog-grid">
                                    {filteredPosts.map(
                                        (post) => (
                                            <BlogCard
                                                key={post.slug}
                                                post={post}
                                                language={language}
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
                                        {isPersian
                                            ? 'مطلبی پیدا نشد'
                                            : 'No articles found'}
                                    </h3>

                                    <p>
                                        {isPersian
                                            ? 'عبارت دیگری را امتحان کن یا فیلترها را پاک کن.'
                                            : 'Try another phrase or clear the current filters.'}
                                    </p>

                                    <button
                                        type="button"
                                        onClick={resetFilters}
                                    >
                                        {isPersian
                                            ? 'پاک کردن فیلترها'
                                            : 'Clear filters'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>

            <div lang="en" dir="ltr">
                <Footer />
            </div>
        </main>
    );

}





export default Blog;
