import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import Layout from '@/components/Layout';
import YouTubeSection from '@/components/YouTubeSection';
import { Shield, Lock, Clock, Award, ChevronRight, MessageCircle, Monitor, Users, CheckCircle2, Star, Zap, Eye } from 'lucide-react';
import { updatePageMeta, PAGE_SEO } from '@/lib/seo';

/* ── Intersection Observer Hook ── */
function useInView(threshold = 0.15) {
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

/* ── Animated Counter ── */
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView();
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function Home() {
  useEffect(() => {
    updatePageMeta(PAGE_SEO.home);
  }, []);

  const hero = useInView(0.05);
  const intro = useInView();
  const trusted = useInView();
  const safe = useInView();
  const live = useInView();
  const guide = useInView();
  const why = useInView();

  return (
    <Layout>

      {/* ══════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#06060E]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663318487784/QVbesoy6GVypU94qvYmB8S/hero-bg_a0e6e31c.jpg"
            alt="리니지 대리 서비스 배경"
            className="w-full h-full object-cover opacity-30"
          />
          {/* Multi-layer gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#06060E]/80 via-[#06060E]/50 to-[#06060E] z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#06060E]/60 via-transparent to-[#06060E]/60 z-10" />
        </div>

        {/* Ambient glow orbs */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] z-10 pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-amber-400/4 rounded-full blur-[100px] z-10 pointer-events-none" />

        {/* Particle dots */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${8 + i * 8}%`,
              bottom: '-4px',
              animationDuration: `${10 + i * 2.5}s`,
              animationDelay: `${i * 0.8}s`,
              opacity: 0.4 + (i % 3) * 0.2,
            }}
          />
        ))}

        {/* Content */}
        <div
          ref={hero.ref}
          className="container relative z-20 text-center px-4 pt-24 pb-16"
        >
          {/* Label */}
          <div
            className={`transition-all duration-700 ${hero.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '0.1s' }}
          >
            <span className="section-label mb-8 inline-flex">Premium Lineage Proxy Service</span>
          </div>

          {/* Title */}
          <div
            className={`transition-all duration-700 ${hero.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '0.25s' }}
          >
            <h1 className="font-serif font-bold text-white leading-tight tracking-tight mb-2" style={{ fontSize: 'clamp(2.8rem, 8vw, 6.5rem)' }}>
              리니지 학교
            </h1>
            <h2 className="font-serif font-bold leading-tight mb-8" style={{ fontSize: 'clamp(2rem, 6vw, 4.8rem)' }}>
              <span className="text-gold-gradient">기란팀 클래식 대리</span>
            </h2>
          </div>

          {/* Divider */}
          <div
            className={`transition-all duration-700 ${hero.inView ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
            style={{ transitionDelay: '0.4s' }}
          >
            <div className="luxury-divider mb-8 mx-auto" />
          </div>

          {/* Subtitle */}
          <div
            className={`transition-all duration-700 ${hero.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '0.5s' }}
          >
            <p className="text-base md:text-lg text-white/55 max-w-xl mx-auto mb-12 leading-relaxed font-light tracking-wide">
              오랜 노하우와 검증된 시스템으로 안전하고 신뢰할 수 있는<br className="hidden md:block" />
              최고의 리니지 대리 및 리니지 클래식 대리 서비스를 제공합니다.
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700 ${hero.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '0.65s' }}
          >
            <button
              onClick={() => window.open('https://open.kakao.com/o/sIZhRNhi', '_blank')}
              className="btn-luxury px-10 py-4 rounded-full text-sm tracking-widest uppercase"
            >
              상담 문의하기
            </button>
            <Link
              href="/items"
              className="btn-luxury-ghost px-10 py-4 rounded-full text-sm tracking-widest uppercase inline-block text-center"
            >
              서비스 안내
            </Link>
          </div>

          {/* Stats Row */}
          <div
            className={`mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto transition-all duration-700 ${hero.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '0.85s' }}
          >
            {[
              { value: 2000, suffix: '+', label: '누적 이용 건수' },
              { value: 24, suffix: 'H', label: '실시간 운영' },
              { value: 100, suffix: '%', label: '수작업 보장' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="stat-number"><Counter target={s.value} suffix={s.suffix} /></div>
                <div className="text-white/35 text-xs tracking-widest uppercase mt-1 font-light">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <div className="scroll-indicator">
            <div className="scroll-indicator-dot" />
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          INTRODUCTION SECTION
      ══════════════════════════════════════ */}
      <section className="py-32 bg-[#08080F] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.04)_0%,transparent_70%)]" />
        <div
          ref={intro.ref}
          className="container mx-auto px-4 text-center relative z-10"
        >
          <div className={`max-w-2xl mx-auto mb-16 transition-all duration-700 ${intro.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="section-label mb-6 inline-flex">Our Promise</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
              신뢰로 시작하는<br />리니지 클래식 대리 서비스
            </h2>
            <div className="luxury-divider my-6" />
            <p className="text-white/45 text-base leading-relaxed font-light">
              리니지대리는 다년간의 운영 노하우를 바탕으로 안전과 신뢰를 최우선으로 하는<br />
              리니지 대리 전문 서비스입니다.
            </p>
          </div>

          <div className={`relative max-w-4xl mx-auto transition-all duration-900 ${intro.inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transitionDelay: '0.2s' }}>
            <div className="img-reveal shadow-[0_40px_100px_rgba(0,0,0,0.7)] border border-white/5">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663318487784/QVbesoy6GVypU94qvYmB8S/sword-loading_081859dd.jpg"
                alt="리니지 대리 작업 화면 예시"
                className="w-full aspect-video object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080F]/80 via-transparent to-transparent flex items-end justify-center pb-8">
                <div className="glass-panel px-6 py-3 rounded-full">
                  <p className="text-white/80 text-sm font-medium tracking-wide">안전하고 신뢰할 수 있는 작업 환경 · 24시간 실시간 모니터링</p>
                </div>
              </div>
            </div>
            {/* Corner accents */}
            <div className="absolute -top-px -left-px w-8 h-8 border-t border-l border-amber-500/30" />
            <div className="absolute -top-px -right-px w-8 h-8 border-t border-r border-amber-500/30" />
            <div className="absolute -bottom-px -left-px w-8 h-8 border-b border-l border-amber-500/30" />
            <div className="absolute -bottom-px -right-px w-8 h-8 border-b border-r border-amber-500/30" />
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          TRUSTED SECTION
      ══════════════════════════════════════ */}
      <section className="py-32 bg-[#06060E] relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_right,rgba(212,175,55,0.04)_0%,transparent_60%)]" />
        <div
          ref={trusted.ref}
          className="container mx-auto px-4"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Text */}
            <div className={`order-2 lg:order-1 transition-all duration-700 ${trusted.inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <span className="section-label mb-6 inline-flex">Trusted</span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 leading-tight">
                리니지 대리,
              </h2>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight">
                <span className="text-gold-gradient">신뢰</span>
                <span className="text-white">로 시작하는 파트너</span>
              </h2>
              <div className="luxury-divider mb-8" style={{ margin: '0 0 2rem 0' }} />
              <p className="text-white/45 text-base leading-relaxed mb-10 font-light">
                리니지 전문 대리 부주 서비스 '리니지대리'는 계정 보안을 최우선으로,
                투명한 진행 상황 공유와 책임감 있는 작업을 약속드립니다. 리니지 클래식 대리 상담부터
                작업 완료까지 모든 과정은 기록과 증빙을 기반으로 진행됩니다.
              </p>
              <ul className="space-y-4">
                {[
                  "철저한 신원 인증을 거친 전문 기사 배정",
                  "24시간 실시간 모니터링 및 소통 가능",
                  "작업 시작/종료 시 상세 리포트 제공",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-white/65 text-sm">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full border border-amber-500/40 flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-amber-400" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Image */}
            <div className={`order-1 lg:order-2 relative transition-all duration-700 ${trusted.inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: '0.15s' }}>
              <div className="absolute -inset-8 bg-amber-500/5 rounded-full blur-[80px]" />
              <div className="img-reveal relative z-10 border border-white/5 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663318487784/QVbesoy6GVypU94qvYmB8S/trusted-illustration_7d5a3d27.jpg"
                  alt="리니지 대리 신뢰성 강조 이미지"
                  className="w-full rounded-2xl"
                />
              </div>
              <div className="absolute -top-px -left-px w-10 h-10 border-t-2 border-l-2 border-amber-500/40 rounded-tl-2xl" />
              <div className="absolute -bottom-px -right-px w-10 h-10 border-b-2 border-r-2 border-amber-500/40 rounded-br-2xl" />
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          SAFE SECTION
      ══════════════════════════════════════ */}
      <section className="py-32 bg-[#08080F] relative overflow-hidden">
        <div className="absolute left-0 top-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_left,rgba(212,175,55,0.03)_0%,transparent_60%)]" />
        <div
          ref={safe.ref}
          className="container mx-auto px-4"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Image */}
            <div className={`relative transition-all duration-700 ${safe.inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="absolute -inset-8 bg-amber-500/4 rounded-full blur-[80px]" />
              <div className="img-reveal relative z-10 border border-white/5 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663318487784/QVbesoy6GVypU94qvYmB8S/security-illustration_b2be097c.jpg"
                  alt="리니지 클래식 대리 보안 시스템"
                  className="w-full rounded-2xl"
                />
              </div>
              <div className="absolute -top-px -right-px w-10 h-10 border-t-2 border-r-2 border-amber-500/40 rounded-tr-2xl" />
              <div className="absolute -bottom-px -left-px w-10 h-10 border-b-2 border-l-2 border-amber-500/40 rounded-bl-2xl" />
            </div>
            {/* Text */}
            <div className={`transition-all duration-700 ${safe.inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: '0.15s' }}>
              <span className="section-label mb-6 inline-flex">Safe</span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 leading-tight">
                안정적인
              </h2>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight">
                <span className="text-gold-gradient">리니지 대리 보안</span>
                <span className="text-white"> 관리</span>
              </h2>
              <div className="luxury-divider mb-8" style={{ margin: '0 0 2rem 0' }} />
              <p className="text-white/45 text-base leading-relaxed mb-10 font-light">
                고객님의 소중한 리니지 계정을 타인과 공유하는 만큼, IP 접속환경 관리와
                보안 수칙을 철저히 준수합니다. 리니지 클래식 대리 작업 시 불필요한 접속 시도나
                위험 요소를 사전에 차단하여 안전한 플레이 환경을 보장합니다.
              </p>
              <Link href="/qna">
                <button className="btn-luxury-ghost px-8 py-3 rounded-full text-sm tracking-widest uppercase">
                  보안 관련 FAQ 보기
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          LIVE SECTION
      ══════════════════════════════════════ */}
      <section className="py-32 bg-[#06060E] relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(212,175,55,0.04)_0%,transparent_60%)]" />
        <div
          ref={live.ref}
          className="container mx-auto px-4"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Text */}
            <div className={`transition-all duration-700 ${live.inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <span className="section-label mb-6 inline-flex">Live</span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 leading-tight">
                실시간 작업 현황
              </h2>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight">
                <span className="text-gold-gradient">리니지 대리 소통</span>
              </h2>
              <div className="luxury-divider mb-8" style={{ margin: '0 0 2rem 0' }} />
              <p className="text-white/45 text-base leading-relaxed mb-10 font-light">
                리니지 대리 작업 진행 상황은 공지 및 작업현황 메뉴에서 확인하실 수 있으며,
                리니지 클래식 대리 관련 문의는 카카오톡 오픈채팅으로 편리하게 소통하실 수 있습니다.
              </p>
              <button
                onClick={() => window.open('https://open.kakao.com/o/sIZhRNhi', '_blank')}
                className="btn-luxury px-8 py-3 rounded-full text-sm tracking-widest uppercase"
              >
                카카오톡으로 현황 문의하기
              </button>
            </div>
            {/* Image */}
            <div className={`relative transition-all duration-700 ${live.inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: '0.15s' }}>
              <div className="absolute -inset-8 bg-amber-500/5 rounded-full blur-[80px]" />
              <div className="img-reveal relative z-10 border border-white/5 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663318487784/QVbesoy6GVypU94qvYmB8S/live-status_f1d238bb.jpg"
                  alt="리니지 대리 실시간 소통 화면"
                  className="w-full rounded-2xl"
                />
              </div>
              {/* Live badge */}
              <div className="absolute top-4 left-4 z-20 glass-panel px-3 py-1.5 rounded-full flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white/70 text-xs tracking-wider font-medium">LIVE</span>
              </div>
              <div className="absolute -top-px -left-px w-10 h-10 border-t-2 border-l-2 border-amber-500/40 rounded-tl-2xl" />
              <div className="absolute -bottom-px -right-px w-10 h-10 border-b-2 border-r-2 border-amber-500/40 rounded-br-2xl" />
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          GUIDE GRID SECTION
      ══════════════════════════════════════ */}
      <section className="py-32 bg-[#08080F] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)]" />
        <div
          ref={guide.ref}
          className="container mx-auto px-4 relative z-10"
        >
          <div className={`text-center mb-16 transition-all duration-700 ${guide.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="section-label mb-6 inline-flex">Guide</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">리니지 대리 가이드</h2>
            <div className="luxury-divider" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: "서비스 제공 안내", desc: "검증된 작업자만 참여하는 리니지 대리 서비스로, 계정 보안을 최우선으로 안전하고 신속하게 진행합니다.", icon: "📊", delay: 0 },
              { title: "신뢰의 운영", desc: "운영 경험을 바탕으로 리니지 클래식 대리 작업 내역을 투명하게 공유하며 약속을 지키는 것을 원칙으로 합니다.", icon: "🤝", delay: 0.05 },
              { title: "보안 시스템", desc: "필요 최소한의 정보만 요청하며, 이중 보안 수칙과 비밀번호 변경 안내로 안전한 리니지 육성 대리를 돕습니다.", icon: "🛡️", delay: 0.1 },
              { title: "실시간 현황 안내", desc: "카카오톡 오픈채팅으로 진행 상황을 수시 안내하며, 리니지 대리 주요 구간 캡처를 제공합니다.", icon: "📱", delay: 0.15 },
              { title: "합리적인 가격 기준", desc: "사냥터, 시간, 목표 수치에 따라 리니지 대리 요금을 세분화하여 사전에 안내해 드립니다.", icon: "💰", delay: 0.2 },
              { title: "카카오톡 전용 상담", desc: "전화나 이메일 대신 카카오톡 오픈채팅으로만 리니지 대리 상담을 진행하고 있습니다.", icon: "💬", delay: 0.25 },
              { title: "공지 및 규정 안내", desc: "리니지 대리 작업 요청 전 환불 및 취소 규정 등 필수 안내 사항을 수시로 업데이트합니다.", icon: "📢", delay: 0.3 },
              { title: "검증된 후기", desc: "실제 리니지 클래식 대리 이용자 후기와 재의뢰율로 서비스 퀄리티를 확인하실 수 있습니다.", icon: "⭐", delay: 0.35 },
            ].map((item, i) => (
              <div
                key={i}
                className={`luxury-card rounded-2xl overflow-hidden transition-all duration-700 ${guide.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${item.delay}s` }}
              >
                {/* Icon area */}
                <div className="h-32 bg-gradient-to-br from-[#141420] to-[#0E0E1A] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)]" />
                  <span className="text-3xl relative z-10">{item.icon}</span>
                </div>
                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-white/90 mb-2 text-sm tracking-wide">{item.title}</h3>
                  <p className="text-xs text-white/35 leading-relaxed line-clamp-3">{item.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-amber-500/50 text-xs font-medium tracking-wider">
                    <span>리니지대리 블로그</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          YOUTUBE VIDEO SECTION
      ══════════════════════════════════════ */}
      <YouTubeSection />


      {/* ══════════════════════════════════════
          WHY CHOOSE US
      ══════════════════════════════════════ */}
      <section className="py-32 bg-[#06060E] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.04)_0%,transparent_65%)]" />
        <div
          ref={why.ref}
          className="container mx-auto px-4 relative z-10"
        >
          <div className={`text-center mb-16 transition-all duration-700 ${why.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="section-label mb-6 inline-flex">Why Us</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">리니지 대리 선택의 이유</h2>
            <div className="luxury-divider mb-4" />
            <p className="text-white/35 text-sm tracking-wide">안전하고 투명한 리니지 클래식 대리 서비스의 표준</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: <Shield className="w-6 h-6" />,
                title: "신뢰와 안전",
                desc: "리니지 대리 작업 시 계정 보안을 최우선으로 하며 투명하게 진행합니다.",
                delay: 0,
              },
              {
                icon: <Clock className="w-6 h-6" />,
                title: "24시간 운영",
                desc: "언제든지 리니지 클래식 대리 상담 가능하며 실시간 현황을 공유합니다.",
                delay: 0.1,
              },
              {
                icon: <Award className="w-6 h-6" />,
                title: "전문 기사",
                desc: "리니지 대리 경험이 풍부한 전문 기사가 최고의 서비스를 제공합니다.",
                delay: 0.2,
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`luxury-card rounded-2xl p-8 flex flex-col items-start transition-all duration-700 ${why.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${item.delay}s` }}
              >
                <div className="w-12 h-12 rounded-xl border border-amber-500/20 bg-amber-500/5 flex items-center justify-center text-amber-400 mb-6">
                  {item.icon}
                </div>
                <h3 className="text-white font-bold text-base mb-3 tracking-wide">{item.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Final CTA */}
          <div className={`text-center mt-16 transition-all duration-700 ${why.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '0.35s' }}>
            <button
              onClick={() => window.open('https://open.kakao.com/o/sIZhRNhi', '_blank')}
              className="btn-luxury px-12 py-4 rounded-full text-sm tracking-widest uppercase"
            >
              지금 바로 상담하기
            </button>
          </div>
        </div>
      </section>

    </Layout>
  );
}
