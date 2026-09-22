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
    HiExternalLink
} from 'react-icons/hi';

import exList from '../../Component/Experince/ExperinceList';


function ProjectDetails() {
    const { projectId } = useParams();


    const projectIndex = exList.findIndex(
        (item) => item.id === projectId
    );


    const project = exList[projectIndex];


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [projectId]);


    if (!project) {
        return (
            <main className="min-h-screen bg-theme-primary flex items-center justify-center px-4">

                <div className="text-center">

                    <h1 className="text-4xl font-bold text-theme-primary mb-4">
                        Project not found
                    </h1>

                    <Link
                        to="/"
                        className="btn-primary inline-flex items-center gap-2"
                    >

                        <HiArrowLeft />

                        Back Home

                    </Link>

                </div>

            </main>
        );
    }


    const previousProject =
        projectIndex > 0
            ? exList[projectIndex - 1]
            : null;


    const nextProject =
        projectIndex < exList.length - 1
            ? exList[projectIndex + 1]
            : null;


    return (
        <main className="min-h-screen bg-theme-primary">

            {/* Hero */}
            <section className="relative pt-20 sm:pt-28 pb-16 sm:pb-24 overflow-hidden">

                <div className="absolute inset-0">

                    <div className="absolute top-20 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>

                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl"></div>

                </div>


                <div className="container mx-auto px-4 relative z-10">

                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-theme-secondary hover:text-primary-500 transition-colors mb-10"
                    >

                        <HiArrowLeft />

                        Back to Portfolio

                    </Link>


                    <div className="max-w-4xl">

                        <span className="inline-flex px-4 py-2 rounded-full glass-light text-primary-500 text-sm font-medium mb-6">

                            Product Design Case Study

                        </span>


                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-theme-primary leading-tight mb-6">

                            {project.projectTitle}

                        </h1>


                        <p className="text-xl sm:text-2xl gradient-text font-semibold mb-8">

                            {project.company}

                        </p>


                        <p className="text-theme-secondary text-base sm:text-xl leading-relaxed max-w-3xl">

                            {project.description}

                        </p>

                    </div>


                    {/* Meta */}
                    <div className="grid sm:grid-cols-3 gap-4 mt-10 max-w-4xl">

                        <div className="glass rounded-xl p-4">

                            <div className="flex items-center gap-2 text-theme-muted text-xs mb-2">

                                <HiBriefcase />

                                Role

                            </div>

                            <p className="text-theme-primary font-medium">

                                {project.position}

                            </p>

                        </div>


                        <div className="glass rounded-xl p-4">

                            <div className="flex items-center gap-2 text-theme-muted text-xs mb-2">

                                <HiCalendar />

                                Duration

                            </div>

                            <p className="text-theme-primary font-medium">

                                {project.date}

                            </p>

                        </div>


                        <div className="glass rounded-xl p-4">

                            <div className="flex items-center gap-2 text-theme-muted text-xs mb-2">

                                <HiLocationMarker />

                                Location

                            </div>

                            <p className="text-theme-primary font-medium">

                                {project.location || 'Product Team'}

                            </p>

                        </div>

                    </div>


                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-8">

                        {project.skills.map((skill) => (

                            <span
                                key={skill}
                                className="px-3 py-1.5 rounded-lg glass text-theme-secondary text-xs sm:text-sm"
                            >

                                {skill}

                            </span>

                        ))}

                    </div>

                </div>

            </section>


            {/* Overview */}
            <section className="py-16 sm:py-24 bg-theme-secondary">

                <div className="container mx-auto px-4">

                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-20">

                        <div>

                            <span className="text-primary-500 text-sm font-semibold">
                                01 — Overview
                            </span>

                            <h2 className="text-3xl sm:text-4xl font-bold text-theme-primary mt-3">
                                The Product
                            </h2>

                        </div>


                        <p className="text-theme-secondary text-lg leading-relaxed">

                            {project.details.overview}

                        </p>

                    </div>

                </div>

            </section>


            {/* Challenge */}
            <section className="py-16 sm:py-24">

                <div className="container mx-auto px-4">

                    <div className="max-w-4xl">

                        <span className="text-primary-500 text-sm font-semibold">
                            02 — The Challenge
                        </span>

                        <h2 className="text-3xl sm:text-4xl font-bold text-theme-primary mt-3 mb-8">
                            Understanding the Problem
                        </h2>

                        <p className="text-theme-secondary text-lg sm:text-xl leading-relaxed">

                            {project.details.challenge}

                        </p>

                    </div>

                </div>

            </section>


            {/* Contributions */}
            <section className="py-16 sm:py-24 bg-theme-secondary">

                <div className="container mx-auto px-4">

                    <span className="text-primary-500 text-sm font-semibold">
                        03 — My Role
                    </span>

                    <h2 className="text-3xl sm:text-4xl font-bold text-theme-primary mt-3 mb-10">
                        What I Worked On
                    </h2>


                    <div className="grid md:grid-cols-2 gap-4">

                        {project.details.contributions.map(
                            (item, index) => (

                                <div
                                    key={item}
                                    className="glass rounded-xl p-5 flex gap-4"
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
                        04 — Process
                    </span>

                    <h2 className="text-3xl sm:text-4xl font-bold text-theme-primary mt-3 mb-12">
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

                                    <p className="text-theme-primary font-medium mt-5 leading-relaxed">

                                        {item}

                                    </p>

                                </div>

                            )
                        )}

                    </div>

                </div>

            </section>


            {/* Images */}
            <section className="py-16 sm:py-24 bg-theme-secondary">

                <div className="container mx-auto px-4">

                    <span className="text-primary-500 text-sm font-semibold">
                        05 — Selected Screens
                    </span>

                    <h2 className="text-3xl sm:text-4xl font-bold text-theme-primary mt-3 mb-10">
                        Product Screens & Explorations
                    </h2>


                    {project.images.length > 0 ? (

                        <div className="grid md:grid-cols-2 gap-6">

                            {project.images.map((image, index) => (

                                <div
                                    key={index}
                                    className="glass rounded-2xl overflow-hidden"
                                >

                                    <img
                                        src={image}
                                        alt={`${project.projectTitle} ${index + 1}`}
                                        className="w-full h-auto"
                                    />

                                </div>

                            ))}

                        </div>

                    ) : (

                        <div className="grid md:grid-cols-2 gap-6">

                            {[1, 2, 3, 4].map((item) => (

                                <div
                                    key={item}
                                    className="aspect-[16/10] glass rounded-2xl flex items-center justify-center"
                                >

                                    <div className="text-center">

                                        <p className="text-theme-primary font-medium mb-2">
                                            Project Image {item}
                                        </p>

                                        <p className="text-theme-muted text-sm">
                                            Project screen will be added here
                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </section>


            {/* Outcome */}
            <section className="py-16 sm:py-24">

                <div className="container mx-auto px-4">

                    <div className="max-w-4xl">

                        <span className="text-primary-500 text-sm font-semibold">
                            06 — Outcome
                        </span>

                        <h2 className="text-3xl sm:text-4xl font-bold text-theme-primary mt-3 mb-8">
                            Product Outcome
                        </h2>

                        <p className="text-theme-secondary text-lg sm:text-xl leading-relaxed">

                            {project.details.outcome}

                        </p>


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


            {/* Next / Previous */}
            <section className="py-12 sm:py-16 border-t border-black/10 dark:border-white/10">

                <div className="container mx-auto px-4">

                    <div className="flex items-center justify-between gap-4">

                        {previousProject ? (

                            <Link
                                to={`/projects/${previousProject.id}`}
                                className="group"
                            >

                                <span className="text-theme-muted text-xs">
                                    Previous
                                </span>

                                <div className="flex items-center gap-2 text-theme-primary font-semibold mt-1 group-hover:text-primary-500 transition-colors">

                                    <HiArrowLeft />

                                    {previousProject.company}

                                </div>

                            </Link>

                        ) : (
                            <div></div>
                        )}


                        {nextProject && (

                            <Link
                                to={`/projects/${nextProject.id}`}
                                className="text-right group"
                            >

                                <span className="text-theme-muted text-xs">
                                    Next
                                </span>

                                <div className="flex items-center gap-2 text-theme-primary font-semibold mt-1 group-hover:text-primary-500 transition-colors">

                                    {nextProject.company}

                                    <HiArrowRight />

                                </div>

                            </Link>

                        )}

                    </div>

                </div>

            </section>

        </main>
    );
}


export default ProjectDetails;