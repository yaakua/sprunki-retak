import { siteConfig } from '@/lib/config/site';
import { FAQsItem, PropsWithLocale } from '@/lib/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/lib/ui/components/accordion';
import { getTranslations } from 'next-intl/server';

export default async function FAQs({ locale }: PropsWithLocale) {
  if (!siteConfig.isShowFAQs) {
    return <></>;
  }
  const t = await getTranslations('HomeFAQs');
  try {
    let faqItems: FAQsItem[];
    try {
      faqItems = (await import(`@/resources/faqs/${locale}.json`)).default;
    } catch {
      try {
        faqItems = (await import(`@/resources/faqs/${locale.toLowerCase}.json`)).default;
      } catch {
        faqItems = (await import('@/resources/faqs/en.json')).default;
      }
    }
    return (
      <section className="w-full max-w-4xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">{t('title')}</h2>
        <Accordion type="single" collapsible className="space-y-4">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-none rounded-lg px-4 bg-gray-800">
              <AccordionTrigger className="py-4 font-medium">{item.question}</AccordionTrigger>
              <AccordionContent className="pb-4">
                <p className="text-gray-600">{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    );
  } catch (e) {
    console.error(e);
    return <></>;
  }
}
