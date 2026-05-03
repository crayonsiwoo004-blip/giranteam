import React, { useState, useEffect, useRef } from 'react';
import Layout from '@/components/Layout';
import { updatePageMeta, PAGE_SEO } from '@/lib/seo';
import { Star, MessageSquare, Plus, Trash2, ShieldCheck, LogOut, Lock, X, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  content: string;
  service: string;
  game?: string;
}

const SUPPORTED_GAMES = ['리니지 클래식', '리니지 리마스터', '리니지2', '기타 게임'];
const SERVICE_TYPES: Record<string, string[]> = {
  '리니지 클래식': ['리니지 클래식 대리', '리니지 클래식 부주', '리니지 클래식 육성'],
  '리니지 리마스터': ['리니지 리마스터 대리', '리니지 리마스터 부주'],
  '리니지2': ['리니지2 대리', '리니지2 육성'],
  '기타 게임': ['기타 게임 대리', '기타 서비스'],
};
const ALL_SERVICES = Object.values(SERVICE_TYPES).flat();

const StarRating = ({ rating, setRating, size = 'md' }: { rating: number; setRating?: (r: number) => void; size?: 'sm' | 'md' }) => {
  const cls = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          onClick={() => setRating && setRating(i + 1)}
          className={`${cls} transition-transform ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-white/15'} ${setRating ? 'cursor-pointer hover:scale-110' : ''}`}
        />
      ))}
    </div>
  );
};

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterService, setFilterService] = useState<string>('전체');
  const [filterGame, setFilterGame] = useState<string>('전체');
  const [sortOrder, setSortOrder] = useState<'latest' | 'rating'>('latest');
  const [formData, setFormData] = useState({ author: '', rating: 5, content: '', service: '리니지 클래식 대리', game: '리니지 클래식' });

  const header = useInView(0.05);
  const listSection = useInView();

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/reviews');
      if (response.ok) setReviews(await response.json());
    } catch {}
  };

  useEffect(() => {
    updatePageMeta(PAGE_SEO.reviews);
    fetchReviews();
    if (localStorage.getItem('giranteam_is_admin') === 'true') setIsAdmin(true);
  }, []);

  const averageRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  const handleAdminLogin = async () => {
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: adminPassword }),
      });
      if (response.ok) {
        const data = await response.json();
        setIsAdmin(true);
        localStorage.setItem('giranteam_is_admin', 'true');
        localStorage.setItem('giranteam_admin_token', data.token || '');
        setShowAdminLogin(false);
        setAdminPassword('');
        toast.success("관리자 인증 성공");
      } else {
        toast.error("인증 실패", { description: "비밀번호가 올바르지 않습니다." });
      }
    } catch {
      toast.error("서버 연결 실패");
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('giranteam_is_admin');
    localStorage.removeItem('giranteam_admin_token');
    toast.info("로그아웃");
  };

  const applyTemplate = (serviceType: string, gameType?: string) => {
    const game = gameType || formData.game;
    const templates: Record<string, string> = {
      '리니지 클래식 대리': `[${game} 대리 후기]\n\n이용 서버: \n작성 내용: 정말 안전하고 빠르게 작업해주셨습니다. 소통이 잘 되어서 믿고 맡길 수 있었어요. 다음에 또 이용하겠습니다!`,
      '리니지 클래식 부주': `[${game} 부주 후기]\n\n이용 서버: \n목표 달성 내용: \n작성 내용: 부주 작업이 꼼꼼하게 진행되었습니다. 진행 상황도 매일 알려주셔서 안심되었습니다.`,
      '리니지 클래식 육성': `[${game} 육성 후기]\n\n목표 레벨: \n작성 내용: 번거로운 육성 과정을 대신해주셔서 편했습니다. 보안도 철저하고 진행 상황도 매일 알려주셔서 안심되었습니다.`,
    };
    const defaultTemplate = `[${game} 서비스 후기]\n\n이용 내용: \n작성 내용: 친절한 상담과 확실한 작업 처리에 감동받았습니다. 추천합니다!`;
    setFormData(prev => ({ ...prev, service: serviceType, game: game, content: templates[serviceType] || defaultTemplate }));
  };

  const handleAddReview = async () => {
    if (!formData.author || !formData.content) {
      toast.error("이름과 내용을 모두 입력해주세요.");
      return;
    }
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success("후기가 등록되었습니다!");
        setShowForm(false);
        setFormData({ author: '', rating: 5, content: '', service: '리니지 클래식 대리', game: '리니지 클래식' });
        fetchReviews();
      }
    } catch {
      toast.error("등록 실패. 잠시 후 다시 시도해주세요.");
    }
  };

  const deleteReview = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const token = localStorage.getItem('giranteam_admin_token');
    try {
      const response = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        setReviews(prev => prev.filter(r => r.id !== id));
        toast.success("후기가 삭제되었습니다.");
      }
    } catch {
      toast.error("삭제 실패");
    }
  };

  const filteredReviews = reviews
    .filter(r => filterGame === '전체' || r.game === filterGame || (!r.game && filterGame === '리니지 클래식'))
    .filter(r => filterService === '전체' || r.service === filterService)
    .sort((a, b) => sortOrder === 'rating' ? b.rating - a.rating : new Date(b.date).getTime() - new Date(a.date).getTime());

  const ratingCounts = [5, 4, 3, 2, 1].map(n => ({
    star: n,
    count: reviews.filter(r => r.rating === n).length,
    pct: reviews.length ? (reviews.filter(r => r.rating === n).length / reviews.length) * 100 : 0,
  }));

  return (
    <Layout>
      <div className="bg-[#06060E] min-h-screen">

        <section className="pt-36 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_top,rgba(212,175,55,0.06)_0%,transparent_60%)]" />
          <div ref={header.ref} className="container mx-auto px-4 text-center relative z-10">
            <div className={`transition-all duration-700 ${header.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="section-label mb-6 inline-flex">Reviews</span>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
                고객 <span className="text-gold-gradient">후기</span>
              </h1>
              <div className="luxury-divider my-6" />
              <p className="text-white/35 text-sm font-light mb-10">리니지 대리 및 클래식 대리 이용 고객님들의 실제 후기입니다.</p>
              <div className="max-w-sm mx-auto luxury-card rounded-2xl p-8">
                <div className="text-5xl font-bold text-gold-gradient mb-2">{averageRating}</div>
                <StarRating rating={Math.round(Number(averageRating))} />
                <p className="text-white/30 text-xs mt-3 font-light">총 {reviews.length}개의 후기</p>
                <div className="mt-6 space-y-2">
                  {ratingCounts.map(({ star, count, pct }) => (
                    <div key={star} className="flex items-center gap-3">
                      <span className="text-white/30 text-xs w-3">{star}</span>
                      <Star className="w-3 h-3 fill-amber-400/60 text-amber-400/60 flex-shrink-0" />
                      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-amber-500/60 to-amber-400/40 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-white/20 text-xs w-4 text-right">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-5 border-y border-amber-500/8 sticky top-20 z-30 bg-[#06060E]/95 backdrop-blur-xl">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <select value={filterGame} onChange={e => { setFilterGame(e.target.value); setFilterService('전체'); }}
                    className="appearance-none bg-white/5 border border-white/8 text-white/50 text-xs px-4 py-2 pr-8 rounded-lg focus:outline-none focus:border-amber-500/30 cursor-pointer">
                    <option value="전체">전체 게임</option>
                    {SUPPORTED_GAMES.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-white/30 pointer-events-none" />
                </div>
                <div className="relative">
                  <select value={filterService} onChange={e => setFilterService(e.target.value)}
                    className="appearance-none bg-white/5 border border-white/8 text-white/50 text-xs px-4 py-2 pr-8 rounded-lg focus:outline-none focus:border-amber-500/30 cursor-pointer">
                    <option value="전체">전체 서비스</option>
                    {(filterGame === '전체' ? ALL_SERVICES : SERVICE_TYPES[filterGame] || ALL_SERVICES).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-white/30 pointer-events-none" />
                </div>
                <div className="flex items-center gap-1 bg-white/5 border border-white/8 rounded-lg p-1">
                  {(['latest', 'rating'] as const).map(o => (
                    <button key={o} onClick={() => setSortOrder(o)}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${sortOrder === o ? 'bg-amber-500/20 text-amber-400' : 'text-white/30 hover:text-white/50'}`}>
                      {o === 'latest' ? '최신순' : '평점순'}
                    </button>
                  ))}
                </div>
                {isAdmin ? (
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1.5 bg-green-500/10 text-green-400 px-3 py-1.5 rounded-lg text-xs font-bold border border-green-500/20">
                      <ShieldCheck className="w-3 h-3" /> 관리자
                    </span>
                    <button onClick={handleAdminLogout} className="text-white/25 hover:text-white/50 text-xs flex items-center gap-1">
                      <LogOut className="w-3 h-3" /> 로그아웃
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setShowAdminLogin(true)} className="text-white/15 hover:text-white/30 text-xs underline">관리자</button>
                )}
              </div>
              <button
                onClick={() => { setShowForm(true); applyTemplate('리니지 클래식 대리', '리니지 클래식'); }}
                className="btn-luxury flex items-center gap-2 px-5 py-2.5 rounded-full text-xs tracking-widest uppercase flex-shrink-0"
              >
                <Plus className="w-3.5 h-3.5" /> 후기 작성
              </button>
            </div>
          </div>
        </section>

        <section className="py-16" ref={listSection.ref}>
          <div className="container mx-auto px-4 max-w-3xl space-y-4">
            {filteredReviews.length === 0 ? (
              <div className="text-center py-24 luxury-card rounded-2xl">
                <MessageSquare className="w-10 h-10 text-white/15 mx-auto mb-4" />
                <p className="text-white/25 text-sm font-light">아직 등록된 후기가 없습니다. 첫 후기를 남겨주세요!</p>
              </div>
            ) : (
              filteredReviews.map((review, i) => (
                <div
                  key={review.id}
                  className={`luxury-card rounded-2xl p-6 md:p-8 cursor-pointer relative group transition-all duration-700 ${listSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                  style={{ transitionDelay: `${Math.min(i * 0.06, 0.5)}s` }}
                  onClick={() => setExpandedId(expandedId === review.id ? null : review.id)}
                >
                  {isAdmin && (
                    <button onClick={(e) => deleteReview(review.id, e)}
                      className="absolute top-4 right-4 p-2 text-white/15 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all z-10" title="삭제">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border border-amber-500/20 bg-amber-500/5 flex items-center justify-center text-amber-400 font-bold text-sm flex-shrink-0">
                        {review.author[0]}
                      </div>
                      <div>
                        <h4 className="text-white/80 font-bold text-sm">{review.author}</h4>
                        <p className="text-white/25 text-xs">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-2">
                      <StarRating rating={review.rating} size="sm" />
                      <div className="flex items-center gap-2">
                        {review.game && review.game !== '리니지 클래식' && (
                          <span className="px-2 py-0.5 bg-white/5 text-white/30 text-[10px] font-medium rounded-md border border-white/8">{review.game}</span>
                        )}
                        <span className="px-2.5 py-0.5 bg-amber-500/8 text-amber-400/70 text-[10px] font-bold rounded-md border border-amber-500/15">{review.service}</span>
                      </div>
                    </div>
                  </div>
                  <p className={`text-white/40 text-sm leading-relaxed whitespace-pre-wrap font-light ${expandedId === review.id ? '' : 'line-clamp-3'}`}>
                    {review.content}
                  </p>
                  {expandedId !== review.id && review.content.length > 150 && (
                    <button className="mt-3 text-amber-500/50 text-xs font-medium hover:text-amber-400/70 transition-colors">더 보기 ↓</button>
                  )}
                </div>
              ))
            )}
          </div>
        </section>

        {showAdminLogin && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
            <div className="luxury-card rounded-2xl p-8 max-w-sm w-full border border-amber-500/15">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Lock className="text-amber-400 w-4 h-4" /> 관리자 인증
              </h3>
              <input type="password" value={adminPassword} onChange={e => setAdminPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAdminLogin()}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm mb-4 focus:border-amber-500/30 outline-none placeholder:text-white/20"
                placeholder="비밀번호를 입력하세요" autoFocus />
              <div className="flex gap-3">
                <button onClick={() => setShowAdminLogin(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white/50 font-medium py-3 rounded-xl text-sm transition-all">취소</button>
                <button onClick={handleAdminLogin} className="flex-1 btn-luxury py-3 rounded-xl text-sm">확인</button>
              </div>
            </div>
          </div>
        )}

        {showForm && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="luxury-card rounded-2xl border border-amber-500/15 p-6 md:p-8 max-w-2xl w-full my-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-white">후기 작성</h3>
                <button onClick={() => setShowForm(false)} className="text-white/25 hover:text-white/60 transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-white/40 tracking-widest uppercase mb-3">게임 선택</label>
                  <div className="flex flex-wrap gap-2">
                    {SUPPORTED_GAMES.map(g => (
                      <button key={g} onClick={() => { const firstService = SERVICE_TYPES[g]?.[0] || '기타 서비스'; applyTemplate(firstService, g); }}
                        className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${formData.game === g ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-white/5 text-white/35 hover:bg-white/10 border border-white/8'}`}>
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/40 tracking-widest uppercase mb-3">서비스 유형</label>
                  <div className="flex flex-wrap gap-2">
                    {(SERVICE_TYPES[formData.game] || ALL_SERVICES).map(s => (
                      <button key={s} onClick={() => applyTemplate(s, formData.game)}
                        className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${formData.service === s ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-white/5 text-white/35 hover:bg-white/10 border border-white/8'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-white/40 tracking-widest uppercase mb-2">이름 (또는 닉네임)</label>
                    <input type="text" value={formData.author} onChange={e => setFormData({ ...formData, author: e.target.value })}
                      className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-white text-sm focus:border-amber-500/30 outline-none placeholder:text-white/20"
                      placeholder="예: 리니지매니아" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-white/40 tracking-widest uppercase mb-2">평점</label>
                    <div className="py-3"><StarRating rating={formData.rating} setRating={r => setFormData({ ...formData, rating: r })} /></div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/40 tracking-widest uppercase mb-2">상세 내용</label>
                  <textarea value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })}
                    className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-white text-sm h-44 resize-none focus:border-amber-500/30 outline-none placeholder:text-white/20 leading-relaxed"
                    placeholder="서비스 이용 후기를 자유롭게 작성해주세요." />
                </div>
                <button onClick={handleAddReview} className="w-full btn-luxury py-4 rounded-xl text-sm tracking-widest uppercase">후기 등록하기</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
}
