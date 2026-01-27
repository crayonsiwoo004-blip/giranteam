import React, { useState } from 'react';
import { Link } from 'wouter';
import { Menu, X } from 'lucide-react';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '/', label: '메인' },
    { href: '/about', label: '소개/후기' },
    { href: '/items', label: '서비스 안내' },
    { href: '/qna', label: 'Q&A' },
    { href: '/recruitment', label: '기사모집' }
  ];

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-muted-foreground hover:text-primary transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-background border-b border-white/10 shadow-lg z-50">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-primary transition-colors py-2 px-4 rounded-lg hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
