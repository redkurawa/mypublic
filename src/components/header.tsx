import Link from "next/link"
import { ModeToggle } from "./mode-toggle"

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                        Portfolio
                    </span>
                </Link>
                <nav className="flex items-center gap-6">
                    <Link
                        href="/"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Home
                    </Link>
                    <div className="flex items-center gap-4">
                        <ModeToggle />
                        <Link
                            href="/contact"
                            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                        >
                            Hire Me
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}
