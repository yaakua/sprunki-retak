import { defaultLocale, locales } from '@/lib/i18n/locales';
import { getRequestConfig } from 'next-intl/server';

import English from '@/messages/en.json';
import Brazilian from '@/messages/pt-BR.json';
import French from '@/messages/fr.json';
import German from '@/messages/de.json';
import Italian from '@/messages/it.json';
import Japanese from '@/messages/ja.json';
import Korean from '@/messages/ko.json';
import Russian from '@/messages/ru.json';
import Spanish from '@/messages/es.json';
import Thai from '@/messages/th.json';
import Vietnamese from '@/messages/vi.json';
import Indonesian from '@/messages/id.json';
import Portuguese from '@/messages/pt.json';
import Turkish from '@/messages/tr.json';
import Ukrainian from '@/messages/uk.json';
import Bangla from '@/messages/bn.json';
import TraditionalChinese from '@/messages/zh-TW.json';
import Chinese from '@/messages/zh-CN.json';
const messagesMap = {
  'bn': Bangla,
  'en': English,
  'pt-BR': Brazilian,
  'fr': French,
  'de': German,
  'it': Italian,
  'ja': Japanese,
  'ko': Korean,
  'ru': Russian,
  'es': Spanish,
  'th': Thai,
  'vi': Vietnamese,
  'id': Indonesian,
  'pt': Portuguese,
  'tr': Turkish,
  'uk': Ukrainian,
  'zh-TW': TraditionalChinese,
  'zh-CN': Chinese,
};

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locales.includes(locale as any)) {
    locale = defaultLocale;
  }

  let messages = messagesMap[locale as keyof typeof messagesMap];
  if (!messages) {
    console.error(`无法加载 ${locale} 的翻译文件，将使用默认语言 ${defaultLocale}`);
    messages = messagesMap[defaultLocale];
  }

  return {
    onError(error: any) {
      console.error('加载国际化内容时出现异常：');
      console.error(error);
    },
    messages,
  };
});
