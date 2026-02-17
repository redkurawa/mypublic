'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { mockFaq } from '@/constants/faq-data';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

const Faq = () => {
  return (
    <section id='faq' className='relative py-24 bg-gradient-to-b from-primary/[0.02] to-transparent'>
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      
      <div className='container mx-auto px-4 relative'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-12'
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-6">
            <HelpCircle className="h-4 w-4" />
            <span>Got Questions?</span>
          </div>
          <h2 className='text-4xl md:text-5xl font-bold tracking-tight mb-4'>
            Frequently Asked <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
            Everything you need to know about our portfolio platform.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion
            type='single'
            collapsible
            className='mx-auto max-w-3xl w-full space-y-4'
          >
            {mockFaq.map((item, index) => (
              <AccordionItem 
                key={item.id} 
                value={item.id}
                className="bg-card border border-primary/10 rounded-2xl px-6 data-[state=open]:shadow-lg data-[state=open]:border-primary/20 transition-all duration-300"
              >
                <AccordionTrigger className='text-left font-semibold text-foreground hover:text-primary py-5 hover:no-underline'>
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
                      {index + 1}
                    </span>
                    {item.q}
                  </div>
                </AccordionTrigger>
                <AccordionContent className='text-muted-foreground leading-relaxed pb-5 pl-11'>
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default Faq;
