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
    { href: '/recruitment', label: '기사모집' },
  ];

  const closeMenu = useCallback(() => setIsOpen(false), []);
  useEffect(() => { closeMenu(); }, [location, closeMenu]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') closeMenu(); };
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current && !menuRef.current.contains(e.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(e.target as Node)
      ) closeMenu();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
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
        className="p-2 text-white/40 hover:text-amber-400 transition-colors duration-300"
        aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 top-20 bg-black/70 backdrop-blur-sm z-40" onClick={closeMenu} />
      )}

      {isOpen && (
        <div
          ref={menuRef}
          className="fixed top-20 left-0 right-0 z-50 border-b border-amber-500/10"
          style={{ background: 'rgba(6,6,14,0.97)', backdropFilter: 'blur(20px)' }}
          role="navigation"
          aria-label="모바일 내비게이션"
        >
          <div className="h-[1px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
          <nav className="container mx-auto px-6 py-6 flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`flex items-center justify-between py-3.5 px-4 rounded-xl text-sm font-medium tracking-wide transition-all duration-300 ${
                    isActive
                      ? 'text-amber-400 bg-amber-500/8'
                      : 'text-white/40 hover:text-white/70 hover:bg-white/4'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                </Link>
              );
            })}
            <div className="my-3 h-px bg-white/5" />
            <a
              href="https://open.kakao.com/o/sIZhRNhi"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 bg-[#FEE500] hover:bg-[#FFD700] text-black font-bold py-3.5 px-4 rounded-xl transition-all text-sm tracking-wide shadow-[0_4px_16px_rgba(254,229,0,0.2)]"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/e3/KakaoTalk_logo.svg" alt="Kakao" className="w-4 h-4" />
              카카오톡 상담하기
            </a>
          </nav>
          <div className="h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
        </div>
      )}
    </div>
  );
}
