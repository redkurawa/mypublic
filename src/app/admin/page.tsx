import { cookies } from 'next/headers';
import { AdminDashboard } from '@/components/admin-dashboard';
import { LoginForm } from '@/components/login-form';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');

  if (!session) {
    return (
      <div className='container mx-auto flex items-center justify-center min-h-screen'>
        <LoginForm />
      </div>
    );
  }

  const projects = await db.project.findMany({
    orderBy: { order: 'asc' },
  });

  // Serialize dates
  const serializedProjects = projects.map((p: any) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));

  return <AdminDashboard initialProjects={serializedProjects} />;
}
