'use client';

import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Track visit on page load
    const trackVisit = async () => {
      try {
        // First get current count
        const getResponse = await fetch('/api/visitor');
        const getData = await getResponse.json();
        setCount(getData.count);

        // Then increment
        await fetch('/api/visitor', { method: 'POST' });
      } catch (error) {
        console.error('Failed to track visitor:', error);
      } finally {
        setIsLoading(false);
      }
    };

    trackVisit();
  }, []);

  if (isLoading) {
    return (
      <div className='flex items-center gap-1 text-xs text-muted-foreground'>
        <Eye className='h-3 w-3' />
        <span>...</span>
      </div>
    );
  }

  return (
    <div className='flex items-center gap-1 text-xs text-muted-foreground'>
      <Eye className='h-3 w-3' />
      <span>{count?.toLocaleString() || 0} visitors</span>
    </div>
  );
}
