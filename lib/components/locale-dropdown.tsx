'use client';

import { getCurrentLocaleName, localeNames } from '@/lib/i18n/locales';
import { Link } from '@/lib/i18n/navigation';
import { Button } from '@/lib/ui/components/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/lib/ui/components/dropdown-menu';
import { cn } from '@/lib/utils/commons';
import { ChevronDown, ChevronRight, Languages } from 'lucide-react';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';

interface LocaleDropdownProps {
  type?: 'link' | 'button';
}

export function LocaleDropdown({ type = 'button' }: LocaleDropdownProps) {
  const pathname = usePathname();
  const locale = useLocale();
  // 从pathname中移除当前locale前缀
  const cleanPathname = pathname.replace(`/${locale}`, '/');
  const currentLocaleName = getCurrentLocaleName(locale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {type === 'button' ? (
          <Button 
            variant="ghost" 
            className="text-white hover:text-white hover:bg-[#2a4056]" 
            size="sm"
          >
            <Languages className="mr-2 h-4 w-4" />
            {currentLocaleName}
          </Button>
        ) : (
          <Button 
            variant="ghost" 
            className="w-full justify-start text-white hover:text-white hover:bg-[#2a4056]"
          >
            <Languages className="mr-2 h-4 w-4" />
            {currentLocaleName}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="start" 
        className="w-[400px] bg-[#1B2C41] p-4"
      >
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(localeNames).map(([key, name]) => (
            <DropdownMenuItem key={key} asChild>
              <Link
                className={cn(
                  'flex items-center gap-2 w-full rounded-md px-2 py-2 hover:bg-[#2a4056] cursor-pointer',
                  locale === key ? 'text-primary bg-[#2a4056]' : 'text-gray-300 hover:text-white'
                )}
                href={cleanPathname}
                locale={key==="en"?".":key}
              >
                <ChevronRight className="h-4 w-4" />
                {name}
              </Link>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 