import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Users, Briefcase, Award, Clock, FileText, CheckCircle2, Send } from 'lucide-react';

interface JobPosition {
  id: number;
  title: string;
  description: string;
  requirements: string[];
  benefits: string[];
  documents: string[];
}

const jobPositions: JobPosition[] = [
  {
    id: 1,
    title: '리니지 게임 기사',
    description: '리니지 게임에서 고객의 계정을 대리 플레이하는 업무를 담당합니다. 안정적인 수입과 자유로운 시간 관리가 가능합니다.',
    requirements: [
      '책임감 있는 성격',
      '안정적인 인터넷 환경',
      '신뢰성 있는 업무 처리 능력',
      '주 20시간 이상 근무 가능'
    ],
    benefits: [
      '자유로운 시간 관리',
      '24시간 운영 지원팀',
      '정기적인 교육 및 스킬 업그레이드'
    ],
    documents: [
      '범죄기록회보서',
      '신분증',
      '계좌번호',
      '기타 필요 서류 (추가 요청 시)'
    ]
  }
];

const qualifications = [
  {
    icon: <Users className="w-6 h-6" />,
    title: '신뢰성',
    description: '고객의 계정을 안전하게 관리할 수 있는 신뢰할 수 있는 분'
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    title: '책임감',
    description: '맡은 업무를 성실하게 수행하는 분'
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: '안정성',
    description: '지속적이고 안정적인 근무가 가능한 분'
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: '유연성',
    description: '자유로운 시간 관리와 안정적인 근무 가능'
  }
];

export default function RecruitmentPage() {
  const [expandedId, setExpandedId] = useState<number | null>(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 카카오톡으로 전송
    const message = `안녕하세요! 리니지대리 기사 모집에 지원합니다.\n\n이름: ${formData.name}\n이메일: ${formData.email}\n전화: ${formData.phone}\n경력: ${formData.experience}\n\n${formData.message}`;
    window.open(`https://open.kakao.com/o/sxT1c2ci`, '_blank');
    setFormData({
      name: '',
      email: '',
      phone: '',
      experience: '',
      message: ''
    });
  };

  return (
    <Layout>
      <div className="pt-20 pb-12">
        {/* Header */}
        <section className="py-16 bg-gradient-to-b from-primary/10 to-transparent border-b border-white/5">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">기사 모집</h1>
              <p className="text-muted-foreground text-lg">
                리니지대리와 함께 성장할 전문 기사를 모집합니다
              </p>
            </div>
          </div>
        </section>

        {/* Why Join Us */}
        <section className="py-16 bg-black/30 border-b border-white/5">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">리니지대리에서 일하는 이유</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {qualifications.map((item, index) => (
                <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-primary/30 transition-all">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 text-primary">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Job Positions */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">채용 공고</h2>
            <div className="max-w-4xl mx-auto space-y-6">
              {jobPositions.map((job) => (
                <div
                  key={job.id}
                  className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-primary/30 transition-all"
                >
                  <button
                    onClick={() => setExpandedId(expandedId === job.id ? null : job.id)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
                      <p className="text-muted-foreground">면접 시 급여 협의</p>
                    </div>
                    <div className={`text-primary transition-transform ${expandedId === job.id ? 'rotate-180' : ''}`}>
                      ▼
                    </div>
                  </button>

                  {expandedId === job.id && (
                    <div className="px-6 pb-6 border-t border-white/10 space-y-6">
                      <p className="text-gray-300">{job.description}</p>

                      <div>
                        <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                          필수 조건
                        </h4>
                        <ul className="space-y-2">
                          {job.requirements.map((req, index) => (
                            <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                          <Award className="w-5 h-5 text-primary" />
                          혜택
                        </h4>
                        <ul className="space-y-2">
                          {job.benefits.map((benefit, index) => (
                            <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                          <FileText className="w-5 h-5 text-primary" />
                          필요 서류
                        </h4>
                        <ul className="space-y-2">
                          {job.documents.map((doc, index) => (
                            <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              {doc}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-16 bg-black/30 border-t border-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-12 text-center">지원하기</h2>

              <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-xl p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-bold mb-2">이름</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                      placeholder="이름을 입력하세요"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-bold mb-2">이메일</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                      placeholder="이메일을 입력하세요"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-bold mb-2">전화번호</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                    placeholder="010-0000-0000"
                  />
                </div>

                <div>
                  <label className="block text-white font-bold mb-2">경력 (선택사항)</label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                    placeholder="예: 게임 경력, 기술 등"
                  />
                </div>

                <div>
                  <label className="block text-white font-bold mb-2">자기소개</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary resize-none"
                    placeholder="자신의 강점과 지원 동기를 작성해주세요"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-3 px-4 rounded-lg transition-all hover:shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  카카오톡으로 지원하기
                </button>

                <p className="text-xs text-gray-500 text-center">
                  지원 양식을 작성 후 카카오톡으로 전송됩니다. 빠른 검토를 위해 카카오톡으로 직접 연락주셔도 좋습니다.
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center bg-gradient-to-r from-primary/20 to-cyan-500/20 border border-primary/30 rounded-2xl p-12">
              <h2 className="text-3xl font-bold text-white mb-4">질문이 있으신가요?</h2>
              <p className="text-muted-foreground mb-8">
                채용 관련 문의사항은 카카오톡 오픈채팅을 통해 언제든지 물어볼 수 있습니다.
              </p>
              <button
                onClick={() => window.open('https://open.kakao.com/o/sxT1c2ci', '_blank')}
                className="inline-block bg-primary hover:bg-primary/90 text-black font-bold px-8 py-3 rounded-full transition-all hover:shadow-lg shadow-primary/20 cursor-pointer"
              >
                카카오톡으로 문의하기
              </button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
