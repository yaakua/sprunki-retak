'use client';

import { LocaleDropdown } from '@/lib/components/locale-dropdown';
import { siteConfig } from '@/lib/config/site';
import { getPathname, Link } from '@/lib/i18n/navigation';
import { Button } from '@/lib/ui/components/button';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/lib/ui/components/sheet';
import { cn } from '@/lib/utils/commons';
import { Menu, ChevronDown, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react';
import { NavbarItem } from '../types';

interface NavItem {
  title: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

export default function AppNavbar({ items }: { items: NavbarItem[] }) {
  const nt = useTranslations('Navbar');
  const t = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [openItems, setOpenItems] = React.useState<string[]>([]);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  const toggleSubmenu = (title: string) => {
    setOpenItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-700 bg-[rgb(27,44,65)] shadow-lg shadow-black/20">
      <div className="container flex h-16 items-center px-4">
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="left" 
            className="w-[300px] sm:w-[400px] bg-[rgb(27,44,65)] border-gray-700 [&_button>svg]:text-white"
            onCloseAutoFocus={(e) => {
              e.preventDefault();
              setIsMenuOpen(false);
            }}
          >
            <SheetHeader>
              <SheetTitle className="text-white">{nt('title')}</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 py-4">
              {items.map((item) => (
                <div key={item.title}>
                  {item.children ? (
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleSubmenu(item.title);
                        }}
                        type="button"
                        className="flex items-center justify-between px-4 py-2 text-sm font-medium text-white hover:bg-[rgb(37,54,75)] hover:text-yellow-300 rounded-md transition-colors"
                      >
                        <span>{item.title}</span>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform duration-200",
                            openItems.includes(item.title) ? "rotate-180" : ""
                          )}
                        />
                      </button>
                      <div
                        className={cn(
                          "ml-4 flex flex-col gap-2 overflow-hidden transition-all duration-200",
                          openItems.includes(item.title) ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                        )}
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.title}
                            href={child.href}
                            target={child.href.startsWith('http') ? "_blank" : "_self"}
                            rel={child.href.startsWith('http') ? "noopener noreferrer" : undefined}
                            className={cn(
                              'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-white',
                              'hover:bg-[rgb(37,54,75)] hover:text-yellow-300 transition-all duration-200',
                              isActive(child.href) && 'bg-[rgb(37,54,75)] text-yellow-300'
                            )}
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsMenuOpen(false);
                            }}
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      target={item.href.startsWith('http') ? "_blank" : "_self"}
                      rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
                      className={cn(
                        'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-white',
                        'hover:bg-[rgb(37,54,75)] hover:text-yellow-300 transition-all duration-200',
                        isActive(item.href) && 'bg-[rgb(37,54,75)] text-yellow-300'
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}
              <div className="px-4 py-2">
                <LocaleDropdown type="link" />
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center space-x-2 group"
          >
            <Image
              src="/logo.svg"
              className="h-14 w-auto rounded-xl"
              alt={`${t('title')} logo`}
              width={20}
              height={20}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                console.error('Image load failed:', e);
              }}
            />
            <span className="inline-flex items-end text-lg font-leckerli bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent transition-all duration-300 truncate max-w-[150px] sm:max-w-none">
              {t(siteConfig.slogan as any)}
            </span>
          </Link>
        </div>

        <div className="hidden md:flex flex-1 justify-center">
          <NavigationMenu.Root className="relative">
            <NavigationMenu.List className="flex gap-2">
              {items.map((item) => (
                <NavigationMenu.Item key={item.title} className="relative">
                  {item.children ? (
                    <>
                      <NavigationMenu.Trigger 
                        className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-[rgb(37,54,75)] hover:text-yellow-300 transition-colors"
                      >
                        {item.title}
                        <ChevronDown
                          className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
                          aria-hidden="true"
                        />
                      </NavigationMenu.Trigger>
                      <NavigationMenu.Content className={cn(
                        "absolute top-full left-0 mt-2 w-48 origin-top-left rounded-md bg-[rgb(27,44,65)] p-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
                        "data-[motion=from-start]:animate-enterFromLeft",
                        "data-[motion=from-end]:animate-enterFromRight",
                        "data-[motion=to-start]:animate-exitToLeft",
                        "data-[motion=to-end]:animate-exitToRight",
                      )}>
                        {item.children.map((child) => (
                          <Link
                            key={child.title}
                            href={child.href}
                            target={child.href.startsWith('http') ? "_blank" : "_self"}
                            rel={child.href.startsWith('http') ? "noopener noreferrer" : undefined}
                            className={cn(
                              'block px-4 py-2 text-sm text-white rounded-md',
                              'hover:bg-[rgb(37,54,75)] hover:text-yellow-300 transition-all duration-200',
                              isActive(child.href) && 'bg-[rgb(37,54,75)] text-yellow-300'
                            )}
                          >
                            {child.title}
                          </Link>
                        ))}
                      </NavigationMenu.Content>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2",
                        "text-sm font-medium text-white transition-colors",
                        "hover:bg-[rgb(37,54,75)] hover:text-yellow-300",
                        isActive(item.href) && 'bg-[rgb(37,54,75)] text-yellow-300'
                      )}
                    >
                      {item.title}
                    </Link>
                  )}
                </NavigationMenu.Item>
              ))}
            </NavigationMenu.List>
          </NavigationMenu.Root>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="transform hover:scale-105 transition-transform duration-200">
            <LocaleDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}
