'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Trash2,
  Plus,
  ExternalLink,
  GripVertical,
  Save,
  X,
  Check,
  Loader2,
} from 'lucide-react';

interface Project {
  id: string;
  title: string | null;
  url: string;
  order: number;
  createdAt: string | Date;
}

export function AdminDashboard({
  initialProjects,
}: {
  initialProjects: Project[];
}) {
  const [url, setUrl] = useState('');
  const [projects, setProjects] = useState(initialProjects);
  const [loading, setLoading] = useState(false);
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [editOrderValue, setEditOrderValue] = useState<string>('');
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const router = useRouter();
  const dragNodeRef = useRef<HTMLTableRowElement | null>(null);

  const showSaveMessage = (message: string) => {
    setSaveMessage(message);
    setTimeout(() => setSaveMessage(null), 3000);
  };

  const addProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        body: JSON.stringify({ url }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        const newProject = await res.json();
        setProjects([...projects, newProject]);
        setUrl('');
        router.refresh();
        showSaveMessage('Project added successfully!');
      } else {
        console.error('Failed to add project');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await fetch(`/api/projects`, {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== id));
        router.refresh();
        showSaveMessage('Project deleted successfully!');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const updateProjectOrder = async (id: string, newOrder: number) => {
    try {
      const res = await fetch('/api/projects', {
        method: 'PUT',
        body: JSON.stringify({ id, order: newOrder }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (!res.ok) {
        console.error('Failed to update order:', data);
        return false;
      }
      return true;
    } catch (e) {
      console.error('Error updating order:', e);
      return false;
    }
  };

  const handleEditOrder = (project: Project) => {
    setEditingOrderId(project.id);
    setEditOrderValue(project.order.toString());
  };

  const handleCancelEdit = () => {
    setEditingOrderId(null);
    setEditOrderValue('');
  };

  const handleSaveOrder = async (project: Project) => {
    const newOrder = parseInt(editOrderValue, 10);
    if (isNaN(newOrder) || newOrder < 0) {
      setEditingOrderId(null);
      return;
    }

    setSaving(true);

    // Update the project order
    const success = await updateProjectOrder(project.id, newOrder);

    if (success) {
      // Reorder all projects
      const updatedProjects = projects.map((p) => {
        if (p.id === project.id) {
          return { ...p, order: newOrder };
        }
        return p;
      });

      // Sort by order
      updatedProjects.sort((a, b) => a.order - b.order);
      setProjects(updatedProjects);
      showSaveMessage('Order updated successfully!');
    }

    setEditingOrderId(null);
    setSaving(false);
    router.refresh();
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLTableRowElement>,
    index: number
  ) => {
    setDraggedIndex(index);
    dragNodeRef.current = e.currentTarget;
    e.currentTarget.style.opacity = '0.5';
  };

  const handleDragEnd = (e: React.DragEvent<HTMLTableRowElement>) => {
    e.currentTarget.style.opacity = '1';
    setDraggedIndex(null);
    setDragOverIndex(null);
    dragNodeRef.current = null;
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLTableRowElement>,
    index: number
  ) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = async (
    e: React.DragEvent<HTMLTableRowElement>,
    dropIndex: number
  ) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    setSaving(true);

    const newProjects = [...projects];
    const [draggedProject] = newProjects.splice(draggedIndex, 1);
    newProjects.splice(dropIndex, 0, draggedProject);

    // Update order values based on new positions
    const updatedProjects = newProjects.map((p, i) => ({
      ...p,
      order: i,
    }));

    // Update all projects to ensure correct order
    let allSuccess = true;
    for (const p of updatedProjects) {
      const success = await updateProjectOrder(p.id, p.order);
      if (!success) {
        allSuccess = false;
        console.error('Failed to update project:', p.id);
      }
    }

    if (allSuccess) {
      setProjects(updatedProjects);
      showSaveMessage('Order saved successfully!');
    } else {
      showSaveMessage('Failed to save some changes. Please try again.');
    }

    setDraggedIndex(null);
    setDragOverIndex(null);
    setSaving(false);
    router.refresh();
  };

  return (
    <div className='container mx-auto max-w-4xl py-10 space-y-8 px-4'>
      {/* Save Message Toast */}
      {saveMessage && (
        <div className='fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg flex items-center gap-2 z-50'>
          <Check className='h-4 w-4' />
          {saveMessage}
        </div>
      )}

      {/* Saving Indicator */}
      {saving && (
        <div className='fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow-lg flex items-center gap-2 z-50'>
          <Loader2 className='h-4 w-4 animate-spin' />
          Saving...
        </div>
      )}

      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Project Management</h1>
      </div>

      <form onSubmit={addProject} className='flex gap-4 items-end'>
        <div className='flex-1 space-y-2'>
          <label
            htmlFor='url'
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            Project URL
          </label>
          <input
            id='url'
            type='url'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder='https://example.com'
            required
            className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
          />
        </div>
        <button
          type='submit'
          disabled={loading}
          className='inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 min-w-[120px]'
        >
          {loading ? (
            'Adding...'
          ) : (
            <>
              <Plus className='mr-2 h-4 w-4' /> Add Project
            </>
          )}
        </button>
      </form>

      <div className='rounded-md border'>
        <div className='relative w-full overflow-auto'>
          <table className='w-full caption-bottom text-sm'>
            <thead className='[&_tr]:border-b'>
              <tr className='border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'>
                <th className='h-12 px-2 text-center align-middle font-medium text-muted-foreground w-10'></th>
                <th className='h-12 px-2 text-center align-middle font-medium text-muted-foreground w-20'>
                  No.
                </th>
                <th className='h-12 px-4 text-left align-middle font-medium text-muted-foreground'>
                  Title
                </th>
                <th className='h-12 px-4 text-left align-middle font-medium text-muted-foreground'>
                  URL
                </th>
                <th className='h-12 px-4 text-right align-middle font-medium text-muted-foreground'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='[&_tr:last-child]:border-0'>
              {projects.map((project, index) => (
                <tr
                  key={project.id}
                  ref={draggedIndex === index ? dragNodeRef : null}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, index)}
                  className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted cursor-move ${
                    dragOverIndex === index
                      ? 'border-t-2 border-t-primary bg-muted/30'
                      : ''
                  }`}
                >
                  <td className='p-2 align-middle text-center'>
                    <GripVertical className='h-4 w-4 text-muted-foreground' />
                  </td>
                  <td className='p-2 align-middle text-center'>
                    {editingOrderId === project.id ? (
                      <div className='flex items-center justify-center gap-1'>
                        <input
                          type='number'
                          value={editOrderValue}
                          onChange={(e) => setEditOrderValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleSaveOrder(project);
                            } else if (e.key === 'Escape') {
                              handleCancelEdit();
                            }
                          }}
                          className='w-14 h-8 text-center rounded border border-input bg-background px-1 text-sm'
                          autoFocus
                          disabled={saving}
                        />
                        <button
                          onClick={() => handleSaveOrder(project)}
                          disabled={saving}
                          className='inline-flex items-center justify-center rounded-md text-sm h-8 w-8 hover:bg-green-100 text-green-600 border border-green-300'
                          title='Save'
                        >
                          {saving ? (
                            <Loader2 className='h-3 w-3 animate-spin' />
                          ) : (
                            <Save className='h-3 w-3' />
                          )}
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          disabled={saving}
                          className='inline-flex items-center justify-center rounded-md text-sm h-8 w-8 hover:bg-red-100 text-red-600 border border-red-300'
                          title='Cancel'
                        >
                          <X className='h-3 w-3' />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEditOrder(project)}
                        className='w-8 h-8 rounded hover:bg-muted flex items-center justify-center text-sm font-medium'
                        title='Click to edit order number'
                      >
                        {index + 1}
                      </button>
                    )}
                  </td>
                  <td className='p-4 align-middle font-medium'>
                    {project.title || 'Untitled'}
                  </td>
                  <td className='p-4 align-middle text-muted-foreground truncate max-w-[200px]'>
                    <a
                      href={project.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='hover:underline inline-flex items-center'
                    >
                      {project.url} <ExternalLink className='ml-1 h-3 w-3' />
                    </a>
                  </td>
                  <td className='p-4 align-middle text-right'>
                    <button
                      onClick={() => deleteProject(project.id)}
                      className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-destructive hover:text-destructive-foreground h-9 w-9 border border-input bg-background shadow-sm hover:text-destructive-foreground'
                    >
                      <Trash2 className='h-4 w-4 text-destructive' />
                      <span className='sr-only'>Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className='p-8 text-center text-muted-foreground'
                  >
                    No projects yet. Add one above!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className='text-sm text-muted-foreground space-y-1'>
        <p>
          Tip: Drag and drop rows to reorder - changes are saved automatically.
        </p>
        <p>
          Or click the number to edit it directly, then press Save or Cancel.
        </p>
      </div>
    </div>
  );
}
