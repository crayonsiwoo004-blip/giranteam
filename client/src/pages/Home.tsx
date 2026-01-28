import React from 'react';
import { Link } from 'wouter';
import Layout from '@/components/Layout';
import YouTubeSection from '@/components/YouTubeSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Lock, Clock, Award, ChevronRight, MessageCircle, Monitor, Users, CheckCircle2 } from 'lucide-react';

export default function Home() {
  return (
    <Layout>
      {/* SEO Optimization */}
      <head>
        <title>리니지 대리 | 리니지 클래식 대리 전문 서비스 - 리니지대리</title>
        <meta name="description" content="리니지 대리, 리니지 클래식 대리 및 육성 대리 전문 서비스입니다. 다년간의 노하우와 전문 기사 배정으로 안전하고 신속한 대리 서비스를 약속드립니다." />
        <meta name="keywords" content="리니지 대리, 리니지 클래식 대리, 리니지 육성 대리, 리니지 클래식 육성, 게임 대리 부주" />
        <link rel="canonical" href="https://giranteam.onrender.com" />
        
        {/* WebSite Structured Data for Google Site Name */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "리니지대리",
            "alternateName": ["Lineage Proxy", "리니지클래식대리"],
            "url": "https://giranteam.onrender.com"
          })}
        </script>
      </head>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black z-10"></div>
          <img 
            src="/images/hero-bg.jpg" 
            alt="리니지 대리 서비스 배경" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        
        {/* Content */}
        <div className="container relative z-20 text-center px-4">
          <div className="animate-fade-in-up">
            <h2 className="text-primary font-serif text-xl md:text-2xl mb-4 tracking-widest uppercase">Premium Lineage Proxy Service</h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 tracking-tight leading-tight">
              신뢰로 맡기는 <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-orange-500">리니지 클래식 대리</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 font-light">
              오랜 노하우와 검증된 시스템으로 안전하고 신뢰할 수 있는<br className="hidden md:block" /> 
              최고의 리니지 대리 및 리니지 클래식 대리 서비스를 제공합니다.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => window.open('https://open.kakao.com/o/sxT1c2ci', '_blank')}
                className="bg-primary hover:bg-primary/90 text-black font-bold px-8 py-6 text-lg rounded-full shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all hover:scale-105 cursor-pointer"
              >
                상담 문의하기
              </button>
              <Link href="/items" className="border border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full backdrop-blur-sm font-bold transition-all hover:scale-105 inline-block text-center">
                서비스 안내
              </Link>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">신뢰로 시작하는 리니지 클래식 대리 서비스</h2>
            <p className="text-muted-foreground text-lg">
              리니지대리는 다년간의 운영 노하우를 바탕으로 안전과 신뢰를 최우선으로 하는<br />
              리니지 대리 전문 서비스입니다.
            </p>
          </div>
          
          <div className="relative max-w-5xl mx-auto aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10 group">
            <img 
              src="/images/sword-loading.jpg" 
              alt="리니지 대리 작업 화면 예시" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
              <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 cursor-pointer hover:scale-110 transition-transform">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Section */}
      <section className="py-24 bg-black/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-primary font-bold tracking-wider text-sm uppercase mb-2 block">Trusted</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                리니지 대리,<br />
                <span className="text-blue-400">신뢰</span>로 시작하는 파트너
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                리니지 전문 대리 부주 서비스 '리니지대리'는 계정 보안을 최우선으로,
                투명한 진행 상황 공유와 책임감 있는 작업을 약속드립니다. 리니지 클래식 대리 상담부터
                작업 완료까지 모든 과정은 기록과 증빙을 기반으로 진행됩니다.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "철저한 신원 인증을 거친 전문 기사 배정",
                  "24시간 실시간 모니터링 및 소통 가능",
                  "작업 시작/종료 시 상세 리포트 제공"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-primary mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-3xl opacity-30"></div>
              <img 
                src="/images/trusted-illustration.jpg" 
                alt="리니지 대리 신뢰성 강조 이미지" 
                className="relative z-10 w-full rounded-2xl shadow-2xl border border-white/10 hover:translate-y-[-10px] transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Safe Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-cyan-500/20 rounded-full blur-3xl opacity-30"></div>
              <img 
                src="/images/security-illustration.jpg" 
                alt="리니지 클래식 대리 보안 시스템" 
                className="relative z-10 w-full rounded-2xl shadow-2xl border border-white/10 hover:translate-y-[-10px] transition-transform duration-500"
              />
            </div>
            <div>
              <span className="text-primary font-bold tracking-wider text-sm uppercase mb-2 block">Safe</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                안정적인<br />
                <span className="text-cyan-400">리니지 대리 보안</span> 관리
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                고객님의 소중한 리니지 계정을 타인과 공유하는 만큼, IP 접속환경 관리와
                보안 수칙을 철저히 준수합니다. 리니지 클래식 대리 작업 시 불필요한 접속 시도나 위험 요소를 사전에
                차단하여 안전한 플레이 환경을 보장합니다.
              </p>
              <Button variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-950/30">
                보안 정책 자세히 보기
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Live Section */}
      <section className="py-24 bg-black/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary font-bold tracking-wider text-sm uppercase mb-2 block">Live</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                실시간 작업 현황<br />
                <span className="text-indigo-400">리니지 대리 소통</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                리니지 대리 작업 진행 상황은 공지 및 작업현황 메뉴에서 확인하실 수 있으며, 
                리니지 클래식 대리 관련 문의는 카카오톡 오픈채팅으로 편리하게 소통하실 수 있습니다.
              </p>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                실시간 현황 확인하기
              </Button>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-indigo-500/20 rounded-full blur-3xl opacity-30"></div>
              <img 
                src="/images/live-status.jpg" 
                alt="리니지 대리 실시간 소통 화면" 
                className="relative z-10 w-full rounded-2xl shadow-2xl border border-white/10 hover:translate-y-[-10px] transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-bold text-white">리니지 대리 가이드</h2>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary flex items-center transition-colors">
              전체 보기 <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "리니지 대리·부주 서비스 제공 안내", desc: "검증된 작업자만 참여하는 리니지 대리 서비스로, 계정 보안을 최우선으로 안전하고 신속하게 진행합니다.", icon: "📊" },
              { title: "리니지 클래식 대리 신뢰의 운영", desc: "운영 경험을 바탕으로 리니지 클래식 대리 작업 내역을 투명하게 공유하며 약속을 지키는 것을 원칙으로 합니다.", icon: "🤝" },
              { title: "리니지 육성 대리 보안 시스템", desc: "필요 최소한의 정보만 요청하며, 이중 보안 수칙과 비밀번호 변경 안내로 안전한 리니지 육성 대리를 돕습니다.", icon: "🛡️" },
              { title: "실시간 리니지 대리 현황 안내", desc: "카카오톡 오픈채팅으로 진행 상황을 수시 안내하며, 리니지 대리 주요 구간 캡처를 제공합니다.", icon: "📱" },
              { title: "합리적인 리니지 대리 가격 기준", desc: "사냥터, 시간, 목표 수치에 따라 리니지 대리 요금을 세분화하여 사전에 안내해 드립니다.", icon: "💰" },
              { title: "카카오톡 전용 리니지 대리 상담", desc: "전화나 이메일 대신 카카오톡 오픈채팅으로만 리니지 대리 상담을 진행하고 있습니다.", icon: "💬" },
              { title: "리니지 대리 공지 및 규정 안내", desc: "리니지 대리 작업 요청 전 환불 및 취소 규정 등 필수 안내 사항을 수시로 업데이트합니다.", icon: "📢" },
              { title: "검증된 리니지 클래식 대리 후기", desc: "실제 리니지 클래식 대리 이용자 후기와 재의뢰율로 서비스 퀄리티를 확인하실 수 있습니다.", icon: "⭐" }
            ].map((item, i) => (
              <Card key={i} className="bg-card/50 border-white/5 hover:border-primary/50 transition-all hover:bg-card group overflow-hidden">
                <div className="h-40 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-500">
                  {item.icon}
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-white mb-3 line-clamp-1 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {item.desc}
                  </p>
                  <div className="mt-4 text-xs text-gray-500 font-mono">리니지대리 블로그</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Video Section */}
      <YouTubeSection />

      {/* Why Choose Us */}
      <section className="py-16 bg-black/30 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">리니지 대리 선택의 이유</h2>
            <p className="text-muted-foreground text-lg">안전하고 투명한 리니지 클래식 대리 서비스의 표준</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: <Shield className="w-8 h-8 text-primary" />, title: "신뢰와 안전", desc: "리니지 대리 작업 시 계정 보안을 최우선으로 하며 투명하게 진행합니다." },
              { icon: <Clock className="w-8 h-8 text-primary" />, title: "24시간 운영", desc: "언제든지 리니지 클래식 대리 상담 가능하며 실시간 현황을 공유합니다." },
              { icon: <Award className="w-8 h-8 text-primary" />, title: "전문 기사", desc: "리니지 대리 경험이 풍부한 전문 기사가 최고의 서비스를 제공합니다." }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 p-8 rounded-xl border border-white/10 hover:bg-white/10 transition-colors flex flex-col items-start">
                <div className="mb-4 p-3 bg-primary/20 rounded-lg">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
