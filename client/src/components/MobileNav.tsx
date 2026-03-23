import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const navItems = [
    { href: '/', label: '메인' },
    { href: '/about', label: '소개/후기' },
    { href: '/items', label: '서비스 안내' },
    { href: '/qna', label: 'Q&A' },
    { href: '/recruitment', label: '기사모집' }
  ];

  const closeMenu = useCallback(() => setIsOpen(false), []);

  // 라우트 변경 시 메뉴 닫기
  useEffect(() => {
    closeMenu();
  }, [location, closeMenu]);

  // ESC 키 및 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current && !menuRef.current.contains(e.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(e.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    
    // 스크롤 잠금
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen, closeMenu]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-muted-foreground hover:text-primary transition-colors"
        aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* 배경 오버레이 */}
      {isOpen && (
        <div 
          className="fixed inset-0 top-20 bg-black/50 z-40 animate-in fade-in duration-200"
          onClick={closeMenu}
        />
      )}

      {/* 메뉴 */}
      {isOpen && (
        <div 
          ref={menuRef}
          className="fixed top-20 left-0 right-0 bg-background border-b border-white/10 shadow-lg z-50 animate-in slide-in-from-top-2 duration-200"
          role="navigation"
          aria-label="모바일 내비게이션"
        >
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={`text-base font-medium transition-colors py-3 px-4 rounded-lg ${
                  location === item.href 
                    ? 'text-primary bg-primary/10' 
                    : 'text-muted-foreground hover:text-primary hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            ))}
            {/* 카카오톡 상담 바로가기 */}
            <a
              href="https://open.kakao.com/o/sIZhRNhi"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="mt-2 flex items-center justify-center gap-2 bg-[#FEE500] hover:bg-[#FEE500]/90 text-black font-bold py-3 px-4 rounded-lg transition-all text-sm"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/e3/KakaoTalk_logo.svg" alt="Kakao" className="w-4 h-4" />
              카카오톡 상담하기
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}
