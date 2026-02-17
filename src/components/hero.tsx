"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function Hero() {
    return (
        <section className="relative flex flex-col items-center justify-center space-y-10 py-24 text-center md:py-32 overflow-hidden min-h-[90vh] bg-gradient-to-b from-primary/[0.02] to-transparent">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-grid-pattern opacity-50" />
            
            {/* Floating Elements */}
            <motion.div
                className="absolute top-20 left-10 w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-xl"
                animate={{
                    y: [0, -30, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute bottom-32 right-20 w-32 h-32 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 blur-2xl"
                animate={{
                    y: [0, 20, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute top-40 right-10 w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400/20 to-orange-400/20 blur-lg"
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 180, 360],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Badge */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="px-4 relative z-10"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary whitespace-nowrap">
                    <Sparkles className="h-4 w-4 flex-shrink-0" />
                    <span className="whitespace-nowrap">Portfolio Management System</span>
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0"></span>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6 px-4 max-w-4xl"
            >
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                    Building Digital <br className="hidden sm:inline" />
                    <span className="bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
                        Experiences That Matter
                    </span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl leading-relaxed">
                    I craft high-performance websites and applications with a focus on premium aesthetics and user experience.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-8 sm:gap-12 px-4"
            >
                {/* Primary CTA - Same method as feature.html */}
                <div className="pulse-button-wrapper">
                    <Link
                        href="#projects"
                        className="pulse-button inline-flex h-14 items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent px-8 text-base font-semibold text-white transition-all"
                    >
                        Explore Projects
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
                
                <Link
                    href="/contact"
                    className="inline-flex h-14 items-center justify-center rounded-full border-2 border-primary/20 bg-background/80 backdrop-blur-sm px-8 text-base font-semibold text-primary transition-all hover:bg-primary hover:text-white hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                    Get in Touch
                </Link>
            </motion.div>

            {/* Stats Row */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap justify-center gap-8 md:gap-16 pt-8"
            >
                {[
                    { value: "∞", label: "Projects" },
                    { value: "100%", label: "Responsive" },
                    { value: "24/7", label: "Online" },
                ].map((stat, index) => (
                    <div key={index} className="text-center">
                        <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            {stat.value}
                        </div>
                        <div className="text-sm text-muted-foreground font-medium mt-1">{stat.label}</div>
                    </div>
                ))}
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-8"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center pt-2"
                >
                    <motion.div
                        animate={{ opacity: [1, 0], y: [0, 12] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1.5 h-1.5 rounded-full bg-primary"
                    />
                </motion.div>
            </motion.div>
        </section>
    )
}
