import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import MobileNav from '@/components/MobileNav';
import ThemeToggle from '@/components/ThemeToggle';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
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
              <ul className="space-y-2 text-muted-foreground">
                <li>카카오톡: lineage_help</li>
                <li>텔레그램: @lineage_proxy</li>
                <li>운영시간: 24시간 연중무휴</li>
              </ul>
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
            <p>&copy; 2026 리니지대리. All rights reserved. 본 사이트는 포트폴리오 목적으로 제작되었습니다.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

