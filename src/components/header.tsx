'use client';

import Link from 'next/link';
import { ModeToggle } from './mode-toggle';
import { ColorPicker } from './color-picker';
import { Sparkles, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className='sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-primary/10'>
      <div className='container mx-auto flex h-16 items-center justify-between px-4'>
        {/* Logo */}
        <Link href='/' className='flex items-center gap-2 group'>
          <div className='w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg group-hover:shadow-primary/30 transition-shadow'>
            <Sparkles className='h-5 w-5 text-white' />
          </div>
          <span className='text-xl font-bold tracking-tight'>
            <span className='bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'>
              Portfolio
            </span>
            <span className='text-foreground'>Pro</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center gap-8'>
          <Link
            href='/'
            className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary relative group'
          >
            Home
            <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all group-hover:w-full' />
          </Link>
          <Link
            href='/#projects'
            className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary relative group'
          >
            Projects
            <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all group-hover:w-full' />
          </Link>
          <Link
            href='/contact'
            className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary relative group'
          >
            Contact
            <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all group-hover:w-full' />
          </Link>
        </nav>

        {/* Right Side */}
        <div className='flex items-center gap-2'>
          <div className='hidden md:block'>
            <ColorPicker />
          </div>
          <ModeToggle />
          <Link
            href='/contact'
            className='hidden md:inline-flex h-10 items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent px-6 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:scale-105'
          >
            Hire Me
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className='md:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors'
          >
            {mobileMenuOpen ? (
              <X className='h-6 w-6 text-foreground' />
            ) : (
              <Menu className='h-6 w-6 text-foreground' />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className='md:hidden border-t border-primary/10 bg-background/95 backdrop-blur-xl'>
          <nav className='flex flex-col p-4 gap-2'>
            <Link
              href='/'
              onClick={() => setMobileMenuOpen(false)}
              className='px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all'
            >
              Home
            </Link>
            <Link
              href='/#projects'
              onClick={() => setMobileMenuOpen(false)}
              className='px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all'
            >
              Projects
            </Link>
            <Link
              href='/contact'
              onClick={() => setMobileMenuOpen(false)}
              className='px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all'
            >
              Contact
            </Link>

            {/* Color Picker - Mobile */}
            <div className='px-4 py-3'>
              <p className='text-xs text-muted-foreground mb-2'>Pilih Tema:</p>
              <ColorPicker />
            </div>

            <Link
              href='/contact'
              onClick={() => setMobileMenuOpen(false)}
              className='mt-2 inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent px-6 text-sm font-semibold text-white shadow-md'
            >
              Hire Me
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
