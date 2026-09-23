import { useEffect } from 'react';

import {
    Link,
    useParams
} from 'react-router-dom';

import {
    HiArrowLeft,
    HiArrowRight,
    HiBriefcase,
    HiCalendar,
    HiLocationMarker,
    HiExternalLink,
    HiOutlineCollection,
    HiOutlineLightBulb
} from 'react-icons/hi';

import projects from '../../data/projects';


function ProjectDetails() {
    const { projectId } = useParams();


    const projectIndex = projects.findIndex(
        (item) => item.id === projectId
    );


    const project = projects[projectIndex];


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [projectId]);


    if (!project) {
        return (
            <main className="min-h-screen bg-theme-primary flex items-center justify-center px-4">

                <div className="text-center">

                    <p className="text-primary-500 font-semibold mb-3">
                        404
                    </p>

                    <h1 className="text-4xl sm:text-5xl font-bold text-theme-primary mb-4">

                        Project not found

                    </h1>

                    <Link
                        to="/"
                        className="btn-primary inline-flex items-center gap-2"
                    >

                        <HiArrowLeft />

                        Back to Portfolio

                    </Link>

                </div>

            </main>
        );
    }


    const previousProject =
        projectIndex > 0
            ? projects[projectIndex - 1]
            : null;


    const nextProject =
        projectIndex < projects.length - 1
            ? projects[projectIndex + 1]
            : null;


    const heroImage =
        project.images?.[0] || null;


    const galleryImages =
        project.images?.slice(1) || [];


    return (
        <main className="min-h-screen bg-theme-primary">

            {/* Top Navigation */}
            <div className="fixed top-0 left-0 right-0 z-50 border-b border-black/5 dark:border-white/5 backdrop-blur-xl bg-white/70 dark:bg-[#11111b]/70">

                <div className="container mx-auto px-4 h-16 flex items-center justify-between">

                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-theme-secondary hover:text-primary-500 transition-colors text-sm font-medium"
                    >

                        <HiArrowLeft />

                        Portfolio

                    </Link>


                    <span className="text-theme-muted text-xs sm:text-sm">

                        Product Design Case Study

                    </span>

                </div>

            </div>


            {/* Hero */}
            <section className="relative pt-28 sm:pt-36 pb-14 sm:pb-20 overflow-hidden">

                <div className="absolute inset-0 pointer-events-none">

                    <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>

                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl"></div>

                </div>


                <div className="container mx-auto px-4 relative z-10">

                    <div className="max-w-5xl">

                        <span className="inline-block px-4 py-2 rounded-full glass-light text-primary-500 text-xs sm:text-sm font-medium mb-6">

                            {project.category}

                        </span>


                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-theme-primary leading-tight mb-5">

                            {project.title}

                        </h1>


                        {project.company && (

                            <p className="text-xl sm:text-2xl gradient-text font-semibold mb-6">

                                {project.company}

                            </p>

                        )}


                        <p className="text-theme-secondary text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl">

                            {project.description}

                        </p>


                        {/* Meta */}
                        <div className="flex flex-wrap gap-3 mt-9">

                            {project.role && (

                                <div className="glass rounded-xl px-4 py-3 min-w-[150px]">

                                    <div className="flex items-center gap-2 text-theme-muted text-xs mb-1">

                                        <HiBriefcase />

                                        Role

                                    </div>

                                    <p className="text-theme-primary text-sm font-semibold">

                                        {project.role}

                                    </p>

                                </div>

                            )}


                            {project.duration && (

                                <div className="glass rounded-xl px-4 py-3 min-w-[150px]">

                                    <div className="flex items-center gap-2 text-theme-muted text-xs mb-1">

                                        <HiCalendar />

                                        Duration

                                    </div>

                                    <p className="text-theme-primary text-sm font-semibold">

                                        {project.duration}

                                    </p>

                                </div>

                            )}


                            {project.location && (

                                <div className="glass rounded-xl px-4 py-3 min-w-[150px]">

                                    <div className="flex items-center gap-2 text-theme-muted text-xs mb-1">

                                        <HiLocationMarker />

                                        Location

                                    </div>

                                    <p className="text-theme-primary text-sm font-semibold">

                                        {project.location}

                                    </p>

                                </div>

                            )}

                        </div>


                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-7">

                            {project.tags.map((tag) => (

                                <span
                                    key={tag}
                                    className="px-3 py-1.5 rounded-lg glass text-theme-secondary text-xs sm:text-sm"
                                >

                                    {tag}

                                </span>

                            ))}

                        </div>

                    </div>

                </div>

            </section>


            {/* Hero Image */}
            {heroImage && (

                <section className="pb-16 sm:pb-24">

                    <div className="container mx-auto px-4">

                        <div className="glass rounded-2xl sm:rounded-3xl overflow-hidden p-2">

                            <img
                                src={heroImage}
                                alt={`${project.title} cover`}
                                className="w-full h-auto rounded-xl sm:rounded-2xl"
                            />

                        </div>

                    </div>

                </section>

            )}


            {/* Detailed Case Study */}
            {project.details && (
                <>

                    {/* Overview */}
                    <section className="py-16 sm:py-24 bg-theme-secondary">

                        <div className="container mx-auto px-4">

                            <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">

                                <div className="lg:col-span-4">

                                    <span className="text-primary-500 text-sm font-semibold">

                                        01 — Overview

                                    </span>

                                    <h2 className="text-3xl sm:text-4xl font-bold text-theme-primary mt-3">

                                        The Product

                                    </h2>

                                </div>


                                <div className="lg:col-span-8">

                                    <p className="text-theme-secondary text-lg sm:text-xl leading-relaxed">

                                        {project.details.overview}

                                    </p>

                                </div>

                            </div>

                        </div>

                    </section>


                    {/* Problem */}
                    <section className="py-16 sm:py-24">

                        <div className="container mx-auto px-4">

                            <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">

                                <div className="lg:col-span-4">

                                    <span className="text-primary-500 text-sm font-semibold">

                                        02 — Problem Space

                                    </span>

                                    <h2 className="text-3xl sm:text-4xl font-bold text-theme-primary mt-3">

                                        Understanding the Problem

                                    </h2>

                                </div>


                                <div className="lg:col-span-8">

                                    <div className="glass rounded-2xl p-6 sm:p-8">

                                        <HiOutlineLightBulb className="text-primary-500 text-3xl mb-5" />


                                        <p className="text-theme-secondary text-lg leading-relaxed">

                                            {project.details.problem}

                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </section>


                    {/* Contributions */}
                    <section className="py-16 sm:py-24 bg-theme-secondary">

                        <div className="container mx-auto px-4">

                            <span className="text-primary-500 text-sm font-semibold">

                                03 — My Contribution

                            </span>


                            <h2 className="text-3xl sm:text-4xl font-bold text-theme-primary mt-3 mb-10">

                                What I Worked On

                            </h2>


                            <div className="grid md:grid-cols-2 gap-4">

                                {project.details.contributions.map(
                                    (item, index) => (

                                        <div
                                            key={item}
                                            className="glass rounded-2xl p-5 flex gap-4"
                                        >

                                            <span className="text-primary-500 font-bold">

                                                {String(index + 1).padStart(2, '0')}

                                            </span>


                                            <p className="text-theme-secondary leading-relaxed">

                                                {item}

                                            </p>

                                        </div>

                                    )
                                )}

                            </div>

                        </div>

                    </section>


                    {/* Process */}
                    <section className="py-16 sm:py-24">

                        <div className="container mx-auto px-4">

                            <span className="text-primary-500 text-sm font-semibold">

                                04 — Product Design Process

                            </span>


                            <h2 className="text-3xl sm:text-4xl font-bold text-theme-primary mt-3 mb-10">

                                How I Approached the Product

                            </h2>


                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

                                {project.details.process.map(
                                    (item, index) => (

                                        <div
                                            key={item}
                                            className="glass rounded-2xl p-6"
                                        >

                                            <span className="text-4xl font-bold gradient-text">

                                                {String(index + 1).padStart(2, '0')}

                                            </span>


                                            <div className="h-px bg-black/10 dark:bg-white/10 my-5"></div>


                                            <p className="text-theme-primary font-medium leading-relaxed">

                                                {item}

                                            </p>

                                        </div>

                                    )
                                )}

                            </div>

                        </div>

                    </section>

                </>
            )}


            {/* Screens */}
            <section className="py-16 sm:py-24 bg-theme-secondary">

                <div className="container mx-auto px-4">

                    <span className="text-primary-500 text-sm font-semibold">

                        {project.details ? '05 — Selected Screens' : 'Selected Screens'}

                    </span>


                    <h2 className="text-3xl sm:text-4xl font-bold text-theme-primary mt-3 mb-10">

                        Product Screens & Explorations

                    </h2>


                    {galleryImages.length > 0 ? (

                        <div className="grid md:grid-cols-2 gap-5 sm:gap-6">

                            {galleryImages.map((image, index) => (

                                <div
                                    key={index}
                                    className={`glass rounded-2xl overflow-hidden ${
                                        index === 0
                                            ? 'md:col-span-2'
                                            : ''
                                    }`}
                                >

                                    <img
                                        src={image}
                                        alt={`${project.title} screen ${index + 1}`}
                                        className="w-full h-auto"
                                    />

                                </div>

                            ))}

                        </div>

                    ) : (

                        <div className="glass rounded-2xl aspect-video flex items-center justify-center">

                            <HiOutlineCollection className="text-primary-500 text-5xl" />

                        </div>

                    )}

                </div>

            </section>


            {/* Outcome */}
            {project.details?.outcome && (

                <section className="py-16 sm:py-24">

                    <div className="container mx-auto px-4">

                        <div className="max-w-4xl">

                            <span className="text-primary-500 text-sm font-semibold">

                                06 — Outcome

                            </span>


                            <h2 className="text-3xl sm:text-4xl font-bold text-theme-primary mt-3 mb-8">

                                Product Outcome

                            </h2>


                            <div className="glass rounded-2xl p-6 sm:p-8">

                                <p className="text-theme-secondary text-lg sm:text-xl leading-relaxed">

                                    {project.details.outcome}

                                </p>

                            </div>


                            {project.website && (

                                <a
                                    href={project.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 mt-8 text-primary-500 hover:text-primary-400 font-medium"
                                >

                                    Visit Company Website

                                    <HiExternalLink />

                                </a>

                            )}

                        </div>

                    </div>

                </section>

            )}


            {/* Previous / Next */}
            <section className="py-12 sm:py-16 border-t border-black/10 dark:border-white/10">

                <div className="container mx-auto px-4">

                    <div className="grid grid-cols-2 gap-4">

                        <div>

                            {previousProject && (

                                <Link
                                    to={`/projects/${previousProject.id}`}
                                    className="group inline-block"
                                >

                                    <span className="text-theme-muted text-xs">

                                        Previous Project

                                    </span>


                                    <div className="flex items-center gap-2 text-theme-primary font-semibold mt-2 group-hover:text-primary-500 transition-colors">

                                        <HiArrowLeft />

                                        {previousProject.title}

                                    </div>

                                </Link>

                            )}

                        </div>


                        <div className="text-right">

                            {nextProject && (

                                <Link
                                    to={`/projects/${nextProject.id}`}
                                    className="group inline-block"
                                >

                                    <span className="text-theme-muted text-xs">

                                        Next Project

                                    </span>


                                    <div className="flex items-center justify-end gap-2 text-theme-primary font-semibold mt-2 group-hover:text-primary-500 transition-colors">

                                        {nextProject.title}

                                        <HiArrowRight />

                                    </div>

                                </Link>

                            )}

                        </div>

                    </div>

                </div>

            </section>

        </main>
    );
}


export default ProjectDetails;