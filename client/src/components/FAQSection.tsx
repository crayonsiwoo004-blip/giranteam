import React, { useState } from 'react';
import { ChevronDown, HelpCircle, CreditCard, Lock, RotateCcw } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'payment' | 'account' | 'refund';
}

const faqData: FAQItem[] = [
  // 결제 카테고리
  {
    id: 'payment-1',
    category: 'payment',
    question: '결제 방법은 어떻게 되나요?',
    answer: '리니지대리는 카카오톡 오픈채팅을 통해 상담 후 결제를 진행합니다. 결제는 아이템매니아 또는 바로템을 통해서만 가능하며, 상품 결제 후 작업 종료 확인 후 인수하는 방식입니다.'
  },
  {
    id: 'payment-2',
    category: 'payment',
    question: '결제 수단은 무엇이 있나요?',
    answer: '아이템매니아와 바로템을 통한 결제만 가능합니다. 무통장, 카카오페이 등의 결제 방식은 제공하지 않습니다. 아이템매니아 또는 바로템에서 원하시는 패키지를 선택하여 결제하시면 됩니다.'
  },
  {
    id: 'payment-3',
    category: 'payment',
    question: '가격은 어떻게 책정되나요?',
    answer: '가격은 사냥터, 작업 시간, 목표 수치에 따라 세분화되어 책정됩니다. 예를 들어 같은 시간이라도 사냥터의 난이도나 목표 경험치에 따라 요금이 달라질 수 있습니다. 정확한 견적은 상담 시 알려주신 조건에 따라 계산해드립니다.'
  },
  {
    id: 'payment-4',
    category: 'payment',
    question: '추가 비용이 발생할 수 있나요?',
    answer: '계약 시 협의한 범위 내에서는 추가 비용이 발생하지 않습니다. 만약 작업 중 추가 요청사항이 생기거나 범위를 벗어나는 작업이 필요하면, 반드시 고객님의 동의를 받은 후 진행하며 추가 비용을 안내해드립니다.'
  },

  // 계정 카테고리
  {
    id: 'account-1',
    category: 'account',
    question: '계정 정보는 안전한가요?',
    answer: '네, 계정 보안은 저희의 최우선 사항입니다. 작업 기간 동안 이중 보안 인증을 설정하고, IP 접속 환경을 관리하며, 비밀번호는 변경하지 않습니다. 작업 완료 후에는 비밀번호 변경을 권장하며, 모든 과정이 기록되어 투명하게 관리됩니다.'
  },
  {
    id: 'account-2',
    category: 'account',
    question: '작업 중 계정에 접속할 수 있나요?',
    answer: '작업 기간 동안 고객님의 계정 접속은 권장하지 않습니다. 동시 접속 시 보안 문제가 발생할 수 있기 때문입니다. 긴급한 상황이 발생하면 카카오톡으로 즉시 연락주시면, 작업을 일시 중단하고 계정을 반환해드립니다.'
  },
  {
    id: 'account-3',
    category: 'account',
    question: '작업 현황은 어떻게 확인하나요?',
    answer: '카카오톡 오픈채팅으로 수시로 진행 상황을 보고받으실 수 있으며, 주요 구간에서는 캡처와 로그를 함께 제공해드립니다. 작업이 완료되면 상세한 작업 보고서를 함께 전달해드립니다.'
  },
  {
    id: 'account-4',
    category: 'account',
    question: '계정이 정지되면 어떻게 하나요?',
    answer: '저희는 게임 규칙을 철저히 준수하여 작업을 진행하기 때문에 정상적인 상황에서는 계정 정지가 발생하지 않습니다. 만약 예상치 못한 상황으로 계정이 정지되면, 즉시 고객님께 알려드리고 해결 방안을 협의합니다.'
  },

  // 환불 카테고리
  {
    id: 'refund-1',
    category: 'refund',
    question: '환불 규정은 어떻게 되나요?',
    answer: '작업 시작 전 취소 시 계약금 전액 환불해드립니다. 작업 시작 후에는 진행 상황에 따라 환불 비율이 달라집니다. 예를 들어 작업량의 50% 이상 진행된 경우 계약금의 50%를 환불하는 방식입니다. 정확한 환불 규정은 계약서에 명시되어 있습니다.'
  },
  {
    id: 'refund-2',
    category: 'refund',
    question: '환불은 언제 받을 수 있나요?',
    answer: '환불 신청 후 3~5 영업일 이내에 처리됩니다. 계약금을 입금하신 계좌로 환불해드리며, 계좌 정보 오류로 인한 환불 지연은 고객님 책임입니다. 환불 진행 상황은 카카오톡으로 수시로 안내해드립니다.'
  },
  {
    id: 'refund-3',
    category: 'refund',
    question: '부분 환불도 가능한가요?',
    answer: '네, 부분 환불이 가능합니다. 작업 중 고객님이 중단을 요청하시면 진행된 작업량을 기준으로 환불 비율을 계산해드립니다. 예를 들어 30%만 진행된 상태에서 중단하면 계약금의 70%를 환불해드립니다.'
  },
  {
    id: 'refund-4',
    category: 'refund',
    question: '환불 불가 사항이 있나요?',
    answer: '계약 완료 후 7일 이내의 환불 요청은 받지 않습니다. 또한 고객님의 계정 정보 오류로 인한 작업 실패나, 게임 점검으로 인한 작업 중단은 환불 사유가 아닙니다. 환불 불가 사항은 계약서에 상세히 명시되어 있습니다.'
  }
];

const categories = [
  { id: 'payment', label: '결제', icon: CreditCard },
  { id: 'account', label: '계정', icon: Lock },
  { id: 'refund', label: '환불', icon: RotateCcw }
];

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<'payment' | 'account' | 'refund'>('payment');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredFAQs = faqData.filter(item => item.category === activeCategory);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">자주 묻는 질문</h2>
          </div>
          <p className="text-muted-foreground text-lg">궁금하신 점을 카테고리별로 찾아보세요</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Category Tabs */}
          <div className="grid grid-cols-3 gap-4 mb-12">
            {categories.map(category => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id as 'payment' | 'account' | 'refund')}
                  className={`p-4 rounded-xl transition-all border-2 flex items-center justify-center gap-2 ${
                    isActive
                      ? 'bg-primary/20 border-primary text-white shadow-lg shadow-primary/20'
                      : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-bold">{category.label}</span>
                </button>
              );
            })}
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFAQs.map(item => (
              <div
                key={item.id}
                className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-colors"
              >
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="w-full px-6 py-4 flex items-start justify-between gap-4 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="flex-1 font-medium text-white leading-relaxed">{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${
                      expandedId === item.id ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Answer */}
                {expandedId === item.id && (
                  <div className="px-6 py-4 bg-black/30 border-t border-white/5 animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Still Have Questions */}
          <div className="mt-12 p-8 bg-gradient-to-r from-primary/20 to-cyan-500/20 border border-primary/30 rounded-2xl text-center">
            <h3 className="text-xl font-bold text-white mb-2">더 궁금한 점이 있으신가요?</h3>
            <p className="text-muted-foreground mb-6">
              위의 FAQ에서 찾지 못한 질문이 있다면 카카오톡 오픈채팅으로 언제든지 문의해주세요.
            </p>
            <a
              href="https://open.kakao.com/o/lineage_proxy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary hover:bg-primary/90 text-black font-bold px-8 py-3 rounded-full transition-all hover:shadow-lg shadow-primary/20"
            >
              카카오톡으로 문의하기
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
