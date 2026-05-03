import React, { useState, useEffect, useRef } from 'react';
import Layout from '@/components/Layout';
import { updatePageMeta, PAGE_SEO } from '@/lib/seo';
import { Check, Zap, Clock, Award, Star, Shield, MessageCircle, CalendarDays } from 'lucide-react';

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

interface ServicePackage {
  id: number;
  tier: string;
  label: string;
  hours: number | null;
  price: number;
  pricePerHour: number;
  billingType: 'single' | 'monthly';
  description: string;
  features: string[];
  badge?: string;
}

const servicePackages: ServicePackage[] = [
  {
    id: 1,
    tier: 'STANDARD',
    label: '120시간 이용권',
    hours: 120,
    price: 1560000,
    pricePerHour: 13000,
    billingType: 'single',
    description: '120시간 분량의 단건 이용권. 원하는 시기에 자유롭게 사용하세요.',
    features: [
      '실시간 진행 상황 보고',
      '이중 보안 인증',
      '24시간 모니터링',
      '상세 작업 보고서',
      '최고 등급 기사 전담 배정',
      '긴급 상황 대응',
      '사후 관리 지원',
      '1:1 스펙업 컨설팅',
    ],
  },
  {
    id: 2,
    tier: 'MONTHLY',
    label: '월 정기 구독',
    hours: null,
    price: 12000,
    pricePerHour: 12000,
    billingType: 'monthly',
    description: '매월 정기 결제로 더 저렴하게. 1시간당 1,000원 절약되는 구독 플랜.',
    badge: '추천',
    features: [
      '실시간 진행 상황 보고',
      '이중 보안 인증',
      '24시간 모니터링',
      '상세 작업 보고서',
      '최고 등급 기사 전담 배정',
      '긴급 상황 대응',
      '사후 관리 지원',
      '1:1 스펙업 컨설팅',
    ],
  },
];

const serviceFeatures = [
  { icon: <Clock className="w-5 h-5" />, title: '24시간 운영', description: '언제든지 상담 가능하며, 작업은 24시간 진행됩니다.' },
  { icon: <Zap className="w-5 h-5" />, title: '빠른 시작', description: '계약 후 즉시 작업을 시작할 수 있습니다.' },
  { icon: <Award className="w-5 h-5" />, title: '전문 기사', description: '리니지 경험이 풍부한 전문 기사가 담당합니다.' },
];

