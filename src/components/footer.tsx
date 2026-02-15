import Link from 'next/link';
import { MessageCircle, Mail, Heart } from 'lucide-react';
import { VisitorCounter } from '@/components/visitor-counter';

export function Footer() {
  const contactEmail = process.env.CONTACT_EMAIL || 'contact@example.com';
  const currentYear = new Date().getFullYear();

  // Obfuscate email untuk mencegah scraping
  const obfuscatedEmail = contactEmail
    .replace(/@/g, '&#64;')
    .replace(/\./g, '&#46;');

  // WhatsApp number - base64 encoded untuk obfuscation
  // "6281297879978" encoded = "NjI4MTI5Nzg3OTk3OA=="
  const whatsappEncoded = 'NjI4MTI5Nzg3OTk3OA==';

  return (
    <footer className='bg-background/50 backdrop-blur-sm'>
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center'>
          {/* Brand */}
          <div className='space-y-3'>
            <span className='text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent'>
              Portfolio
            </span>
            <p className='text-sm text-muted-foreground max-w-xs'>
              Building digital experiences that matter. Let&apos;s create
              something amazing together.
            </p>
          </div>

          {/* Quick Links */}
          <div className='space-y-3'>
            <h3 className='text-sm font-semibold'>Quick Links</h3>
            <nav className='flex flex-col gap-2'>
              <Link
                href='/'
                className='text-sm text-muted-foreground hover:text-foreground transition-colors'
              >
                Home
              </Link>
              <Link
                href='/#projects'
                className='text-sm text-muted-foreground hover:text-foreground transition-colors'
              >
                Projects
              </Link>
              <Link
                href='/contact'
                className='text-sm text-muted-foreground hover:text-foreground transition-colors'
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className='space-y-3'>
            <h3 className='text-sm font-semibold'>Get in Touch</h3>
            <div className='flex flex-col gap-2'>
              <a
                href={`https://wa.me/${atob(whatsappEncoded)}`}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-green-500 transition-colors'
              >
                <MessageCircle className='h-4 w-4 text-green-500' />
                Chat on WhatsApp
              </a>
              <a
                href={`mailto:${contactEmail}`}
                className='inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-red-500 transition-colors'
              >
                <Mail className='h-4 w-4 text-red-500' />
                <span dangerouslySetInnerHTML={{ __html: obfuscatedEmail }} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4'>
          <p className='text-xs text-muted-foreground'>
            &copy; {currentYear} Portfolio. All rights reserved.
          </p>
          <div className='flex items-center gap-4'>
            <VisitorCounter />
            <p className='text-xs text-muted-foreground inline-flex items-center gap-1'>
              Made with <Heart className='h-3 w-3 text-red-500 fill-red-500' />{' '}
              and passion
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
