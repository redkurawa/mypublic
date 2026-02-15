"use client"

import { ProjectCard } from "./project-card"
import { motion } from "framer-motion"

interface Project {
    id: string
    title: string | null
    url: string
    createdAt: string | Date
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
    if (projects.length === 0) {
        return (
            <section id="projects" className="container mx-auto px-4 py-16 text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured Projects</h2>
                <p className="mt-4 text-muted-foreground">No projects added yet.</p>
            </section>
        )
    }

    return (
        <section id="projects" className="container mx-auto px-4 py-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-10 text-center"
            >
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured Projects</h2>
                <p className="mt-4 text-muted-foreground">Check out some of my recent work.</p>
            </motion.div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, index) => (
                    <ProjectCard
                        key={project.id}
                        title={project.title || "Untitled Project"}
                        url={project.url}
                        screenshot={`https://s.wordpress.com/mshots/v1/${encodeURIComponent(project.url)}?w=1280&h=720`}
                        index={index}
                    />
                ))}
            </div>
        </section>
    )
}
