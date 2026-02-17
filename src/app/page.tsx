import { Hero } from '@/components/hero';
import { ProjectGrid } from '@/components/project-grid';
import Faq from '@/components/faq';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

interface Project {
  id: string;
  title: string | null;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  order: number;
}

export default async function Home() {
  const projects = await db.project.findMany({
    orderBy: { order: 'asc' },
  });

  // Serialize dates
  const serializedProjects = projects.map((p: Project) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));

  return (
    <div className='flex flex-col'>
      <Hero />
      <ProjectGrid projects={serializedProjects} />
      <Faq />
    </div>
  );
}
