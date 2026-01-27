import React from 'react';
import Layout from '@/components/Layout';
import FAQSection from '@/components/FAQSection';

export default function FAQPage() {
  return (
    <Layout>
      {/* SEO Optimization */}
      <head>
        <title>Q&A | 리니지 대리, 리니지 클래식 대리 자주 묻는 질문</title>
        <meta name="description" content="리니지 대리 서비스 이용에 관한 결제, 보안, 환불 등 자주 묻는 질문들을 모았습니다. 리니지 클래식 대리 상담 전 궁금한 사항을 확인하세요." />
        <meta name="keywords" content="리니지 대리 Q&A, 리니지 클래식 대리 질문, 리니지 대리 보안, 리니지 대리 환불" />
      </head>

      <div className="pt-20">
        <FAQSection />
      </div>
    </Layout>
  );
}
