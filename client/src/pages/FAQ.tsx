import { useEffect } from 'react';
import Layout from '@/components/Layout';
import FAQSection from '@/components/FAQSection';

export default function FAQPage() {
  useEffect(() => {
    document.title = 'Q&A | 리니지 대리, 리니지 클래식 대리 자주 묻는 질문';
  }, []);

  return (
    <Layout>
      <div className="pt-20">
        <FAQSection />
      </div>
    </Layout>
  );
}
