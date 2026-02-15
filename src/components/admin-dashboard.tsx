"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Trash2, Plus, ExternalLink } from "lucide-react"

interface Project {
    id: string
    title: string | null
    url: string
    createdAt: string | Date
}

export function AdminDashboard({ initialProjects }: { initialProjects: Project[] }) {
    const [url, setUrl] = useState("")
    const [projects, setProjects] = useState(initialProjects)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const addProject = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!url) return
        setLoading(true)

        try {
            const res = await fetch("/api/projects", {
                method: "POST",
                body: JSON.stringify({ url }),
                headers: { "Content-Type": "application/json" }
            })

            if (res.ok) {
                const newProject = await res.json()
                setProjects([newProject, ...projects])
                setUrl("")
                router.refresh()
            } else {
                console.error("Failed to add project")
            }
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    const deleteProject = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return
        try {
            const res = await fetch(`/api/projects`, {
                method: "DELETE",
                body: JSON.stringify({ id }),
                headers: { "Content-Type": "application/json" }
            })
            if (res.ok) {
                setProjects(projects.filter(p => p.id !== id))
                router.refresh()
            }
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className="container mx-auto max-w-4xl py-10 space-y-8 px-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Project Management</h1>
            </div>

            <form onSubmit={addProject} className="flex gap-4 items-end">
                <div className="flex-1 space-y-2">
                    <label htmlFor="url" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Project URL
                    </label>
                    <input
                        id="url"
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com"
                        required
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 min-w-[120px]"
                >
                    {loading ? "Adding..." : <><Plus className="mr-2 h-4 w-4" /> Add Project</>}
                </button>
            </form>

            <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Title</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">URL</th>
                                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {projects.map((project) => (
                                <tr key={project.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <td className="p-4 align-middle font-medium">{project.title || "Untitled"}</td>
                                    <td className="p-4 align-middle text-muted-foreground truncate max-w-[200px]">
                                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center">
                                            {project.url} <ExternalLink className="ml-1 h-3 w-3" />
                                        </a>
                                    </td>
                                    <td className="p-4 align-middle text-right">
                                        <button
                                            onClick={() => deleteProject(project.id)}
                                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-destructive hover:text-destructive-foreground h-9 w-9 border border-input bg-background shadow-sm hover:text-destructive-foreground"
                                        >
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                            <span className="sr-only">Delete</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {projects.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="p-8 text-center text-muted-foreground">No projects yet. Add one above!</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
