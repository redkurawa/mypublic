"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

interface ProjectCardProps {
    title: string
    url: string
    screenshot: string
    index: number
}

export function ProjectCard({ title, url, screenshot, index }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow transition-all hover:shadow-lg hover:-translate-y-1"
        >
            <div className="aspect-video w-full overflow-hidden bg-muted relative">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20">
                    <span className="text-4xl font-bold">Loading...</span>
                </div>
                <Image
                    src={screenshot}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized // Temporary until next.config.ts is updated, or just kept for external non-optimized images if preferred
                />
            </div>
            <div className="p-6">
                <h3 className="text-lg font-semibold leading-none tracking-tight">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground truncate">
                    {url}
                </p>
                <div className="mt-4 flex items-center justify-between">
                    <Link
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                    >
                        Visit Website <ExternalLink className="ml-1 h-3 w-3" />
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}
