import { RichText } from '@/components/primitives'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Accordion as ShadcnAccordion,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

export interface AccordionProps {
  items: {
    title: string
    content: string
  }[]
  contentClassName?: string
}

export const Accordion = ({ items, contentClassName }: AccordionProps) => {
  return (
    <ShadcnAccordion type="multiple">
      {items.map(({ title, content }, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{title}</AccordionTrigger>
          <AccordionContent>
            <div className={cn(contentClassName)}>
              <RichText content={content} />
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </ShadcnAccordion>
  )
}
