import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentPropsWithoutRef } from 'react'
import { type ImageProps, Link, type LinkProps } from '@/components/primitives'
import { cn } from '@/lib/utils'

const footerVariants = cva('w-full bg-gray-50 border-t border-gray-200', {
  variants: {},
  defaultVariants: {},
})

type FooterColumn = {
  title: string
  links: LinkProps[]
}

export interface FooterProps
  extends ComponentPropsWithoutRef<'footer'>,
    VariantProps<typeof footerVariants> {
  columns: FooterColumn[]
  logo: ImageProps
  copyrightText: string
}

const FooterColumn = ({ title, links }: FooterColumn) => (
  <div className="mb-4">
    {title && title.trim() !== "" && (
      <h5 className="text-base font-medium mb-3 text-gray-800">{title}</h5>
    )}
    <ul className="space-y-2">
      {links.map(
        (link, index) =>
          link && (
            <li key={index}>
              <Link 
                {...link} 
                className="text-sm text-gray-600 hover:text-primary hover:underline transition-colors"
              >
                {link.children}
              </Link>
            </li>
          )
      )}
    </ul>
  </div>
)

export const Footer = ({
  className,
  columns,
  logo,
  copyrightText,
  ...props
}: FooterProps) => {
  return (
    <footer className={cn(footerVariants(), className)} {...props}>
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row items-start justify-between mb-6">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <img 
              src={logo.src} 
              alt={logo.alt} 
              className="h-7 w-auto" 
            />
          </div>
          
          <div className="w-full md:w-2/3 grid grid-cols-2 gap-6">
            {columns.map((column, index) => (
              <FooterColumn key={index} {...column} />
            ))}
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <div className="text-xs text-gray-500">{copyrightText}</div>
        </div>
      </div>
    </footer>
  )
}

Footer.defaults = {
  columns: [
    {
      title: 'Column One',
      links: [
        { children: 'Link One', href: '#' },
        { children: 'Link Two', href: '#' },
        { children: 'Link Three', href: '#' },
        { children: 'Link Four', href: '#' },
        { children: 'Link Five', href: '#' },
      ],
    },
    {
      title: 'Column Two',
      links: [
        { children: 'Link Six', href: '#' },
        { children: 'Link Seven', href: '#' },
        { children: 'Link Eight', href: '#' },
        { children: 'Link Nine', href: '#' },
        { children: 'Link Ten', href: '#' },
      ],
    },
  ],
  logo: {
    src: '/app/static/placeholders/icons/doc-tahedroid.png',
    alt: 'Company Logo',
  },
  copyrightText: '© 2023 Drupal Decoupled. All rights reserved.',
} satisfies FooterProps
