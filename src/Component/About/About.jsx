import { useEffect, useRef, useState } from 'react';
import { FaPencilRuler, FaLayerGroup, FaProjectDiagram } from 'react-icons/fa';
import { HiBriefcase, HiLightBulb, HiUsers } from 'react-icons/hi';

const stats = [
    {
        number: '5+',
        label: 'Years Designing Digital Products',
        icon: HiBriefcase
    },
    {
        number: 'B2B Products',
        label: 'Platforms for Agencies & Business Teams',
        icon: HiUsers
    },
    {
        number: 'Operational Tools',
        label: 'Complex Workflows for Internal Teams',
        icon: FaProjectDiagram
    },
    {
        number: 'Design Systems',
        label: 'Reusable & Scalable Product Foundations',
        icon: FaLayerGroup
    },
];

const highlights = [
    {
        icon: FaPencilRuler,
        title: 'Complex Product Design',
        description:
            'I design B2B platforms, operational tools, booking systems, and internal products where workflows can become complex quickly. My focus is turning that complexity into clear and usable experiences.',
        color: 'from-primary-500 to-primary-600',
    },
    {
        icon: HiLightBulb,
        title: 'Product & Business Thinking',
        description:
            'I look beyond individual screens and consider user needs, business goals, operational requirements, technical constraints, and how the product needs to grow over time.',
        color: 'from-accent-cyan to-blue-500',
    },
    {
        icon: FaLayerGroup,
        title: 'Systems & Scalability',
        description:
            'I structure products through clear flows, reusable patterns, white-label solutions, and design systems that make products easier to maintain and scale.',
        color: 'from-accent-purple to-pink-500',
    },
];

function About() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative py-16 sm:py-24 overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-theme-secondary">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"></div>

                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">

                {/* Section Header */}
                <div
                    className={`text-center mb-10 sm:mb-16 transition-all duration-700 ${
                        isVisible
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-10'
                    }`}
                >
                    <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass-light text-primary-500 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                        About Me
                    </span>

                    <h2 className="section-title">
                        <span className="text-theme-primary">
                            How I Think About{' '}
                        </span>

                        <span className="gradient-text">
                            Product Design
                        </span>
                    </h2>

                    <p className="section-subtitle px-2 sm:px-0">
                        Turning complex product problems into clear,
                        practical, and scalable experiences
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-20">

                    {/* My Story */}
                    <div
                        className={`transition-all duration-700 delay-200 ${
                            isVisible
                                ? 'opacity-100 translate-x-0'
                                : 'opacity-0 -translate-x-10'
                        }`}
                    >
                        <div className="glass rounded-xl sm:rounded-2xl p-5 sm:p-8">

                            <h3 className="text-xl sm:text-2xl font-bold text-theme-primary mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                                <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary-500 to-accent-cyan flex items-center justify-center text-lg sm:text-base">
                                    📖
                                </span>

                                My Story
                            </h3>

                            <div className="space-y-3 sm:space-y-4 text-theme-secondary leading-relaxed text-sm sm:text-base">

                                <p>
                                    I'm a{' '}
                                    <span className="text-primary-500 font-medium">
                                        Product Designer
                                    </span>{' '}
                                    with over 5 years of experience designing
                                    B2B platforms, operational tools, mobile
                                    products, booking systems, and complex
                                    digital experiences.
                                </p>

                                <p>
                                    My work usually starts before the interface.
                                    I try to understand the{' '}
                                    <span className="text-accent-cyan">
                                        real problem
                                    </span>
                                    , how people currently work, what the
                                    business is trying to achieve, and where
                                    friction exists in the product.
                                </p>

                                <p>
                                    I've worked across products in{' '}
                                    <span className="text-accent-purple">
                                        travel, logistics, insurance, booking,
                                        and internal operations
                                    </span>
                                    . My experience includes B2B platforms,
                                    CMS products, white-label systems,
                                    operational dashboards, and mobile apps.
                                </p>

                                <p>
                                    I work across the full product design
                                    process — from{' '}
                                    <span className="text-primary-500 font-semibold">
                                        problem definition and product flows
                                    </span>{' '}
                                    to prototyping, interface design, design
                                    systems, developer collaboration, and
                                    reviewing the final implementation.
                                </p>

                                <p>
                                    What interests me most is taking something
                                    complicated and making it easier to
                                    understand, easier to use, and easier to
                                    scale as the product grows.
                                </p>

                            </div>
                        </div>
                    </div>

                    {/* Highlights */}
                    <div
                        className={`space-y-4 sm:space-y-6 transition-all duration-700 delay-400 ${
                            isVisible
                                ? 'opacity-100 translate-x-0'
                                : 'opacity-0 translate-x-10'
                        }`}
                    >
                        {highlights.map((item, index) => (
                            <div
                                key={index}
                                className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 card-hover group"
                                style={{
                                    animationDelay: `${index * 0.1}s`,
                                }}
                            >
                                <div className="flex items-start gap-3 sm:gap-4">

                                    <div
                                        className={`w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                                    >
                                        <item.icon className="text-xl sm:text-2xl text-white" />
                                    </div>

                                    <div>
                                        <h4 className="text-base sm:text-lg font-bold text-theme-primary mb-1 sm:mb-2">
                                            {item.title}
                                        </h4>

                                        <p className="text-theme-secondary text-xs sm:text-sm leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <div
                    className={`grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 transition-all duration-700 delay-600 ${
                        isVisible
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-10'
                    }`}
                >
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center card-hover group"
                        >
                            <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-4 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-cyan/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">

                                <stat.icon className="text-lg sm:text-2xl text-primary-500" />

                            </div>

                            <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1 sm:mb-2">
                                {stat.number}
                            </div>

                            <div className="text-theme-secondary text-xs sm:text-sm">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default About;