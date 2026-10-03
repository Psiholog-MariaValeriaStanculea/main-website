import { useEffect, useState } from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
export function FAQList({ items }: { items: { question: string; answer: string }[] }) {
  const [enhanced, setEnhanced] = useState(false);
  const [expanded, setExpanded] = useState<string[]>([]);
  useEffect(() => setEnhanced(true), []);
  return <Accordion type="multiple" value={enhanced ? expanded : items.map((_, index) => `question-${index}`)} onValueChange={setExpanded} className="faq-list" data-enhanced={enhanced}>
    {items.map((item, index) => <AccordionItem key={index} value={`question-${index}`}>
      <AccordionTrigger className="min-h-12 py-5 text-left font-heading text-xl font-medium gap-5">{item.question}</AccordionTrigger>
      <AccordionContent forceMount className="pb-5"><p>{item.answer}</p></AccordionContent>
    </AccordionItem>)}
  </Accordion>;
}
