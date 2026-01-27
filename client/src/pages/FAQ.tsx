import React from 'react';
import Layout from '@/components/Layout';
import FAQSection from '@/components/FAQSection';

export default function FAQPage() {
  return (
    <Layout>
      <div className="pt-20">
        <FAQSection />
      </div>
    </Layout>
  );
}
