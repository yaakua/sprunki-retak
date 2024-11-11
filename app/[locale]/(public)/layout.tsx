import '@/app/globals.css';
import { defaultLocale } from '@/lib/i18n/locales';
import { NextUIProvider } from '@nextui-org/system';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { ReactNode } from 'react';

import { Footer, Navbar } from '@/lib/components';
import { siteConfig } from '@/lib/config/site';
import { NavbarItem } from '@/lib/types';
import { Toaster } from '@/lib/ui/components/toaster';
import { GoogleAnalytics } from '@next/third-parties/google';
import MicrosoftClarity from '@/lib/components/microsoft-clarity';
type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale = defaultLocale } = await params;
  const isDev = process.env.NODE_ENV === 'development';
  const messages = await getMessages();
  let navbars: NavbarItem[];
  try {
    navbars = (await import(`@/resources/navbar/${locale}.json`)).default;
  } catch {
    try{
      navbars = (await import(`@/resources/navbar/${locale.toLowerCase}.json`)).default;
    } catch {
      navbars = (await import(`@/resources/navbar/${defaultLocale}.json`)).default;
    }
  }

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <NextUIProvider>
        <Toaster />
        <Navbar items={navbars} />
        {children}
        <Footer items={navbars} />
        {!isDev && (
          <>
            {siteConfig.gaId && <GoogleAnalytics gaId={siteConfig.gaId as string} />}
            {siteConfig.plausible && <script defer data-domain={siteConfig.domain} src={siteConfig.plausible}></script>}
            {siteConfig.clarityId && <MicrosoftClarity clarityId={siteConfig.clarityId} />}
          </>
        )}
      </NextUIProvider>
    </NextIntlClientProvider>
  );
}
