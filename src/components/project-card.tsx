"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ExternalLink, Eye } from "lucide-react"

interface ProjectCardProps {
    title: string
    url: string
    screenshot: string
    index: number
}

export function ProjectCard({ title, url, screenshot, index }: ProjectCardProps) {
    return (
        <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-card border border-primary/10 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
            >
                {/* Image Container */}
                <div className="aspect-video w-full overflow-hidden bg-gradient-to-br from-muted to-muted/50 relative">
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
                    </div>
                    <Image
                        src={screenshot}
                        alt={title}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-110 relative z-20"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        unoptimized
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-30 flex items-center justify-center">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileHover={{ scale: 1 }}
                            className="flex gap-3"
                        >
                            <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-card text-primary rounded-full font-semibold text-sm shadow-lg">
                                <ExternalLink className="h-4 w-4" />
                                Visit Site
                            </span>
                        </motion.div>
                    </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300 truncate">
                                {title}
                            </h3>
                            <p className="mt-1.5 text-sm text-muted-foreground truncate">
                                {url.replace(/^https?:\/\//, '')}
                            </p>
                        </div>
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                            <Eye className="h-4 w-4 text-primary group-hover:text-white" />
                        </div>
                    </div>
                    
                    {/* Tech Tags */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        <span className="px-2.5 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                            Live Preview
                        </span>
                        <span className="px-2.5 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
                            Auto Screenshot
                        </span>
                    </div>
                </div>
                
                {/* Decorative gradient border on hover */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/30 transition-all duration-500 pointer-events-none" />
            </motion.div>
        </Link>
    )
}
