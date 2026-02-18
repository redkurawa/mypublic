import Link from 'next/link';
import {
  MessageCircle,
  Mail,
  Heart,
  Sparkles,
  Github,
  Twitter,
  Linkedin,
} from 'lucide-react';
import { VisitorCounter } from '@/components/visitor-counter';

export function Footer() {
  const contactEmail = process.env.CONTACT_EMAIL || 'contact@example.com';
  const currentYear = new Date().getFullYear();

  const obfuscatedEmail = contactEmail
    .replace(/@/g, '&#64;')
    .replace(/\./g, '&#46;');

  const whatsappEncoded = 'NjI4MTI5Nzg3OTk3OA==';

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/#projects' },
    { label: 'Contact', href: '/contact' },
    { label: 'FAQ', href: '/#faq' },
  ];

  return (
    <footer className='relative bg-gradient-to-b from-transparent to-primary/[0.03] border-t border-primary/10'>
      <div className='absolute inset-0 bg-grid-pattern opacity-30' />

      <div className='container mx-auto px-4 py-16 relative'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
          {/* Brand */}
          <div className='space-y-4 lg:col-span-2'>
            <Link href='/' className='flex items-center gap-2 group'>
              <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg group-hover:shadow-primary/30 transition-shadow'>
                <Sparkles className='h-5 w-5 text-white' />
              </div>
              <span className='text-xl font-bold'>
                <span className='bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'>
                  Portfolio
                </span>
                <span className='text-foreground'>Pro</span>
              </span>
            </Link>
            <p className='text-muted-foreground max-w-sm leading-relaxed'>
              Building digital experiences that matter. Let&apos;s create
              something amazing together with modern technology and stunning
              design.
            </p>

            {/* Social Links */}
            <div className='flex gap-3 pt-2'>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className='w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300'
                  aria-label={social.label}
                >
                  <social.icon className='h-5 w-5' />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links & Get in Touch - Side by Side on Mobile */}
          <div className='col-span-1 md:col-span-2 lg:col-span-2'>
            <div className='grid grid-cols-2 gap-8'>
              <div className='space-y-4'>
                <h3 className='text-sm font-bold uppercase tracking-wider text-foreground'>
                  Quick Links
                </h3>
                <nav className='flex flex-col gap-3'>
                  {quickLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className='text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group'
                    >
                      <span className='w-1.5 h-1.5 rounded-full bg-primary/30 group-hover:bg-primary transition-colors' />
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className='space-y-4'>
                <h3 className='text-sm font-bold uppercase tracking-wider text-foreground'>
                  Get in Touch
                </h3>
                <div className='flex flex-col gap-4'>
                  <a
                    href={`https://wa.me/${atob(whatsappEncoded)}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center gap-3 text-muted-foreground hover:text-green-600 transition-all group'
                  >
                    <div className='w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center group-hover:bg-green-500 transition-colors'>
                      <MessageCircle className='h-5 w-5 text-green-600 group-hover:text-white' />
                    </div>
                    <span className='text-sm'>Chat on WhatsApp</span>
                  </a>
                  <a
                    href={`mailto:${contactEmail}`}
                    className='inline-flex items-center gap-3 text-muted-foreground hover:text-red-500 transition-all group'
                  >
                    <div className='w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center group-hover:bg-red-500 transition-colors'>
                      <Mail className='h-5 w-5 text-red-500 group-hover:text-white' />
                    </div>
                    <span
                      className='text-sm'
                      dangerouslySetInnerHTML={{ __html: obfuscatedEmail }}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='mt-12 pt-8 border-t border-primary/10 flex flex-col md:flex-row items-center justify-between gap-4'>
          <p className='text-sm text-muted-foreground'>
            &copy; {currentYear} PortfolioPro. All rights reserved.
          </p>
          <div className='flex items-center gap-6'>
            <VisitorCounter />
            <p className='text-sm text-muted-foreground inline-flex items-center gap-1.5'>
              Made with{' '}
              <Heart className='h-4 w-4 text-red-500 fill-red-500 animate-pulse' />{' '}
              and passion
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
