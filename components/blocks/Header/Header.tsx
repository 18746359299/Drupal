'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { ChevronDown, ChevronUp, Menu, X, Search } from 'lucide-react'
import { type ComponentPropsWithoutRef, useState, useEffect } from 'react'
import {
  type ImageProps,
  NavigationMenu,
  type NavigationMenuItemProps,
} from '@/components/primitives'
import { Button as MobileMenuButton } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const headerVariants = cva('w-full border-b border-border transition-all duration-300', {
  variants: {
    sticky: {
      true: 'sticky top-0 z-50 shadow-md backdrop-blur-md bg-white/95',
      false: 'bg-white',
    },
  },
  defaultVariants: {
    sticky: false,
  },
})

export interface HeaderProps
  extends ComponentPropsWithoutRef<'header'>,
    VariantProps<typeof headerVariants> {
  logo: ImageProps
  navItems: NavigationMenuItemProps[]
}

const MobileNavItem = ({ item }: { item: NavigationMenuItemProps }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <li className="w-full border-b border-gray-100 last:border-none">
      {item.children ? (
        <div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-foreground hover:bg-accent flex w-full items-center justify-between px-5 py-3 text-base font-medium transition-all duration-200"
          >
            {item.label}
            {isOpen ? (
              <ChevronUp className="size-4 ml-2 text-gray-400" />
            ) : (
              <ChevronDown className="size-4 ml-2 text-gray-400" />
            )}
          </button>
          {isOpen && (
            <ul className="border-border ml-4 border-l bg-gray-50">
              {item.children.map((child, index) => (
                <MobileNavItem key={index} item={child} />
              ))}
            </ul>
          )}
        </div>
      ) : (
        <a
          href={item.href ?? undefined}
          className="text-foreground hover:bg-accent block w-full px-5 py-3 text-base font-medium transition-colors duration-200"
        >
          {item.label}
        </a>
      )}
    </li>
  )
}

export const Header = ({
  className,
  sticky,
  logo,
  navItems,
  ...props
}: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={cn(
        headerVariants({ sticky }), 
        scrolled && sticky ? 'py-2' : 'py-4',
        className
      )} 
      {...props}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center">
          <a href="/" className="flex items-center transition-transform hover:scale-105">
            <img 
              src={logo.src} 
              alt={logo.alt} 
              className={cn(
                "object-contain", 
                scrolled && sticky 
                  ? "max-h-6 max-w-[140px]" 
                  : "max-h-8 max-w-[180px]"
              )} 
            />
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-6 md:flex">
          <NavigationMenu navItems={navItems} />
          <div className="flex items-center">
            <button className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors">
              <Search className="size-5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          <button className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900">
            <Search className="size-5" />
          </button>
          <MobileMenuButton
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-700 hover:bg-gray-100"
          >
            {mobileMenuOpen ? (
              <X className="size-6" />
            ) : (
              <Menu className="size-6" />
            )}
          </MobileMenuButton>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="absolute left-0 right-0 top-full z-40 max-h-[70vh] overflow-y-auto bg-white shadow-lg md:hidden">
          <nav className="flex w-full flex-col">
            <ul className="divide-y divide-gray-100 flex w-full flex-col">
              {navItems?.map((item, index) => (
                <MobileNavItem key={index} item={item} />
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}

Header.defaults = {
  logo: {
    src: '/app/static/placeholders/icons/drupal-decoupled.png',
    alt: 'Company Logo',
  },
  navItems: [
    { label: 'Link One', href: '#' },
    { label: 'Link Two', href: '#' },
    { label: 'Link Three', href: '#' },
    { label: 'Link Four', href: '#' }
  ],
} satisfies HeaderProps
