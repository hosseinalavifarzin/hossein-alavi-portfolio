export const BLOG_CATEGORIES = [
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


export function getBlogCategory(
    categoryId
) {

    return (
        BLOG_CATEGORIES.find(
            (category) =>
                category.id === categoryId
        ) || null
    );

}


export function getBlogCategoryLabel(
    categoryId,
    language = 'en'
) {

    const category =
        getBlogCategory(
            categoryId
        );


    if (!category) {
        return categoryId || '';
    }


    return (
        category[language] ||
        category.en
    );

}
