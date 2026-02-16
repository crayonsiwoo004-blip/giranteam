import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Check, Zap, Clock, Award } from 'lucide-react';

interface ServicePackage {
  id: number;
  duration: string;
  hours: number;
  price: number;
  pricePerHour: number;
  popular: boolean;
  description: string;
  features: string[];
}

const servicePackages: ServicePackage[] = [
  {
    id: 1,
    duration: '단기 육성',
    hours: 10,
    price: 160000,
    pricePerHour: 16000,
    popular: false,
    description: '기란팀의 퀄리티를 경험하는 입문 패키지',
    features: ['실시간 진행 상황 보고', '기본 보안 설정', '카카오톡 상담']
  },
  {
    id: 2,
    duration: '실속 육성',
    hours: 33,
    price: 495000,
    pricePerHour: 15000,
    popular: true,
    description: '가장 인기 있는 중기 육성 패키지',
    features: ['실시간 진행 상황 보고', '이중 보안 인증', '카카오톡 상담', '작업 중간 보고서', '우선 기사 배정']
  },
  {
    id: 3,
    duration: '장기 육성',
    hours: 100,
    price: 1400000,
    pricePerHour: 14000,
    popular: false,
    description: '중장기 이용에 최적화된 패키지',
    features: ['실시간 진행 상황 보고', '이중 보안 인증', '24시간 모니터링', '상세 작업 보고서', '우선 기사 배정', '스펙업 가이드 제공']
  },
  {
    id: 4,
    duration: 'VIP 정기권',
    hours: 240,
    price: 3120000,
    pricePerHour: 13000,
    popular: false,
    description: '최고 대우의 전담 관리 정기권',
    features: ['실시간 진행 상황 보고', '이중 보안 인증', '24시간 모니터링', '상세 작업 보고서', '최고 등급 기사 배정 (전담)', '긴급 상황 대응', '사후 관리 지원', '1:1 스펙업 컨설팅']
  }
];

const serviceFeatures = [
  {
    icon: <Clock className="w-6 h-6" />,
    title: '24시간 운영',
    description: '언제든지 상담 가능하며, 작업은 24시간 진행됩니다.'
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: '빠른 시작',
    description: '계약 후 즉시 작업을 시작할 수 있습니다.'
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: '전문 기사',
    description: '리니지 경험이 풍부한 전문 기사가 담당합니다.'
  }
];

