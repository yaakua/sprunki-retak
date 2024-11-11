'use client';

import { LocaleDropdown } from '@/lib/components/locale-dropdown';
import { siteConfig } from '@/lib/config/site';
import { getPathname, Link } from '@/lib/i18n/navigation';
import { Button } from '@/lib/ui/components/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/lib/ui/components/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/lib/ui/components/sheet';
import { cn } from '@/lib/utils/commons';
import { Menu } from 'lucide-react';
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
  const pathname = usePathname();
  const locale = useLocale();

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-700 bg-[rgb(27,44,65)] shadow-lg shadow-black/20 transition-all duration-300 ease-in-out">
      <div className="container flex h-16 items-center px-4">
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>{nt('title')}</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 py-4">
              {items
                .flatMap((item: NavItem) => (item.children ? item.children : [item]))
                .map((item, index) => (
                  <Link
                    key={`${item.title}-${index}`}
                    href={`/${getPathname({ href: item.href, locale })}`}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md hover:bg-accent',
                      isActive(item.href) && 'bg-accent',
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
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
            className="flex items-center space-x-2 group "
          >
            <Image
              src="/logo.svg"
              className="h-14 w-auto rounded-xl "
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
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              {items.map((item: NavItem) => (
                <NavigationMenuItem key={item.title} className="group border-none">
                  {item.children ? (
                    <>
                      <NavigationMenuTrigger className="text-white bg-transparent hover:bg-[rgb(37,54,75)] data-[state=open]:bg-[rgb(37,54,75)] transition-all duration-200">
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="bg-[rgb(27,44,65)]">
                        <ul className="grid w-[200px] p-2 md:w-[400px] gap-2">
                          {item.children.map((child) => (
                            <li key={child.title}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={child.href}
                                  className={cn(
                                    'flex h-full w-full select-none text-white flex-col justify-end rounded-md p-4 no-underline outline-none transition-all duration-200',
                                    'hover:bg-[rgb(37,54,75)] hover:translate-x-1',
                                    isActive(child.href) ? 'bg-[rgb(37,54,75)]' : 'bg-transparent',
                                  )}
                                >
                                  <div className="flex items-center gap-2">
                                    <div className="text-sm font-medium leading-none">{child.title}</div>
                                  </div>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        'bg-transparent hover:bg-[rgb(37,54,75)] transition-all duration-200',
                        'relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary-400 after:transition-all after:duration-300 hover:after:w-full',
                        isActive(item.href) && 'after:w-full',
                      )}
                    >
                      <div className="flex items-center gap-2 text-white">{item.title}</div>
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
           
          </NavigationMenu>
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
