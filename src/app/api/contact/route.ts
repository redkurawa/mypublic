import { Resend } from "resend"
import { NextRequest, NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
    try {
        const { name, email, subject, message } = await req.json()

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Name, email, and message are required." },
                { status: 400 }
            )
        }

        const { data, error } = await resend.emails.send({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: [process.env.CONTACT_EMAIL || "delivered@resend.dev"],
            subject: subject || `New message from ${name}`,
            replyTo: email,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">New Contact Form Submission</h2>
                    <hr style="border: 1px solid #eee;" />
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Subject:</strong> ${subject || "No subject"}</p>
                    <hr style="border: 1px solid #eee;" />
                    <h3 style="color: #555;">Message:</h3>
                    <p style="white-space: pre-wrap; color: #333;">${message}</p>
                </div>
            `,
        })

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ success: true, id: data?.id })
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message || "Something went wrong." },
            { status: 500 }
        )
    }
}
