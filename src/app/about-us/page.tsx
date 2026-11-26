import { db } from '@/lib/store/local-db';
import { notFound } from 'next/navigation';

export default function AboutUsPage() {
  const page = db.getPageBySlug('about-us');
  if (!page) notFound();

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-12 space-y-6">
      <h1 className="text-3xl font-black tracking-tight text-foreground">{page.title}</h1>
      <p className="text-sm font-bengali text-neutral-400 -mt-3">{page.title_bn}</p>
      <div className="prose dark:prose-invert text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed space-y-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
        <p>{page.content}</p>
        <p className="font-bengali text-base">{page.content_bn}</p>
      </div>
    </div>
  );
}
