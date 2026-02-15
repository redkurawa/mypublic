import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(req: Request) {
    const { password } = await req.json()

    if (password === process.env.ADMIN_PASSWORD) {
        const cookieStore = await cookies()
        cookieStore.set("admin_session", "true", { httpOnly: true, secure: process.env.NODE_ENV === "production" })
        return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: false }, { status: 401 })
}
