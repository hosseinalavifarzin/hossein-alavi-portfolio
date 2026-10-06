const fs = require('fs');
const path = require('path');


// =========================================================
// PATHS
// =========================================================

const rootDirectory =
    path.join(__dirname, '..');

const contentDirectory =
    path.join(
        rootDirectory,
        'content',
        'blog'
    );

const generatedDirectory =
    path.join(
        rootDirectory,
        'src',
        'generated'
    );

const outputFile =
    path.join(
        generatedDirectory,
        'blogPosts.json'
    );


// =========================================================
// HELPERS
// =========================================================

function normalizeLineEndings(
    value = ''
) {

    return String(value)
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n');

}


// =========================================================
// REMOVE PUBLICATION METADATA FROM BODY
//
// Removes:
//
// ### مشخصات انتشار
// SEO title...
// slug...
// meta description...
//
// Because that information belongs to the CMS data,
// not to the visible article.
// =========================================================

function removePublicationMetadata(
    markdown = ''
) {

    const normalized =
        normalizeLineEndings(
            markdown
        );


    const marker =
        /^###\s+مشخصات انتشار\s*$/im;


    const match =
        marker.exec(
            normalized
        );


    if (
        !match
    ) {

        return normalized.trim();

    }


    let article =
        normalized
            .slice(
                0,
                match.index
            )
            .trimEnd();


    /*
     * Remove a horizontal rule immediately
     * before the publication metadata.
     *
     * Supports:
     *
     * ---
     * - - -
     * ***
     * * * *
     */

    article =
        article.replace(
            /\n(?:\s*[-*_]\s*){3,}\s*$/m,
            ''
        );


    return article.trim();

}


// =========================================================
// EXTRACT FIRST H1
// =========================================================

function extractTitle(
    markdown = '',
    fallback = ''
) {

    const match =
        normalizeLineEndings(
            markdown
        ).match(
            /^#\s+(.+?)\s*$/m
        );


    if (
        match &&
        match[1]
    ) {

        return match[1].trim();

    }


    return String(
        fallback || ''
    ).trim();

}


// =========================================================
// REMOVE FIRST H1 FROM DISPLAY BODY
//
// Article page already renders the title separately.
// This prevents duplicate H1.
// =========================================================

function removeFirstH1(
    markdown = ''
) {

    return normalizeLineEndings(
        markdown
    )
        .replace(
            /^#\s+.+?\s*\n+/,
            ''
        )
        .trim();

}


// =========================================================
// REMOVE MARKDOWN FORMATTING FOR TEXT ANALYSIS
// =========================================================

function markdownToPlainText(
    markdown = ''
) {

    return normalizeLineEndings(
        markdown
    )

        // code blocks
        .replace(
            /```[\s\S]*?```/g,
            ' '
        )

        // inline code
        .replace(
            /`([^`]+)`/g,
            '$1'
        )

        // images
        .replace(
            /!\[([^\]]*)\]\([^)]+\)/g,
            '$1'
        )

        // links
        .replace(
            /\[([^\]]+)\]\([^)]+\)/g,
            '$1'
        )

        // headings
        .replace(
            /^#{1,6}\s+/gm,
            ''
        )

        // blockquotes
        .replace(
            /^>\s?/gm,
            ''
        )

        // bold / italic
        .replace(
            /[*_~]/g,
            ''
        )

        // table separators
        .replace(
            /\|/g,
            ' '
        )

        // multiple spaces
        .replace(
            /\s+/g,
            ' '
        )

        .trim();

}


// =========================================================
// AUTOMATIC DESCRIPTION FALLBACK
//
// Normally the CMS description is used.
// If empty, use the first useful paragraph.
// =========================================================

function createDescription(
    markdown = '',
    providedDescription = ''
) {

    const cleanProvided =
        String(
            providedDescription || ''
        ).trim();


    if (
        cleanProvided
    ) {

        return cleanProvided;

    }


    const normalized =
        normalizeLineEndings(
            markdown
        );


    const blocks =
        normalized.split(
            /\n\s*\n/
        );


    for (
        const block
        of blocks
    ) {

        const trimmed =
            block.trim();


        if (
            !trimmed ||
            trimmed.startsWith('#') ||
            trimmed.startsWith('>') ||
            trimmed.startsWith('|') ||
            trimmed.startsWith('```') ||
            trimmed.startsWith('![')
        ) {

            continue;

        }


        const plainText =
            markdownToPlainText(
                trimmed
            );


        if (
            plainText.length < 20
        ) {

            continue;

        }


        if (
            plainText.length <= 165
        ) {

            return plainText;

        }


        return (
            `${plainText.slice(0, 162).trim()}...`
        );

    }


    return '';

}


// =========================================================
// READING TIME
// =========================================================

function calculateReadingTime(
    markdown = ''
) {

    const plainText =
        markdownToPlainText(
            markdown
        );


    if (
        !plainText
    ) {

        return 1;

    }


    const words =
        plainText
            .split(/\s+/)
            .filter(Boolean);


    /*
     * Approximate reading speed.
     * We keep the number language-neutral here.
     * UI later renders:
     *
     * EN: 8 min read
     * FA: ۸ دقیقه مطالعه
     */

    return Math.max(
        1,
        Math.ceil(
            words.length / 200
        )
    );

}


