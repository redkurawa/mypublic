import { ContactForm } from '@/components/contact-form';
import { ArrowLeft, MessageCircle, Mail, Clock } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const contactEmail = process.env.CONTACT_EMAIL || 'contact@example.com';

  // Obfuscate email untuk mencegah scraping
  const obfuscatedEmail = contactEmail
    .replace(/@/g, '&#64;')
    .replace(/\./g, '&#46;');

  // WhatsApp number - base64 encoded
  const whatsappEncoded = 'NjI4MTI5Nzg3OTk3OA==';

  return (
    <div className='container mx-auto px-4 py-16 md:py-24'>
      <div className='mb-8'>
        <Link
          href='/'
          className='inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors'
        >
          <ArrowLeft className='mr-2 h-4 w-4' />
          Back to Home
        </Link>
      </div>
      <div className='text-center mb-12'>
        <h1 className='text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl'>
          Let&apos;s Work{' '}
          <span className='bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent'>
            Together
          </span>
        </h1>
        <p className='mt-4 text-muted-foreground md:text-lg max-w-xl mx-auto'>
          I&apos;m always open to discussing new projects, creative ideas, or
          opportunities to be part of your vision.
        </p>
      </div>

      {/* Quick Contact Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-12'>
        <a
          href={`https://wa.me/${atob(whatsappEncoded)}`}
          target='_blank'
          rel='noopener noreferrer'
          className='group flex flex-col items-center gap-3 rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 hover:border-green-500/50'
        >
          <div className='flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10 group-hover:bg-green-500/20 transition-colors'>
            <MessageCircle className='h-6 w-6 text-green-500' />
          </div>
          <div className='text-center'>
            <p className='text-sm font-semibold'>WhatsApp</p>
            <p className='text-xs text-muted-foreground mt-1'>Chat Only</p>
          </div>
        </a>

        <a
          href={`mailto:${contactEmail}`}
          className='group flex flex-col items-center gap-3 rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 hover:border-red-500/50'
        >
          <div className='flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 group-hover:bg-red-500/20 transition-colors'>
            <Mail className='h-6 w-6 text-red-500' />
          </div>
          <div className='text-center'>
            <p className='text-sm font-semibold'>Email</p>
            <p className='text-xs text-muted-foreground mt-1 truncate max-w-[150px]'>
              <span dangerouslySetInnerHTML={{ __html: obfuscatedEmail }} />
            </p>
          </div>
        </a>

        <div className='flex flex-col items-center gap-3 rounded-xl border bg-card p-6 shadow-sm'>
          <div className='flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10'>
            <Clock className='h-6 w-6 text-orange-500' />
          </div>
          <div className='text-center'>
            <p className='text-sm font-semibold'>Response Time</p>
            <p className='text-xs text-muted-foreground mt-1'>
              Within 24 hours
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className='flex items-center gap-4 max-w-2xl mx-auto mb-12'>
        <div className='h-px flex-1 bg-border' />
        <span className='text-sm text-muted-foreground'>or send a message</span>
        <div className='h-px flex-1 bg-border' />
      </div>

      <ContactForm />
    </div>
  );
}
