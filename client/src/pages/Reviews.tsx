import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Star, MessageCircle, Plus, X, Trash2, ShieldCheck, LogOut } from 'lucide-react';

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  content: string;
  service: string;
}

const StarRating = ({ rating, setRating }: { rating: number, setRating?: (r: number) => void }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          onClick={() => setRating && setRating(i + 1)}
          className={`w-5 h-5 ${
            i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'
          } ${setRating ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
        />
      ))}
    </div>
  );
};

export default function ReviewsPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [reviewList, setReviewList] = useState<Review[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  
  // Load reviews and admin status from localStorage on mount
  useEffect(() => {
    const savedReviews = localStorage.getItem('giranteam_reviews');
    if (savedReviews) {
      setReviewList(JSON.parse(savedReviews));
    }
    
    const savedAdmin = localStorage.getItem('giranteam_is_admin');
    if (savedAdmin === 'true') {
      setIsAdmin(true);
    }
  }, []);

  // Save reviews to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('giranteam_reviews', JSON.stringify(reviewList));
  }, [reviewList]);

  const [formData, setFormData] = useState({
    author: '',
    rating: 5,
    content: '',
    service: '리니지 클래식 대리'
  });

  // Admin Login Logic
  const handleAdminLogin = () => {
    // 임시 관리자 비밀번호: giranteam123
    if (adminPassword === 'giranteam123') {
      setIsAdmin(true);
      localStorage.setItem('giranteam_is_admin', 'true');
      setShowAdminLogin(false);
      setAdminPassword('');
      alert('관리자 모드로 전환되었습니다.');
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('giranteam_is_admin');
    alert('로그아웃 되었습니다.');
  };

  // Auto-template for the content
  const applyTemplate = (serviceType: string) => {
    const templates: Record<string, string> = {
      '리니지 클래식 대리': '[리니지 클래식 대리 후기]\n\n이용 서버: \n작성 내용: 정말 안전하고 빠르게 작업해주셨습니다. 특히 소통이 잘 되어서 믿고 맡길 수 있었어요. 다음에 또 이용하겠습니다!',
      '리니지 육성 대리': '[리니지 육성 대리 후기]\n\n목표 레벨: \n작성 내용: 번거로운 육성 과정을 대신해주셔서 정말 편했습니다. 보안도 철저하고 진행 상황도 매일 알려주셔서 안심되었습니다.',
      '기타 서비스': '[기타 서비스 이용 후기]\n\n이용 내용: \n작성 내용: 친절한 상담과 확실한 작업 처리에 감동받았습니다. 추천합니다!'
    };
    setFormData(prev => ({ ...prev, service: serviceType, content: templates[serviceType] || templates['리니지 클래식 대리'] }));
  };

  const handleAddReview = () => {
    if (formData.author && formData.content) {
      const newReview: Review = {
        id: Date.now(),
        author: formData.author,
        rating: formData.rating,
        date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }),
        content: formData.content,
        service: formData.service
      };
      setReviewList([newReview, ...reviewList]);
      setFormData({ author: '', rating: 5, content: '', service: '리니지 클래식 대리' });
      setShowForm(false);
      alert('후기가 성공적으로 등록되었습니다.');
    } else {
      alert('이름과 내용을 입력해주세요.');
    }
  };

  const deleteReview = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAdmin) {
      alert('관리자만 삭제할 수 있습니다.');
      return;
    }
    if (window.confirm('이 후기를 삭제하시겠습니까?')) {
      setReviewList(reviewList.filter(r => r.id !== id));
    }
  };

  const averageRating = reviewList.length > 0 
    ? (reviewList.reduce((sum, r) => sum + r.rating, 0) / reviewList.length).toFixed(1)
    : "5.0";

  return (
    <Layout>
      {/* Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "Product",
          "name": "리니지대리 서비스",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": averageRating,
            "reviewCount": reviewList.length || 1
          }
        })}
      </script>

      <div className="pt-20 pb-12">
        <section className="py-16 bg-gradient-to-b from-primary/10 to-transparent border-b border-white/5">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">고객 후기</h1>
            <p className="text-muted-foreground text-lg mb-8">리니지 대리 및 리니지 클래식 대리 이용 고객님들의 실제 후기입니다.</p>
            <div className="flex flex-col items-center gap-4">
              <div className="text-5xl font-bold text-primary">{averageRating}</div>
              <StarRating rating={Math.round(Number(averageRating))} />
              <p className="text-muted-foreground">총 {reviewList.length}개의 후기</p>
            </div>
          </div>
        </section>

        <section className="py-8 border-b border-white/5">
          <div className="container mx-auto px-4 max-w-4xl flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold text-white">전체 후기</h2>
              {isAdmin ? (
                <div className="flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/30">
                  <ShieldCheck className="w-3 h-3" />
                  관리자 모드
                </div>
              ) : (
                <button 
                  onClick={() => setShowAdminLogin(true)}
                  className="text-xs text-gray-500 hover:text-gray-400 underline"
                >
                  관리자 로그인
                </button>
              )}
            </div>
            <div className="flex gap-3">
              {isAdmin && (
                <button
                  onClick={handleAdminLogout}
                  className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-gray-400 px-4 py-2 rounded-lg transition-all text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  로그아웃
                </button>
              )}
              <button
                onClick={() => {
                  setShowForm(true);
                  applyTemplate('리니지 클래식 대리');
                }}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-black font-bold px-6 py-2 rounded-lg transition-all"
              >
                <Plus className="w-5 h-5" />
                후기 작성하기
              </button>
            </div>
          </div>
        </section>

        {/* Admin Login Modal */}
        {showAdminLogin && (
          <div className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4">
            <div className="bg-background rounded-2xl border border-white/10 p-8 max-w-sm w-full">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <ShieldCheck className="text-primary" />
                관리자 인증
              </h3>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white mb-4 focus:border-primary outline-none"
                placeholder="비밀번호를 입력하세요"
                autoFocus
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAdminLogin(false)}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-xl transition-all"
                >
                  취소
                </button>
                <button
                  onClick={handleAdminLogin}
                  className="flex-1 bg-primary hover:bg-primary/90 text-black font-bold py-3 rounded-xl transition-all"
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Review Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-background rounded-2xl border border-white/10 p-6 md:p-8 max-w-2xl w-full my-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">후기 작성</h3>
                <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">서비스 선택 (자동 양식 적용)</label>
                  <div className="flex flex-wrap gap-2">
                    {['리니지 클래식 대리', '리니지 육성 대리', '기타 서비스'].map(s => (
                      <button
                        key={s}
                        onClick={() => applyTemplate(s)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          formData.service === s ? 'bg-primary text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">이름 (또는 닉네임)</label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData({...formData, author: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary outline-none"
                      placeholder="예: 리니지매니아"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">평점</label>
                    <div className="py-2">
                      <StarRating rating={formData.rating} setRating={(r) => setFormData({...formData, rating: r})} />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">상세 내용</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white h-48 resize-none focus:border-primary outline-none"
                  />
                </div>

                <button
                  onClick={handleAddReview}
                  className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-xl text-lg transition-all"
                >
                  후기 등록하기
                </button>
              </div>
            </div>
          </div>
        )}

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl space-y-6">
            {reviewList.length === 0 ? (
              <div className="text-center py-20 bg-white/5 border border-dashed border-white/10 rounded-2xl">
                <MessageCircle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-muted-foreground">아직 등록된 후기가 없습니다. 첫 후기를 남겨주세요!</p>
              </div>
            ) : (
              reviewList.map(review => (
                <div
                  key={review.id}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-all cursor-pointer relative group"
                  onClick={() => setExpandedId(expandedId === review.id ? null : review.id)}
                >
                  {/* Delete button only visible for admin */}
                  {isAdmin && (
                    <button
                      onClick={(e) => deleteReview(review.id, e)}
                      className="absolute top-4 right-4 p-2 text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      title="삭제"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                        {review.author[0]}
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg">{review.author}</h4>
                        <p className="text-sm text-muted-foreground">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-2">
                      <StarRating rating={review.rating} />
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20">
                        {review.service}
                      </span>
                    </div>
                  </div>

                  <p className={`text-gray-300 leading-relaxed whitespace-pre-wrap ${expandedId === review.id ? '' : 'line-clamp-3'}`}>
                    {review.content}
                  </p>
                  
                  {!expandedId && review.content.length > 150 && (
                    <button className="mt-4 text-primary text-sm font-bold">더 보기...</button>
                  )}
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
}
