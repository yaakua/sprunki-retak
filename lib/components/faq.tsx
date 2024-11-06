"use client"
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { FAQItem } from '../types';

type FAQProps = {
    items: FAQItem[]
    className?: string
}

const FAQ: FC<FAQProps> = ({className, items}) => {
    const t = useTranslations("FAQs")
    return (
        <section className={cn("my-10 px-4 max-w-screen-xl mx-auto", className)}>
            <h2 className="text-3xl font-semibold mb-8 text-center">
                {t("title")}
            </h2>
            <div className="space-y-6">
                {items.map((item, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4">
                        <h3 className="text-lg font-semibold mb-2">
                            {`${index < 9 ? '0' : ''}${index + 1}. ${item.question}`}
                        </h3>
                        <p className="text-gray-600">{item.answer}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

FAQ.displayName = "FAQ"
export default FAQ