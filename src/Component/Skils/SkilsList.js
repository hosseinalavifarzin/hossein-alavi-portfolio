import figmaImg from '../../asset/img/Figma.png';
import productDesignImg from '../../asset/img/ProductDesign.png';
import designSystemsImg from '../../asset/img/DesignSystems.png';
import prototypingImg from '../../asset/img/prototyping.png';
import userFlowImg from '../../asset/img/userflow.png';

import htmlImg from '../../asset/img/html5.png';
import cssImg from '../../asset/img/css.png';
import jsImg from '../../asset/img/js.jpeg';
import tailwindImg from '../../asset/img/tail.png';
import nextImg from '../../asset/img/next.png';
import pythonImg from '../../asset/img/Python.png';

import gitImg from '../../asset/img/git.png';
import googleAnalyticsImg from '../../asset/img/googleanalytics.png';
import clarityImg from '../../asset/img/clarity.png';
import hotjarImg from '../../asset/img/hotjar.png';

const skilList = [
    // Product Design
    {
        title: 'Product Design',
        url: productDesignImg,
        category: ['design'],
        level: 'Expert',
    },
    {
        title: 'Figma',
        url: figmaImg,
        category: ['design', 'tools'],
        level: 'Expert',
    },
    {
        title: 'Adobe XD',
        url: null,
        shortLabel: 'XD',
        category: ['design', 'tools'],
        level: 'Advanced',
    },
    {
        title: 'Design Systems',
        url: designSystemsImg,
        category: ['design'],
        level: 'Advanced',
    },
    {
        title: 'Prototyping',
        url: prototypingImg,
        category: ['design'],
        level: 'Advanced',
    },
    {
        title: 'User Flows',
        url: userFlowImg,
        category: ['design'],
        level: 'Advanced',
    },

    // Development
    {
        title: 'HTML',
        url: htmlImg,
        category: ['development'],
        level: 'Mid-Level',
    },
    {
        title: 'CSS',
        url: cssImg,
        category: ['development'],
        level: 'Mid-Level',
    },
    {
        title: 'JavaScript',
        url: jsImg,
        category: ['development'],
        level: 'Mid-Level',
    },
    {
        title: 'Tailwind CSS',
        url: tailwindImg,
        category: ['development'],
        level: 'Mid-Level',
    },
    {
        title: 'Python',
        url: pythonImg,
        category: ['development'],
        level: 'Mid-Level',
    },
    {
        title: 'Next.js',
        url: nextImg,
        category: ['development'],
        level: 'Familiar',
    },

    // Tools
    {
        title: 'Git',
        url: gitImg,
        category: ['tools'],
        level: 'Mid-Level',
    },
    {
        title: 'Google Analytics',
        url: googleAnalyticsImg,
        category: ['tools'],
        level: 'Familiar',
    },
    {
        title: 'Microsoft Clarity',
        url: clarityImg,
        category: ['tools'],
        level: 'Familiar',
    },
    {
        title: 'Hotjar',
        url: hotjarImg,
        category: ['tools'],
        level: 'Familiar',
    },
];

export default skilList;