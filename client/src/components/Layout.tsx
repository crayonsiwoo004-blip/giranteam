import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import MobileNav from '@/components/MobileNav';
import ThemeToggle from '@/components/ThemeToggle';
import KakaoConsultButton from '@/components/KakaoConsultButton';

interface LayoutProps {
  children: React.ReactNode;
}

const NAV_LINKS = [
  { href: '/', label: '메인' },
  { href: '/about', label: '소개/후기' },
  { href: '/items', label: '서비스 안내' },
  { href: '/qna', label: 'Q&A' },
  { href: '/recruitment', label: '기사모집' },
];

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // 검색 엔진 봇인지 확인
    const isBot = /bot|googlebot|crawler|spider|robot|crawling|lighthouse|bingbot|yandex|duckduckbot/i.test(navigator.userAgent);
    if (isBot) return;

    const handleContextMenu = (e: MouseEvent) => { e.preventDefault(); };
    document.addEventListener('contextmenu', handleContextMenu);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 40);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#06060E] text-foreground font-sans selection:bg-none select-none">

      {/* ── Scroll Progress Bar ── */}
      <div
        className="fixed top-0 left-0 h-[2px] z-[60] transition-all duration-150"
        style={{
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, #D4AF37, #F0D060, #D4AF37)',
        }}
      />

      {/* ── Header ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#06060E]/95 backdrop-blur-xl border-b border-amber-500/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
            : 'bg-transparent border-b border-transparent'
        }`}
        style={{ paddingTop: '2px' }}
      >
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
          >
            <div className="relative">
              <span className="text-xl text-amber-400 group-hover:text-amber-300 transition-colors duration-300">⚔</span>
              <div className="absolute inset-0 bg-amber-400/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="font-serif font-bold text-xl tracking-tight">
              <span className="text-white/90 group-hover:text-white transition-colors duration-300">리니지</span>
              <span className="text-gold-gradient">학교</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = location === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 rounded-lg group ${
                    isActive
                      ? 'text-amber-400'
                      : 'text-white/45 hover:text-white/80'
                  }`}
                >
                  {label}
                  {/* Active indicator */}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[1.5px] rounded-full transition-all duration-300 bg-gradient-to-r from-transparent via-amber-400 to-transparent ${
                      isActive ? 'w-4/5 opacity-100' : 'w-0 opacity-0 group-hover:w-3/5 group-hover:opacity-60'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.open('https://open.kakao.com/o/sIZhRNhi', '_blank')}
              className="hidden md:flex btn-luxury items-center gap-2 px-5 py-2.5 rounded-full text-xs tracking-widest uppercase"
            >
              상담하기
            </button>
            <div className="md:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="flex-grow">
        {children}
      </main>

      {/* ── Footer ── */}
      <footer className="bg-[#04040A] border-t border-amber-500/8 relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_bottom,rgba(212,175,55,0.03)_0%,transparent_60%)] pointer-events-none" />

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-5">
              <Link href="/" className="flex items-center gap-2.5 mb-5 group w-fit">
                <span className="text-xl text-amber-400 group-hover:text-amber-300 transition-colors">⚔</span>
                <span className="font-serif font-bold text-xl tracking-tight">
                  <span className="text-white/90">리니지</span>
                  <span className="text-gold-gradient">학교</span>
                </span>
              </Link>
              <p className="text-white/30 text-sm leading-relaxed max-w-sm font-light">
                다년간의 운영 노하우를 바탕으로 안전과 신뢰를 최우선으로 하는
                게임 대리 부주 전문 서비스입니다. 24시간 실시간 모니터링과
                철저한 보안 시스템으로 고객님의 소중한 계정을 지켜드립니다.
              </p>
            </div>

            {/* Customer Service */}
            <div className="md:col-span-3">
              <h4 className="text-white/70 text-xs font-bold tracking-[0.2em] uppercase mb-5">고객센터</h4>
              <div className="space-y-4">
                <a
                  href="https://open.kakao.com/o/sIZhRNhi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#FEE500] hover:bg-[#FFD700] text-black font-bold px-4 py-2.5 rounded-lg transition-all text-xs tracking-wide shadow-[0_4px_16px_rgba(254,229,0,0.2)] hover:shadow-[0_6px_24px_rgba(254,229,0,0.35)] hover:-translate-y-0.5"
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/e/e3/KakaoTalk_logo.svg" alt="Kakao" className="w-4 h-4" />
                  카카오톡 오픈채팅 상담
                </a>
                <p className="text-white/25 text-xs">운영시간: 24시간 연중무휴</p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-2">
              <h4 className="text-white/70 text-xs font-bold tracking-[0.2em] uppercase mb-5">바로가기</h4>
              <ul className="space-y-3">
                {[
                  { href: '/about', label: '고객 후기' },
                  { href: '/items', label: '서비스 안내' },
                  { href: '/qna', label: 'Q&A / FAQ' },
                  { href: '/recruitment', label: '기사모집' },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-white/30 hover:text-amber-400/70 text-sm transition-colors duration-300 font-light"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Info */}
            <div className="md:col-span-2">
              <h4 className="text-white/70 text-xs font-bold tracking-[0.2em] uppercase mb-5">안내</h4>
              <ul className="space-y-3">
                <li className="text-white/25 text-xs font-light">100% 수작업 보장</li>
                <li className="text-white/25 text-xs font-light">아이템매니아 결제</li>
                <li className="text-white/25 text-xs font-light">이중 보안 인증</li>
              </ul>
            </div>
          </div>

          {/* Gold rule */}
          <hr className="gold-rule mb-8" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/20 text-xs font-light tracking-wide">
              &copy; 2026 리니지대리 · 기란팀. All rights reserved.
            </p>
            <p className="text-white/15 text-xs font-light">
              본 서비스는 리니지 클래식 대리 전문 서비스입니다.
            </p>
          </div>
        </div>
      </footer>

      {/* ── Floating Kakao Button ── */}
      <KakaoConsultButton />
    </div>
  );
}