export default function ServicesPage() {
  const [selectedPackage, setSelectedPackage] = useState<number>(2);

  return (
    <Layout>
      {/* SEO Optimization */}
      <head>
        <title>리니지 학교 | 리니지 클래식 대리 이용요금 안내 및 전문 가이드</title>
        <meta name="description" content="리니지 학교(기란팀)의 리니지 클래식 대리 및 육성 서비스 이용요금을 안내합니다. 100% 수작업 보장, 24시간 라이브 방송, 사고 시 3배 보상 원칙으로 가장 안전한 대리 서비스를 제공합니다." />
        <meta name="keywords" content="리니지 대리 가격, 리니지 클래식 대리 비용, 리니지 육성 가격, 리니지 대리 서비스 안내, 리니지 학교, 기란팀 가격표, 리니지 클래식 부주 비용" />
      </head>

      {/* Structured Data for Services */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "Service",
          "serviceType": "리니지 게임 대리 서비스",
          "provider": {
            "@type": "LocalBusiness",
            "name": "리니지대리"
          },
          "offers": servicePackages.map(pkg => ({
            "@type": "Offer",
            "name": `리니지 대리 ${pkg.duration} 패키지`,
            "price": pkg.price,
            "priceCurrency": "KRW",
            "description": pkg.description
          }))
        })}
      </script>

      <div className="pt-20 pb-12">
        {/* Header */}
        <section className="py-16 bg-gradient-to-b from-primary/10 to-transparent border-b border-white/5">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">리니지 클래식 대리 서비스 안내</h1>
              <p className="text-muted-foreground text-lg">
                리니지 대리, 당신의 필요에 맞는 최적의 패키지를 선택하세요
              </p>
            </div>
          </div>
        </section>

        {/* Service Features */}
        <section className="py-16 bg-black/30 border-b border-white/5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {serviceFeatures.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Table */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-12 text-center">리니지 클래식 이용요금</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {servicePackages.map(pkg => (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg.id)}
                    className={`relative rounded-2xl border-2 transition-all cursor-pointer overflow-hidden ${
                      selectedPackage === pkg.id
                        ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                        : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                    }`}
                  >
                    {/* Popular Badge */}
                    {pkg.popular && (
                      <div className="absolute top-0 right-0 bg-primary text-black text-xs font-bold px-4 py-1 rounded-bl-lg">
                        인기
                      </div>
                    )}

                    <div className="p-8">
                      {/* Duration */}
                      <h3 className="text-2xl font-bold text-white mb-2">{pkg.duration}</h3>
                      <p className="text-muted-foreground text-sm mb-6">{pkg.description}</p>

                      {/* Price */}
                      <div className="mb-6">
                        <div className="text-4xl font-bold text-primary mb-1">
                          ₩{pkg.price.toLocaleString()}
                        </div>
                        <p className="text-muted-foreground text-sm">
                          시간당 ₩{pkg.pricePerHour.toLocaleString()}
                        </p>
                      </div>

                      {/* Features */}
                      <ul className="space-y-3 mb-8">
                        {pkg.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA Button */}
                      <button
                        onClick={() => window.open('https://itemmania.com', '_blank')}
                        className={`w-full block text-center py-3 px-4 rounded-lg font-bold transition-all cursor-pointer ${
                          selectedPackage === pkg.id
                            ? 'bg-primary text-black hover:bg-primary/90'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        아이템매니아에서 구매
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment Info */}
              <div className="bg-gradient-to-r from-primary/20 to-cyan-500/20 border border-primary/30 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-4">리니지 대리 결제 방식</h3>
                <div className="space-y-3 text-gray-300">
                  <p>
                    <span className="font-bold text-primary">✓ 아이템매니아</span>를 통한 결제만 가능합니다.
                  </p>
                  <p className="text-sm">
                    상품 결제 후 작업 종료 확인 후 인수하는 방식으로 진행됩니다.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    무통장, 카카오페이 등의 결제 방식은 제공하지 않습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-black/30 border-t border-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-12 text-center">리니지 클래식 대리 이용 절차</h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { step: 1, title: '상담', desc: '카카오톡으로 상담' },
                  { step: 2, title: '선택', desc: '패키지 선택' },
                  { step: 3, title: '결제', desc: '아이템매니아 결제' },
                  { step: 4, title: '작업', desc: '전문 기사 배정' }
                ].map((item, index) => (
                  <div key={index} className="relative">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                      <div className="w-10 h-10 bg-primary text-black font-bold rounded-full flex items-center justify-center mx-auto mb-4">
                        {item.step}
                      </div>
                      <h4 className="font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    {index < 3 && (
                      <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-primary/30"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center bg-gradient-to-r from-primary/20 to-cyan-500/20 border border-primary/30 rounded-2xl p-12">
              <h2 className="text-3xl font-bold text-white mb-4">지금 바로 리니지 대리 상담을 시작하세요</h2>
              <p className="text-muted-foreground mb-8">
                리니지대리와 함께 안전하고 신뢰할 수 있는 리니지 클래식 대리 서비스를 경험해보세요.
              </p>
              <button
                onClick={() => window.open('https://open.kakao.com/o/sxT1c2ci', '_blank')}
                className="inline-block bg-primary hover:bg-primary/90 text-black font-bold px-8 py-3 rounded-full transition-all hover:shadow-lg shadow-primary/20 cursor-pointer"
              >
                카카오톡으로 상담하기
              </button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
