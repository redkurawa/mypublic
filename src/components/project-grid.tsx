'use client';

import { ProjectCard } from './project-card';
import { motion } from 'framer-motion';
import { FolderOpen, Plus } from 'lucide-react';
import Link from 'next/link';

interface Project {
  id: string;
  title: string | null;
  url: string;
  createdAt: string | Date;
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <section
        id='projects'
        className='relative py-24 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent'
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-50" />
        <div className='container mx-auto px-4 text-center relative'>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <FolderOpen className="h-10 w-10 text-primary" />
            </div>
            <h2 className='text-3xl font-bold tracking-tight sm:text-4xl mb-4'>
              No Projects Yet
            </h2>
            <p className='text-muted-foreground mb-8'>
              Start building your portfolio by adding your first project. It only takes a minute!
            </p>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Plus className="h-5 w-5" />
              Add First Project
            </Link>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id='projects' className='relative py-24 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent'>
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      <div className='container mx-auto px-4 relative'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='mb-16 text-center'
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-6">
            <FolderOpen className="h-4 w-4" />
            <span>Featured Work</span>
          </div>
          <h2 className='text-4xl md:text-5xl font-bold tracking-tight mb-4'>
            My <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className='mt-4 text-muted-foreground text-lg max-w-2xl mx-auto'>
            Explore my latest work and see how I bring ideas to life through code and design.
          </p>
        </motion.div>
        
        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              title={project.title || 'Untitled Project'}
              url={project.url}
              screenshot={`https://s.wordpress.com/mshots/v1/${encodeURIComponent(project.url)}?w=1280&h=720`}
              index={index}
            />
          ))}
        </div>
        
        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Want to see more of my work?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary/20 text-primary rounded-full font-semibold hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
          >
            Let&apos;s Collaborate
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
