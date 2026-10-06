const fs = require('fs');
const path = require('path');

const buildDirectory = path.join(__dirname, '..', 'build');
const sourceIndex = path.join(buildDirectory, 'index.html');

const baseUrl = 'https://hosseinalavifarzin.ir';

const routes = [
    {
        path: 'projects/tipax',
        title: 'Tipax Logistics Platform | Product Design Case Study | Hossein Alavi',
        description:
            'Product design case study by Hossein Alavi for an internal Tipax logistics operations platform, focused on complex workflows, information hierarchy, and scalable interaction patterns.'
    },
    {
        path: 'projects/citynet',
        title: 'Citynet Travel-Tech Ecosystem | Product Design Case Study | Hossein Alavi',
        description:
            'Product design case study by Hossein Alavi for Citynet, covering a travel-tech product ecosystem, B2B and B2C experiences, internal tools, reporting, and a scalable design system.'
    },
    {
        path: 'projects/blue',
        title: 'BluLexi AI Language Learning Platform | Product Design Case Study | Hossein Alavi',
        description:
            'Product design case study by Hossein Alavi for BluLexi, an AI-assisted language learning platform connecting assessment, practice, feedback, progress, and exam preparation.'
    },
    {
        path: 'projects/3click',
        title: '3Click Travel Booking Redesign | Product Design Case Study | Hossein Alavi',
        description:
            'Product design case study by Hossein Alavi for 3Click, covering travel booking experiences, customer-facing products, CMS tools, internal workflows, and a shared design system.'
    },
    {
        path: 'projects/darzi',
        title: 'Darzi Automotive E-commerce | Product Design Case Study | Hossein Alavi',
        description:
            'Product design case study by Hossein Alavi for Darzi, a premium automotive e-commerce experience focused on product confidence, craftsmanship, usability, and brand experience.'
    },
    {
        path: 'projects/yahoo',
        title: 'Yahoo Booking | Accommodation Product Design Case Study | Hossein Alavi',
        description:
            'Product design case study by Hossein Alavi for a localized accommodation booking platform designed around Persian, RTL, travel discovery, comparison, and booking experiences.'
    }
];

function escapeAttribute(value) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function replaceMeta(html, selectorRegex, replacement) {
    if (selectorRegex.test(html)) {
        return html.replace(selectorRegex, replacement);
    }

    return html.replace('</head>', `  ${replacement}\n</head>`);
}

if (!fs.existsSync(sourceIndex)) {
    console.error('build/index.html was not found.');
    process.exit(1);
}

const sourceHtml = fs.readFileSync(sourceIndex, 'utf8');

routes.forEach((route) => {
    const routeDirectory = path.join(
        buildDirectory,
        ...route.path.split('/')
    );

    const routeIndex = path.join(
        routeDirectory,
        'index.html'
    );

    const routeUrl = `${baseUrl}/${route.path}/`;
    const title = escapeAttribute(route.title);
    const description = escapeAttribute(route.description);

    let html = sourceHtml;

    html = html.replace(
        /<title>[\s\S]*?<\/title>/i,
        `<title>${title}</title>`
    );

    html = replaceMeta(
        html,
        /<meta[^>]+name=["']description["'][^>]*>/i,
        `<meta name="description" content="${description}" />`
    );

    html = replaceMeta(
        html,
        /<link[^>]+rel=["']canonical["'][^>]*>/i,
        `<link rel="canonical" href="${routeUrl}" />`
    );

    html = replaceMeta(
        html,
        /<meta[^>]+property=["']og:title["'][^>]*>/i,
        `<meta property="og:title" content="${title}" />`
    );

    html = replaceMeta(
        html,
        /<meta[^>]+property=["']og:description["'][^>]*>/i,
        `<meta property="og:description" content="${description}" />`
    );

    html = replaceMeta(
        html,
        /<meta[^>]+property=["']og:url["'][^>]*>/i,
        `<meta property="og:url" content="${routeUrl}" />`
    );

    html = replaceMeta(
        html,
        /<meta[^>]+name=["']twitter:title["'][^>]*>/i,
        `<meta name="twitter:title" content="${title}" />`
    );

    html = replaceMeta(
        html,
        /<meta[^>]+name=["']twitter:description["'][^>]*>/i,
        `<meta name="twitter:description" content="${description}" />`
    );

    fs.mkdirSync(routeDirectory, {
        recursive: true
    });

    fs.writeFileSync(
        routeIndex,
        html,
        'utf8'
    );

    console.log(`Created SEO route: /${route.path}/`);
});

console.log('Static SEO project routes generated successfully.');
