import React, { useState } from 'react';
import { MessageSquare, Lock, Zap, CheckCircle2 } from 'lucide-react';

interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  details: string[];
}

const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: '상담 및 계약',
    description: '전문가와의 1:1 상담을 통해 서비스 내용을 결정합니다.',
    icon: <MessageSquare className="w-8 h-8" />,
    image: '/images/process-consultation.jpg',
    details: [
      '카카오톡 오픈채팅으로 편리한 상담',
      '목표 수치 및 시간 협의',
      '투명한 요금 안내',
      '계약서 작성 및 선금 결제'
    ]
  },
  {
    id: 2,
    title: '보안 검증',
    description: '계정 보안을 위한 철저한 검증 절차를 진행합니다.',
    icon: <Lock className="w-8 h-8" />,
    image: '/images/process-security.jpg',
    details: [
      '이중 보안 인증 설정',
      'IP 접속 환경 관리',
      '비밀번호 변경 및 보호',
      '작업 기간 중 실시간 모니터링'
    ]
  },
  {
    id: 3,
    title: '실시간 작업',
    description: '전문 기사가 계정에 로그인하여 작업을 진행합니다.',
    icon: <Zap className="w-8 h-8" />,
    image: '/images/gameplay-screenshot.jpg',
    details: [
      '24시간 실시간 작업 진행',
      '작업 현황 수시 보고',
      '주요 구간 캡처 및 로그 기록',
      '카카오톡으로 즉시 소통'
    ]
  },
  {
    id: 4,
    title: '완료 및 보고',
    description: '작업 완료 후 상세 보고서와 함께 계정을 반환합니다.',
    icon: <CheckCircle2 className="w-8 h-8" />,
    image: '/images/process-completion.jpg',
    details: [
      '작업 완료 보고서 제공',
      '최종 결과 확인 및 검증',
      '계정 보안 재설정',
      '사후 관리 및 A/S 지원'
    ]
  }
];

export default function ServiceProcess() {
  const [activeStep, setActiveStep] = useState(0);
  const currentStep = processSteps[activeStep];

  return (
    <section className="py-24 bg-black/50 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">서비스 프로세스</h2>
          <p className="text-muted-foreground text-lg">4단계로 진행되는 안전하고 투명한 서비스 절차</p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Process Steps Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            {processSteps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(index)}
                className={`p-6 rounded-xl transition-all border-2 ${
                  activeStep === index
                    ? 'bg-primary/20 border-primary text-white shadow-lg shadow-primary/20'
                    : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-sm font-bold ${activeStep === index ? 'text-primary' : 'text-gray-500'}`}>
                    STEP {step.id}
                  </span>
                  <div className={`p-2 rounded-lg ${activeStep === index ? 'bg-primary/30 text-primary' : 'bg-white/10 text-gray-400'}`}>
                    {step.icon}
                  </div>
                </div>
                <h3 className="font-bold text-left">{step.title}</h3>
              </button>
            ))}
          </div>

          {/* Process Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/10 rounded-2xl blur-2xl"></div>
              <img
                src={currentStep.image}
                alt={currentStep.title}
                className="relative w-full rounded-2xl shadow-2xl border border-white/10 object-cover aspect-square"
              />
            </div>

            {/* Content */}
            <div className="space-y-8">
              <div>
                <span className="text-primary font-bold text-sm uppercase tracking-widest">STEP {currentStep.id}</span>
                <h3 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">{currentStep.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">{currentStep.description}</p>
              </div>

              {/* Details List */}
              <div className="space-y-3">
                {currentStep.details.map((detail, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300">{detail}</p>
                  </div>
                ))}
              </div>

              {/* Progress Indicator */}
              <div className="pt-8 border-t border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">진행 단계</span>
                  <span className="text-sm font-bold text-primary">{activeStep + 1} / {processSteps.length}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-primary to-cyan-400 h-full transition-all duration-500"
                    style={{ width: `${((activeStep + 1) / processSteps.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