// =========================================================
// HEADING ID
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


    return (
        normalized ||
        'section'
    );

}


// =========================================================
// TABLE OF CONTENTS
// =========================================================

function createTableOfContents(
    markdown = ''
) {

    const lines =
        normalizeLineEndings(
            markdown
        ).split('\n');


    const toc = [];

    const usedIds =
        new Map();


    lines.forEach(
        (line) => {

            const match =
                line.match(
                    /^(##|###)\s+(.+?)\s*$/
                );


            if (
                !match
            ) {

                return;

            }


            const level =
                match[1].length;


            const title =
                markdownToPlainText(
                    match[2]
                );


            const baseId =
                createHeadingId(
                    title
                );


            const currentCount =
                usedIds.get(
                    baseId
                ) || 0;


            usedIds.set(
                baseId,
                currentCount + 1
            );


            const id =
                currentCount === 0

                    ? baseId

                    : `${baseId}-${currentCount + 1}`;


            toc.push({

                id,

                level,

                title

            });

        }
    );


    return toc;

}


// =========================================================
// LANGUAGE NORMALIZER
// =========================================================

function normalizeTranslation(
    translation,
    fallbackTitle = ''
) {

    if (
        !translation ||
        translation.enabled !== true ||
        !translation.body ||
        !String(
            translation.body
        ).trim()
    ) {

        return null;

    }


    const cleanedArticle =
        removePublicationMetadata(
            translation.body
        );


    const title =
        extractTitle(
            cleanedArticle,
            fallbackTitle
        );


    const body =
        removeFirstH1(
            cleanedArticle
        );


    const description =
        createDescription(
            body,
            translation.description
        );


    return {

        enabled:
            true,

        title,

        description,

        body,

        readTimeMinutes:
            calculateReadingTime(
                body
            ),

        tableOfContents:
            createTableOfContents(
                body
            )

    };

}


// =========================================================
// VALIDATE CONTENT DIRECTORY
// =========================================================

if (
    !fs.existsSync(
        contentDirectory
    )
) {

    fs.mkdirSync(
        contentDirectory,
        {
            recursive: true
        }
    );

}


// =========================================================
// READ ARTICLE FILES
// =========================================================

const articleFiles =
    fs.readdirSync(
        contentDirectory
    )
        .filter(
            (fileName) =>
                fileName.endsWith(
                    '.json'
                )
        );


// =========================================================
// NORMALIZE ARTICLES
// =========================================================

const blogPosts = [];


articleFiles.forEach(
    (fileName) => {

        const filePath =
            path.join(
                contentDirectory,
                fileName
            );


        let source;


        try {

            source =
                JSON.parse(
                    fs.readFileSync(
                        filePath,
                        'utf8'
                    )
                );

        } catch (error) {

            console.error(
                `Could not parse ${fileName}`
            );

            console.error(
                error.message
            );

            process.exitCode = 1;

            return;

        }


        const slug =
            String(
                source.slug || ''
            ).trim();


        if (
            !slug
        ) {

            console.warn(
                `Skipped ${fileName}: missing slug.`
            );

            return;

        }


        /*
         * Older CMS version stored a title field.
         *
         * The first H1 now has priority.
         * The old title remains only as fallback,
         * so existing articles keep working.
         */

        const fa =
            normalizeTranslation(
                source.fa,
                source.fa?.title
            );


        const en =
            normalizeTranslation(
                source.en,
                source.en?.title
            );


        if (
            !fa &&
            !en
        ) {

            console.warn(
                `Skipped ${fileName}: no enabled language with content.`
            );

            return;

        }


        const post = {

            slug,

            category:
                source.category ||
                'product-thinking',

            featured:
                source.featured === true,

            author:
                source.author ||
                'Hossein Alavi',

            publishedAt:
                source.publishedAt ||
                null,

            cover:
                source.cover ||
                null,

            languages: {

                fa:
                    Boolean(fa),

                en:
                    Boolean(en)

            },

            fa,

            en

        };


        blogPosts.push(
            post
        );

    }
);


// =========================================================
// SORT
//
// Articles with real publication dates first.
// Newer first.
//
// Articles without dates stay after dated posts.
// =========================================================

blogPosts.sort(
    (a, b) => {

        if (
            a.publishedAt &&
            b.publishedAt
        ) {

            return (
                new Date(
                    b.publishedAt
                ) -
                new Date(
                    a.publishedAt
                )
            );

        }


        if (
            a.publishedAt
        ) {

            return -1;

        }


        if (
            b.publishedAt
        ) {

            return 1;

        }


        return a.slug.localeCompare(
            b.slug
        );

    }
);


// =========================================================
// WRITE GENERATED DATA
// =========================================================

fs.mkdirSync(
    generatedDirectory,
    {
        recursive: true
    }
);


fs.writeFileSync(
    outputFile,
    `${JSON.stringify(
        blogPosts,
        null,
        2
    )}\n`,
    'utf8'
);


console.log(
    `Generated Blog data: ${blogPosts.length} article(s).`
);


blogPosts.forEach(
    (post) => {

        const languages = [];

        if (
            post.languages.fa
        ) {
            languages.push('FA');
        }

        if (
            post.languages.en
        ) {
            languages.push('EN');
        }


        console.log(
            `- ${post.slug} [${languages.join(', ')}]`
        );

    }
);