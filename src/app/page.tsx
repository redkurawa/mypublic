import { Hero } from "@/components/hero";
import { ProjectGrid } from "@/components/project-grid";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Home() {
  const projects = await db.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Serialize dates
  const serializedProjects = projects.map((p: any) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString()
  }));

  return (
    <div className="flex flex-col gap-10">
      <Hero />
      <ProjectGrid projects={serializedProjects} />
    </div>
  );
}
