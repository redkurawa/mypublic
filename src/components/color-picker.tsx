'use client';

import { useState, useEffect } from 'react';

const colors = [
  { name: 'neutral', value: '#52525b', label: 'Neutral' },
  { name: 'slate', value: '#64748b', label: 'Slate' },
  { name: 'orange', value: '#f97316', label: 'Orange' },
  { name: 'lime', value: '#84cc16', label: 'Lime' },
  { name: 'sky', value: '#0ea5e9', label: 'Sky' },
  { name: 'fuchsia', value: '#d946ef', label: 'Fuchsia' },
];

export function ColorPicker() {
  const [activeTheme, setActiveTheme] = useState<string>('orange');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get theme from localStorage or set default
    const savedTheme = localStorage.getItem('color-theme') || 'orange';
    document.documentElement.setAttribute('data-theme', savedTheme);
    setActiveTheme(savedTheme);
  }, []);

  const handleThemeChange = (themeName: string) => {
    setActiveTheme(themeName);
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('color-theme', themeName);
  };

  if (!mounted) return null;

  return (
    <div className='flex items-center gap-1.5 p-1.5 rounded-lg bg-muted/50'>
      {colors.map((color) => (
        <button
          key={color.name}
          onClick={() => handleThemeChange(color.name)}
          title={color.label}
          className={`w-7 h-7 rounded-md cursor-pointer border-2 transition-all duration-200 hover:scale-110 ${
            activeTheme === color.name
              ? 'border-foreground shadow-[0_0_0_2px_white,0_0_0_4px_var(--primary)]'
              : 'border-transparent'
          }`}
          style={{ backgroundColor: color.value }}
        />
      ))}
    </div>
  );
}
