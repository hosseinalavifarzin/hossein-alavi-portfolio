const fs = require('fs');
const path = require('path');

const buildDirectory = path.join(__dirname, '..', 'build');
const sourceIndex = path.join(buildDirectory, 'index.html');

const routes = [
    'projects/tipax',
    'projects/citynet',
    'projects/blue',
    'projects/3click',
    'projects/darzi',
    'projects/yahoo'
];

if (!fs.existsSync(sourceIndex)) {
    console.error('build/index.html was not found.');
    process.exit(1);
}

routes.forEach((route) => {
    const routeDirectory = path.join(
        buildDirectory,
        ...route.split('/')
    );

    const routeIndex = path.join(
        routeDirectory,
        'index.html'
    );

    fs.mkdirSync(routeDirectory, {
        recursive: true
    });

    fs.copyFileSync(
        sourceIndex,
        routeIndex
    );

    console.log(`Created static route: /${route}/`);
});

console.log('Static project routes generated successfully.');