export default function ServicesPage() {
  const [selectedPackage, setSelectedPackage] = useState<number>(2);

  const header = useInView(0.05);
  const features = useInView();
  const pricing = useInView();
  const process = useInView();
  const payment = useInView();
  const cta = useInView();

  useEffect(() => {
    updatePageMeta(PAGE_SEO.services);
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      "@context": "https://schema.org/",
      "@type": "Service",
      "serviceType": "리니지 게임 대리 서비스",
      "provider": { "@type": "LocalBusiness", "name": "리니지대리" },
      "offers": servicePackages.map(pkg => ({
        "@type": "Offer",
              "name": `리니지 대리 ${pkg.label}`,
              "billingType": pkg.billingType,
        "price": pkg.price,
        "priceCurrency": "KRW",
        "description": pkg.description,
      })),
    });
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  return (
    <Layout>
      <div className="bg-[#06060E] min-h-screen">

        {/* ── Header ── */}
        <section className="pt-36 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_top,rgba(212,175,55,0.06)_0%,transparent_60%)]" />
          <div
            ref={header.ref}
            className="container mx-auto px-4 text-center relative z-10"
          >
            <div className={`transition-all duration-700 ${header.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="section-label mb-6 inline-flex">Service</span>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                리니지 클래식 대리<br />
                <span className="text-gold-gradient">서비스 안내</span>
              </h1>
              <div className="luxury-divider my-6" />
              <p className="text-white/40 text-base font-light max-w-lg mx-auto">
                단건 이용권과 월 정기 구독 중 원하는 방식을 선택하세요
              </p>
            </div>
          </div>
        </section>

        {/* ── Service Features ── */}
        <section className="py-16 border-y border-amber-500/8">
          <div
            ref={features.ref}
            className="container mx-auto px-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {serviceFeatures.map((feature, index) => (
                <div
                  key={index}
                  className={`text-center transition-all duration-700 ${features.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 border border-amber-500/20 bg-amber-500/5 rounded-xl flex items-center justify-center mx-auto mb-4 text-amber-400">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-white/80 mb-2 text-sm tracking-wide">{feature.title}</h3>
                  <p className="text-white/35 text-xs leading-relaxed font-light">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing Table ── */}
        <section className="py-24">
          <div
            ref={pricing.ref}
            className="container mx-auto px-4"
          >
            <div className={`text-center mb-14 transition-all duration-700 ${pricing.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="section-label mb-6 inline-flex">Pricing</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">리니지 클래식 이용요금</h2>
              <div className="luxury-divider" />
              <p className="text-white/30 text-sm mt-6 font-light">두 플랜 모두 동일한 서비스를 제공합니다</p>
            </div>

            {/* 가격 비교 배너 */}
            <div className={`max-w-2xl mx-auto mb-10 transition-all duration-700 ${pricing.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '0.1s' }}>
              <div className="luxury-card rounded-2xl p-5 flex items-center justify-center gap-8 md:gap-16">
                <div className="text-center">
                  <p className="text-white/25 text-[10px] tracking-widest uppercase mb-1">단건 이용권</p>
                  <p className="text-white/70 font-bold text-lg">시간당 <span className="text-white/90">₩13,000</span></p>
                </div>
                <div className="h-10 w-px bg-white/8" />
                <div className="text-center">
                  <p className="text-amber-400/60 text-[10px] tracking-widest uppercase mb-1">월 정기 구독</p>
                  <p className="text-amber-400 font-bold text-lg">시간당 <span className="text-gold-gradient">₩12,000</span></p>
                  <p className="text-green-400/60 text-[10px] mt-0.5">시간당 ₩1,000 절약</p>
                </div>
              </div>
            </div>

            {/* 카드 2개 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {servicePackages.map((pkg, i) => {
                const isSelected = selectedPackage === pkg.id;
                const isMonthly = pkg.billingType === 'monthly';
                return (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg.id)}
                    className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
                      pricing.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    } ${
                      isSelected
                        ? 'border border-amber-500/50 shadow-[0_0_50px_rgba(212,175,55,0.12)]'
                        : 'border border-white/6 hover:border-amber-500/20'
                    }`}
                    style={{
                      background: isSelected
                        ? 'linear-gradient(160deg, rgba(26,22,10,0.95) 0%, rgba(18,16,8,0.98) 100%)'
                        : 'linear-gradient(160deg, rgba(18,18,28,0.9) 0%, rgba(12,12,20,0.95) 100%)',
                      transitionDelay: `${i * 0.1}s`,
                    }}
                  >
                    {pkg.badge && (
                      <div className="absolute top-0 right-0 bg-amber-500 text-black text-[10px] font-black px-3 py-1 rounded-bl-xl tracking-widest uppercase">
                        {pkg.badge}
                      </div>
                    )}
                    <div className="p-8">
                      {/* Icon + Tier */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-amber-500/15 text-amber-400' : 'bg-white/5 text-white/30'}`}>
                          {isMonthly ? <CalendarDays className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                        </div>
                        <div>
                          <div className="text-amber-500/50 text-[10px] font-black tracking-[0.25em] uppercase">{pkg.tier}</div>
                          <h3 className="text-white font-bold text-lg leading-tight">{pkg.label}</h3>
                        </div>
                      </div>
                      <p className="text-white/30 text-xs mb-7 font-light leading-relaxed">{pkg.description}</p>
                      {/* Price */}
                      <div className="mb-7 pb-7 border-b border-white/6">
                        {isMonthly ? (
                          <>
                            <div className={`text-3xl font-bold mb-1 ${isSelected ? 'text-gold-gradient' : 'text-white/80'}`}>
                              시간당 ₩{pkg.pricePerHour.toLocaleString()}
                            </div>
                            <p className="text-white/25 text-xs">월 정기 결제 · 사용 시간 기준 정산</p>
                          </>
                        ) : (
                          <>
                            <div className={`text-3xl font-bold mb-1 ${isSelected ? 'text-gold-gradient' : 'text-white/80'}`}>
                              ₩{pkg.price.toLocaleString()}
                            </div>
                            <p className="text-white/25 text-xs">
                              {pkg.hours}시간 · 시간당 ₩{pkg.pricePerHour.toLocaleString()}
                            </p>
                          </>
                        )}
                      </div>
                      {/* Features */}
                      <ul className="space-y-3 mb-8">
                        {pkg.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5 ${isSelected ? 'bg-amber-500/20' : 'bg-white/5'}`}>
                              <Check className={`w-2.5 h-2.5 ${isSelected ? 'text-amber-400' : 'text-white/40'}`} />
                            </span>
                            <span className="text-white/45 text-xs leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      {/* CTA */}
                      <button
                        onClick={(e) => { e.stopPropagation(); window.open('https://itemmania.com', '_blank'); }}
                        className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold tracking-widest uppercase transition-all ${
                          isSelected
                            ? 'btn-luxury'
                            : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/60 border border-white/8'
                        }`}
                      >
                        아이템매니아에서 구매
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={`mt-8 text-center transition-all duration-700 ${pricing.inView ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '0.4s' }}>
              <p className="text-white/20 text-xs font-light">
                * 모든 플랜은 아이템매니아를 통해 안전하게 결제됩니다.
              </p>
            </div>
          </div>
        </section>

        {/* ── Payment Info ── */}
        <section className="py-10 px-4">
          <div
            ref={payment.ref}
            className="container mx-auto"
          >
            <div className={`max-w-3xl mx-auto luxury-card rounded-2xl p-8 transition-all duration-700 ${payment.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl border border-amber-500/20 bg-amber-500/5 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base mb-3 tracking-wide">리니지 대리 결제 방식</h3>
                  <div className="space-y-2 text-white/40 text-sm font-light">
                    <p><span className="text-amber-400/80 font-semibold">아이템매니아</span>를 통한 결제만 가능합니다.</p>
                    <p>상품 결제 후 작업 종료 확인 후 인수하는 방식으로 진행됩니다.</p>
                    <p className="text-white/25 text-xs">무통장, 카카오페이 등의 결제 방식은 제공하지 않습니다.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Process Section ── */}
        <section className="py-24">
          <div
            ref={process.ref}
            className="container mx-auto px-4"
          >
            <div className={`text-center mb-14 transition-all duration-700 ${process.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="section-label mb-6 inline-flex">Process</span>
              <h2 className="font-serif text-3xl font-bold text-white mb-4">리니지 클래식 대리 이용 절차</h2>
              <div className="luxury-divider" />
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                {/* Connector line */}
                <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

                {[
                  { step: '01', title: '상담', desc: '카카오톡으로 상담 진행', icon: <MessageCircle className="w-5 h-5" /> },
                  { step: '02', title: '선택', desc: '패키지 및 사냥터 선택', icon: <Star className="w-5 h-5" /> },
                  { step: '03', title: '결제', desc: '아이템매니아 안전 결제', icon: <Shield className="w-5 h-5" /> },
                  { step: '04', title: '작업', desc: '전문 기사 즉시 배정', icon: <Zap className="w-5 h-5" /> },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`luxury-card rounded-2xl p-6 text-center transition-all duration-700 ${process.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-10 h-10 rounded-full border border-amber-500/30 bg-amber-500/5 flex items-center justify-center mx-auto mb-4 text-amber-400">
                      {item.icon}
                    </div>
                    <div className="text-amber-500/40 text-[10px] font-black tracking-[0.2em] mb-2">{item.step}</div>
                    <h4 className="font-bold text-white/80 text-sm mb-2">{item.title}</h4>
                    <p className="text-white/30 text-xs font-light">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA Section ── */}
        <section className="py-24">
          <div
            ref={cta.ref}
            className="container mx-auto px-4"
          >
            <div className={`max-w-2xl mx-auto text-center transition-all duration-700 ${cta.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="luxury-card rounded-3xl p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)]" />
                <div className="relative z-10">
                  <span className="section-label mb-6 inline-flex">Contact</span>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">
                    지금 바로 리니지 대리<br />상담을 시작하세요
                  </h2>
                  <div className="luxury-divider my-6" />
                  <p className="text-white/35 text-sm mb-10 font-light leading-relaxed">
                    리니지대리와 함께 안전하고 신뢰할 수 있는<br />
                    리니지 클래식 대리 서비스를 경험해보세요.
                  </p>
                  <button
                    onClick={() => window.open('https://open.kakao.com/o/sxT1c2ci', '_blank')}
                    className="btn-luxury px-12 py-4 rounded-full text-sm tracking-widest uppercase"
                  >
                    카카오톡으로 상담하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}
