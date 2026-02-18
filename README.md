# Portfolio Website

A modern portfolio website built with Next.js, Tailwind CSS, and Prisma. Features include project showcase, contact form with email integration, and admin dashboard for managing projects.

## Features

- 📱 **Responsive Design** - Mobile-first design using Tailwind CSS
- 🎨 **Dark/Light Mode** - Theme toggle with system preference detection
- 🌈 **Color Themes** - 6 beautiful color themes (Neutral, Slate, Orange, Lime, Sky, Fuchsia) with easy picker
- 📬 **Contact Form** - Email integration via Resend API
- 🔐 **Admin Dashboard** - Protected area for managing projects
- 🔄 **Project Reordering** - Drag-and-drop or manual order number editing to rearrange projects
- ✏️ **Edit Projects** - Update project titles and URLs directly in the admin dashboard
- 🗄️ **Database** - PostgreSQL via Neon (serverless)
- 🚀 **Fast Performance** - Built with Next.js 16 and Turbopack

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Database:** PostgreSQL (Neon) + Prisma ORM
- **Email:** Resend API
- **Icons:** Lucide React
- **Animations:** Framer Motion

## Prerequisites

Before deploying, you need:

1. **Node.js** v18+ installed
2. **Neon Account** - For PostgreSQL database (free tier available)
3. **Resend Account** - For email sending (free tier available)
4. **Vercel Account** - For deployment (free tier available)

## Local Development

### 1. Clone and Install

```bash
git clone <your-repo>
cd anti051
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://username:password@host.neon.tech/dbname?sslmode=require"

# Admin Authentication
ADMIN_PASSWORD="YourPasswordIsLove"

# Email (Resend)
RESEND_API_KEY="re_xxxxxxxxxxxxx"
CONTACT_EMAIL="your-email@example.com"
```

### 3. Database Setup

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Or run migrations (if you have existing data)
npx prisma migrate deploy
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

### Option 1: Deploy via GitHub (Recommended)

1. **Push your code to GitHub**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure the project:
     - Framework Preset: Next.js
     - Build Command: `next build`
     - Output Directory: `.next`

3. **Set Environment Variables**
   In Vercel project settings, add these environment variables:
   - `DATABASE_URL` - Your Neon PostgreSQL connection string
   - `ADMIN_PASSWORD` - Your admin password
   - `RESEND_API_KEY` - Your Resend API key
   - `CONTACT_EMAIL` - Your email address

4. **Deploy**
   - Click "Deploy" and wait for the build to complete
   - Your site will be live at `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

Follow the prompts to configure your project.

## Usage Guide

### Public Pages

- **Home (`/`)** - Main portfolio page with hero section and projects grid
- **Contact (`/contact`)** - Contact form and direct contact options

### Color Themes

The portfolio comes with 6 beautiful color themes inspired by shadcn/ui:

- **Neutral** - Clean gray
- **Slate** - Blue-gray
- **Orange** - Warm orange
- **Lime** - Fresh green
- **Sky** - Sky blue
- **Fuchsia** - Vibrant magenta

To change colors:

- **Desktop**: Click the color picker in the header next to the "Hire Me" button
- **Mobile**: Open the burger menu and find the color picker below the navigation links

Your color preference is saved and will persist across sessions.

### Admin Dashboard

1. Navigate to `/admin`
2. Login with your admin password
3. Add projects by entering a URL
4. Edit project details (title and URL) by clicking the pencil icon
5. Delete projects by clicking the delete button
6. Reorder projects by dragging or editing order numbers

### Adding Projects

1. Go to `/admin`
2. Enter a project URL in the input field
3. Click "Add Project"
4. The project will appear in the portfolio grid

### Reordering Projects

There are two ways to change the order of projects:

1. **Drag and Drop** - Click and drag the project card to a new position
2. **Manual Order Number** - Edit the order number directly in the input field for precise control

The order is saved automatically and reflected on the home page immediately.

## Security Features

- ✅ Email obfuscation using HTML entities
- ✅ WhatsApp number obfuscation using base64 encoding
- ✅ Admin routes protected by session cookies
- ✅ HttpOnly and Secure cookies for authentication
- ✅ Environment variables for all sensitive data

## Project Structure

```
anti051/
├── prisma/
│   └── schema.prisma       # Database schema
├── src/
│   ├── app/
│   │   ├── api/           # API routes
│   │   │   ├── auth/      # Authentication
│   │   │   ├── contact/   # Contact form
│   │   │   └── projects/  # Projects CRUD
│   │   ├── admin/         # Admin dashboard
│   │   ├── contact/       # Contact page
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Home page
│   ├── components/        # React components
│   └── lib/              # Utilities and DB client
├── public/               # Static assets
├── .env                  # Environment variables (local)
└── package.json
```

## Troubleshooting

### Build Errors

If you encounter build errors, try:

```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

### Database Connection Issues

- Ensure `DATABASE_URL` is correct
- Check that your Neon database is active
- Verify SSL is enabled in the connection string

### Email Not Working

- Check that `RESEND_API_KEY` is correct
- Verify `CONTACT_EMAIL` is set
- Check Resend dashboard for API errors

## License

MIT License - Feel free to use this project for your own portfolio!

## Support

For issues or questions, please create an issue in the GitHub repository.
