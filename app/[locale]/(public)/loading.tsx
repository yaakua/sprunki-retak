import { Spinner } from '@nextui-org/spinner';
import { useTranslations } from 'next-intl';
export default function Loading() {
  const t = useTranslations('Loading');
  return (
<<<<<<< HEAD
    <div className="w-full h-screen flex flex-col items-center justify-center bg-black text-white">
      <Spinner color="primary"  labelColor="primary" label={t('title')} size="lg" />
=======
    <div className="w-full h-screen flex flex-col items-center justify-center bg-transparent">
      <Spinner color="success" label={t('title')} size="lg" />
>>>>>>> 64154bd8332dfec9371019d58869721702292fba
    </div>
  );
}
import { Spinner } from '@nextui-org/spinner';
import { useTranslations } from 'next-intl';
export default function Loading() {
  const t = useTranslations('Loading');
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-transparent">
      <Spinner color="success" label={t('title')} size="lg" />
    </div>
  );
}
