import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import {
    HiArrowRight,
    HiOutlineCollection
} from 'react-icons/hi';

import projects from '../../data/projects';


function Projects() {
    const [isVisible, setIsVisible] = useState(false);

    const sectionRef = useRef(null);


    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.1
            }
        );


        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }


        return () => observer.disconnect();

    }, []);


    return (
        <section
            ref={sectionRef}
            id="projects"
            className="relative py-16 sm:py-24 overflow-hidden"
        >

            {/* Background */}
            <div className="absolute inset-0 bg-theme-primary">

                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/40 to-transparent"></div>

                <div className="absolute top-20 right-0 w-80 h-80 bg-primary-500/10 dark:bg-primary-500/5 rounded-full blur-3xl"></div>

                <div className="absolute bottom-20 left-0 w-80 h-80 bg-accent-cyan/10 dark:bg-accent-cyan/5 rounded-full blur-3xl"></div>

            </div>


            <div className="container mx-auto px-4 relative z-10">

                {/* Header */}
                <div
                    className={`max-w-3xl mb-12 sm:mb-16 transition-all duration-700 ${
                        isVisible
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-10'
                    }`}
                >

                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light text-primary-500 text-xs sm:text-sm font-medium mb-4">

                        <HiOutlineCollection />

                        Selected Projects

                    </span>


                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-theme-primary leading-tight mb-5">

                        Products I've Helped{' '}

                        <span className="gradient-text">
                            Shape
                        </span>

                    </h2>


                    <p className="text-theme-secondary text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl">

                        A selection of digital products I've worked on across
                        B2B platforms, internal tools, mobile experiences,
                        dashboards, and web products.

                    </p>

                </div>


                {/* Projects Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">

                    {projects.map((project, index) => {

                        const coverImage =
                            project.images && project.images.length > 0
                                ? project.images[0]
                                : null;


                        return (
                            <Link
                                key={project.id}
                                to={`/projects/${project.id}`}
                                className={`group block transition-all duration-700 ${
                                    isVisible
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-10'
                                }`}
                                style={{
                                    transitionDelay: `${index * 100}ms`
                                }}
                            >

                                <article className="glass rounded-2xl sm:rounded-3xl overflow-hidden h-full hover:-translate-y-1 transition-all duration-300">

                                    {/* Image */}
                                    <div className="relative aspect-[16/8] overflow-hidden bg-black/5 dark:bg-white/5 p-3 sm:p-4">

                                        {coverImage ? (

                                            <img
                                                src={coverImage}
                                                alt={project.title}
                                                className="w-full h-full object-contain rounded-xl transition-transform duration-500 group-hover:scale-[1.02]"
                                            />

                                        ) : (

                                            <div className="w-full h-full flex items-center justify-center">

                                                <HiOutlineCollection className="text-5xl text-primary-500" />

                                            </div>

                                        )}


                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>


                                        {/* Category */}
                                        <div className="absolute top-4 left-4">

                                            <span className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md text-white text-xs font-medium">

                                                {project.category}

                                            </span>

                                        </div>

                                    </div>


                                    {/* Content */}
                                    <div className="p-5 sm:p-6">

                                        {project.company && (

                                            <p className="text-primary-500 text-xs sm:text-sm font-medium mb-2">

                                                {project.company}

                                            </p>

                                        )}


                                        <h3 className="text-xl sm:text-2xl font-bold text-theme-primary mb-3 group-hover:text-primary-500 transition-colors">

                                            {project.title}

                                        </h3>


                                        <p className="text-theme-secondary text-sm leading-relaxed mb-5">

                                            {project.description}

                                        </p>


                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-6">

                                            {project.tags.slice(0, 4).map((tag) => (

                                                <span
                                                    key={tag}
                                                    className="px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-theme-secondary text-[11px] sm:text-xs"
                                                >

                                                    {tag}

                                                </span>

                                            ))}

                                        </div>


                                        {/* CTA */}
                                        <div className="inline-flex items-center gap-2 text-primary-500 text-sm font-semibold">

                                            View Case Study

                                            <HiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />

                                        </div>

                                    </div>

                                </article>

                            </Link>
                        );

                    })}

                </div>

            </div>

        </section>
    );
}


export default Projects;