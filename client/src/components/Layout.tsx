import React, { useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import MobileNav from '@/components/MobileNav';
import ThemeToggle from '@/components/ThemeToggle';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  useEffect(() => {
    // 마우스 우클릭 방지
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 드래그 및 복사 방지
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+C, Ctrl+V, Ctrl+U (소스보기), Ctrl+S, Ctrl+P, F12 (개발자도구) 방지
      if (
        (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'u' || e.key === 's' || e.key === 'p' || e.key === 'a')) ||
        e.key === 'F12'
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-none select-none">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-background to-background/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="text-2xl font-serif font-bold text-white tracking-tighter hover:text-primary transition-colors flex items-center gap-2">
            <span className="text-primary">⚔</span>
            리니지<span className="text-primary">대리</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group">메인<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span></Link>
            <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group">소개/후기<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span></Link>
            <Link href="/items" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group">서비스 안내<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span></Link>
            <Link href="/qna" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group">Q&A<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span></Link>
            <Link href="/recruitment" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group">기사모집<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span></Link>
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <MobileNav />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-black to-black/95 border-t border-white/10 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-serif font-bold text-white mb-4 inline-block hover:text-primary transition-colors flex items-center gap-2">
              <span className="text-primary">⚔</span>
              리니지<span className="text-primary">대리</span>
            </Link>
              <p className="text-muted-foreground mb-6 max-w-md">
                다년간의 운영 노하우를 바탕으로 안전과 신뢰를 최우선으로 하는 게임 대리 부주 전문 서비스입니다. 
                24시간 실시간 모니터링과 철저한 보안 시스템으로 고객님의 소중한 계정을 지켜드립니다.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-white mb-4">고객센터</h4>
              <div className="space-y-4">
                <a 
                  href="https://open.kakao.com/o/lineage_proxy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#FEE500] hover:bg-[#FEE500]/90 text-black font-bold px-4 py-2 rounded-lg transition-all text-sm"
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/e/e3/KakaoTalk_logo.svg" alt="Kakao" className="w-4 h-4" />
                  카카오톡 오픈채팅 상담
                </a>
                <ul className="space-y-2 text-muted-foreground">
                  <li>운영시간: 24시간 연중무휴</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-white mb-4">바로가기</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">고객 후기</Link></li>
                <li><Link href="/items" className="text-muted-foreground hover:text-primary transition-colors">서비스 안내</Link></li>
                <li><Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">개인정보처리방침</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 리니지대리. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
