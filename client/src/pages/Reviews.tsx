import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Star, MessageCircle, Plus, X } from 'lucide-react';

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  content: string;
  service: string;
}

const initialReviews: Review[] = [
  {
    id: 1,
    author: '사용자A',
    rating: 5,
    date: '2024년 1월 15일',
    content: '정말 안전하고 신뢰할 수 있는 서비스였습니다. 작업 중간중간 진행 상황을 자세히 알려주셔서 마음 놓고 맡길 수 있었어요. 강력 추천합니다!',
    service: '120시간 레벨업'
  },
  {
    id: 2,
    author: '사용자B',
    rating: 5,
    date: '2024년 1월 12일',
    content: '카카오톡으로 실시간 소통이 가능해서 정말 좋았습니다. 작업 완료 후 계정을 깔끔하게 반환해주셨고, 보안도 철저히 지켜주셨어요.',
    service: '11시간 사냥'
  },
  {
    id: 3,
    author: '사용자C',
    rating: 5,
    date: '2024년 1월 10일',
    content: '처음 이용했는데 생각보다 훨씬 전문적이었습니다. 계약 과정도 투명하고, 작업 중 문제가 생겼을 때도 빠르게 대처해주셨어요.',
    service: '15시간 던전'
  },
  {
    id: 4,
    author: '사용자D',
    rating: 5,
    date: '2024년 1월 8일',
    content: '여러 번 이용했는데 매번 만족스럽습니다. 기사님들이 정말 친절하고 전문적이에요. 리니지 대리는 정말 믿을 수 있는 서비스입니다.',
    service: '120시간 레벨업'
  },
  {
    id: 5,
    author: '사용자E',
    rating: 5,
    date: '2024년 1월 5일',
    content: '계정 보안에 대해 정말 신경 써주셨습니다. 이중 인증도 설정해주시고, 작업 완료 후 비밀번호 변경을 권장해주셔서 정말 안심이 됩니다.',
    service: '11시간 사냥'
  },
  {
    id: 6,
    author: '사용자F',
    rating: 5,
    date: '2024년 1월 1일',
    content: '가격도 합리적이고, 서비스 품질도 정말 좋습니다. 다른 대리 서비스와는 다르게 정말 투명하게 진행되었어요. 계속 이용할 예정입니다!',
    service: '15시간 던전'
  }
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'
          }`}
        />
      ))}
    </div>
  );
};

export default function ReviewsPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [reviewList, setReviewList] = useState(initialReviews);
  const [formData, setFormData] = useState({
    author: '',
    rating: 5,
    content: '',
    service: ''
  });
  
  const averageRating = (reviewList.reduce((sum, r) => sum + r.rating, 0) / reviewList.length).toFixed(1);

  const handleAdminLogin = () => {
    if (adminPassword === 'admin123') {
      setIsAdmin(true);
      setShowForm(false);
      setAdminPassword('');
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  const handleAddReview = () => {
    if (formData.author && formData.content && formData.service) {
      const newReview: Review = {
        id: Math.max(...reviewList.map(r => r.id), 0) + 1,
        author: formData.author,
        rating: formData.rating,
        date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }).replace(/\s/g, '년 ').replace(/년\s*$/, '일'),
        content: formData.content,
        service: formData.service
      };
      setReviewList([newReview, ...reviewList]);
      setFormData({ author: '', rating: 5, content: '', service: '' });
      setIsAdmin(false);
      alert('후기가 추가되었습니다.');
    } else {
      alert('모든 필드를 입력해주세요.');
    }
  };

  return (
    <Layout>
      <div className="pt-20 pb-12">
        {/* Header */}
        <section className="py-16 bg-gradient-to-b from-primary/10 to-transparent border-b border-white/5">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">고객 후기</h1>
              <p className="text-muted-foreground text-lg mb-8">리니지대리를 이용하신 고객님들의 생생한 후기를 확인해보세요</p>

              {/* Rating Summary */}
              <div className="flex flex-col items-center gap-4">
                <div className="text-5xl font-bold text-primary">{averageRating}</div>
                <div className="flex gap-2">
                  <StarRating rating={5} />
                </div>
                <p className="text-muted-foreground">총 {reviewList.length}개의 후기</p>
              </div>
            </div>
          </div>
        </section>

        {/* Admin Button */}
        <section className="py-8 border-b border-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto flex justify-end">
              {!isAdmin ? (
                <button
                  onClick={() => setShowForm(true)}
                  className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-black font-bold px-6 py-2 rounded-lg transition-all"
                >
                  <Plus className="w-5 h-5" />
                  글쓰기
                </button>
              ) : (
                <button
                  onClick={() => setIsAdmin(false)}
                  className="text-muted-foreground hover:text-white transition-colors text-sm"
                >
                  관리자 모드 종료
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Admin Login Modal */}
        {showForm && !isAdmin && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-background rounded-2xl border border-white/10 p-8 max-w-md w-full animate-in fade-in">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">관리자 인증</h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-muted-foreground hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <input
                type="password"
                placeholder="관리자 비밀번호"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-muted-foreground mb-4"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAdminLogin}
                  className="flex-1 bg-primary hover:bg-primary/90 text-black font-bold py-2 rounded-lg transition-all"
                >
                  확인
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-2 rounded-lg transition-all"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Review Form */}
        {isAdmin && (
          <section className="py-8 bg-white/5 border-b border-white/5">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">새 후기 추가</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="작성자 이름"
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-muted-foreground"
                  />
                  <input
                    type="text"
                    placeholder="서비스 (예: 120시간 레벨업)"
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-muted-foreground"
                  />
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5.0)</option>
                    <option value={4}>⭐⭐⭐⭐ (4.0)</option>
                    <option value={3}>⭐⭐⭐ (3.0)</option>
                  </select>
                  <textarea
                    placeholder="후기 내용"
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-muted-foreground h-24 resize-none"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddReview}
                      className="flex-1 bg-primary hover:bg-primary/90 text-black font-bold py-2 rounded-lg transition-all"
                    >
                      추가
                    </button>
                    <button
                      onClick={() => setIsAdmin(false)}
                      className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-2 rounded-lg transition-all"
                    >
                      취소
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Reviews Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-4">
              {reviewList.map(review => (
                <div
                  key={review.id}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all cursor-pointer"
                  onClick={() => setExpandedId(expandedId === review.id ? null : review.id)}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-primary font-bold">{review.author[review.author.length - 1]}</span>
                        </div>
                        <div>
                          <p className="font-bold text-white">{review.author}</p>
                          <p className="text-sm text-muted-foreground">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <StarRating rating={review.rating} />
                        <span className="text-sm text-muted-foreground">({review.rating}.0)</span>
                      </div>
                      <div className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full">
                        {review.service}
                      </div>
                    </div>
                    <MessageCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  </div>

                  {/* Review Content */}
                  <p className="text-gray-300 leading-relaxed line-clamp-2">{review.content}</p>

                  {/* Expanded Content */}
                  {expandedId === review.id && (
                    <div className="mt-4 pt-4 border-t border-white/10 animate-in fade-in slide-in-from-top-2 duration-300">
                      <p className="text-gray-300 leading-relaxed">{review.content}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-black/50 border-t border-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-4">당신의 경험을 공유해주세요</h2>
              <p className="text-muted-foreground mb-8">
                리니지대리 서비스를 이용하신 후기를 남겨주시면, 다른 고객님들에게 큰 도움이 됩니다.
              </p>
              <a
                href="https://open.kakao.com/o/lineage_proxy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary hover:bg-primary/90 text-black font-bold px-8 py-3 rounded-full transition-all hover:shadow-lg shadow-primary/20"
              >
                카카오톡으로 후기 남기기
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
