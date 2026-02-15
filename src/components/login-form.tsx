"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export function LoginForm() {
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const res = await fetch("/api/auth", {
                method: "POST",
                body: JSON.stringify({ password }),
                headers: { "Content-Type": "application/json" }
            })

            if (res.ok) {
                router.refresh()
            } else {
                setError("Invalid password")
            }
        } catch (e) {
            setError("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex h-screen items-center justify-center bg-background">
            <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6 p-8 border rounded-lg shadow-lg bg-card text-card-foreground">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-bold">Admin Login</h1>
                    <p className="text-sm text-muted-foreground">Enter password to manage portfolio</p>
                </div>
                <div className="space-y-4">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    {error && <p className="text-destructive text-sm font-medium">{error}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </div>
            </form>
        </div>
    )
}
