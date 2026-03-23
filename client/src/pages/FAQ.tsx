import { useEffect } from 'react';
import Layout from '@/components/Layout';
import FAQSection from '@/components/FAQSection';
import { updatePageMeta, PAGE_SEO } from '@/lib/seo';

export default function FAQPage() {
  useEffect(() => {
    updatePageMeta(PAGE_SEO.faq);
  }, []);

  return (
    <Layout>
      <div className="pt-20">
        <FAQSection />
      </div>
    </Layout>
  );
}
