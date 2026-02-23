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
    title: '리니지 대리 전문 기사',
    description: '리니지 대리 및 리니지 클래식 대리 업무를 담당할 전문 기사를 모집합니다. 안정적인 수익과 자유로운 업무 환경을 제공합니다.',
    requirements: [
      '리니지 게임에 대한 높은 이해도',
      '책임감 있는 성격 및 성실함',
      '안정적인 인터넷 및 PC 환경',
      '장기 근무 가능자 우대'
    ],
    benefits: [
      '업계 최고 수준의 수익 보장',
      '24시간 운영 지원 및 케어',
      '안정적인 물량 확보 및 배정'
    ],
    documents: [
      '본인 확인 서류',
      '기타 업무 수행에 필요한 서류'
    ]
  }
];

const qualifications = [
  {
    icon: <Users className="w-6 h-6" />,
    title: '신뢰성',
    description: '고객의 소중한 계정을 안전하게 관리할 수 있는 신뢰할 수 있는 분'
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    title: '책임감',
    description: '리니지 대리 업무를 자신의 일처럼 책임감 있게 수행하는 분'
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: '안정성',
    description: '지속적이고 안정적인 근무가 가능한 전문 기사님'
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: '유연성',
    description: '자유로운 시간 관리와 효율적인 업무 처리가 가능'
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
    const message = `안녕하세요! 리니지대리 기사 모집에 지원합니다.\n\n이름: ${formData.name}\n이메일: ${formData.email}\n전화: ${formData.phone}\n경력: ${formData.experience}\n\n${formData.message}`;
    window.open(`https://open.kakao.com/o/sIZhRNhi`, '_blank');
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
      {/* SEO Optimization */}
      <head>
        <title>기사 모집 | 리니지 학교(기란팀) 리니지 클래식 전문 파트너 채용</title>
        <meta name="description" content="리니지 학교(기란팀)와 함께 성장할 리니지 클래식 전문 부주 기사님을 모집합니다. 업계 최고 수준의 단가와 안정적인 작업 환경을 보장합니다." />
        <meta name="keywords" content="리니지 기사 모집, 리니지 클래식 부주 구인, 기란팀 기사 채용, 리니지 학교 기사모집, 게임 부주 알바" />
      </head>

      <div className="pt-20 pb-12">
        {/* Header */}
        <section className="py-16 bg-gradient-to-b from-primary/10 to-transparent border-b border-white/5">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">리니지 클래식 기사 모집</h1>
            <p className="text-muted-foreground text-lg">
              리니지대리와 함께 성장할 리니지 클래식 대리 전문 파트너를 찾습니다
            </p>
          </div>
        </section>

        {/* Why Join Us */}
        <section className="py-16 bg-black/30 border-b border-white/5">
          <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-white mb-12 text-center">왜 기란팀인가?</h2>
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
            <h2 className="text-3xl font-bold text-white mb-12 text-center">채용 공고 안내</h2>
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
                      <p className="text-muted-foreground">리니지 대리 업무 수행 파트너</p>
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
                          지원 조건
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
                          활동 혜택
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
              <h2 className="text-3xl font-bold text-white mb-12 text-center">리니지 대리 기사 지원하기</h2>

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
                      placeholder="성함을 입력하세요"
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
                      placeholder="이메일 주소"
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
                    placeholder="연락처를 입력하세요"
                  />
                </div>

                <div>
                  <label className="block text-white font-bold mb-2">리니지 경력</label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                    placeholder="리니지 플레이 경력 및 서버"
                  />
                </div>

                <div>
                  <label className="block text-white font-bold mb-2">자기소개 및 지원동기</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary resize-none"
                    placeholder="리니지 대리 기사로서의 강점을 작성해주세요"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-3 px-4 rounded-lg transition-all hover:shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  카카오톡으로 지원하기
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto bg-gradient-to-r from-primary/20 to-cyan-500/20 border border-primary/30 rounded-2xl p-12">
              <h2 className="text-3xl font-bold text-white mb-4">리니지 대리 전문가를 기다립니다</h2>
              <p className="text-muted-foreground mb-8">
                궁금한 사항은 언제든 문의주세요.
              </p>
              <button
                onClick={() => window.open('https://open.kakao.com/o/sIZhRNhi', '_blank')}
                className="inline-block bg-primary hover:bg-primary/90 text-black font-bold px-8 py-3 rounded-full transition-all hover:shadow-lg shadow-primary/20 cursor-pointer"
              >
                카카오톡 문의하기
              </button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
