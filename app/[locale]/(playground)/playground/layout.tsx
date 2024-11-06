import '@/app/globals.css';
import { NextUIProvider } from '@nextui-org/system';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { type ReactNode } from 'react';

import { siteConfig } from '@/lib/config/site';
import { defaultLocale } from '@/lib/i18n/locales';
import { Toaster } from '@/lib/ui/components/toaster';
import { GoogleAnalytics } from '@next/third-parties/google';
type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale = defaultLocale } = await params;
  const isDev = process.env.NODE_ENV === 'development';
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <NextUIProvider>
        <Toaster />
        {children}
        {!isDev && (
          <>
            <GoogleAnalytics gaId={siteConfig.gaId as string} />
            <script defer data-domain={siteConfig.domain} src="https://app.pageview.app/js/script.js"></script>
          </>
        )}
      </NextUIProvider>
    </NextIntlClientProvider>
  );
}
