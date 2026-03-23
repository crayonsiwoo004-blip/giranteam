/**
 * SEO 유틸리티 - 페이지별 메타 태그 동적 설정
 */

interface SEOMeta {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
}

const BASE_URL = 'https://giranteam.onrender.com';

export function updatePageMeta(meta: SEOMeta) {
  // Title
  document.title = meta.title;

  // Description
  const descTag = document.querySelector('meta[name="description"]');
  if (descTag) descTag.setAttribute('content', meta.description);

  // Keywords
  if (meta.keywords) {
    const kwTag = document.querySelector('meta[name="keywords"]');
    if (kwTag) kwTag.setAttribute('content', meta.keywords);
  }

  // Canonical
  if (meta.canonical) {
    const canonTag = document.querySelector('link[rel="canonical"]');
    if (canonTag) canonTag.setAttribute('href', meta.canonical);
  }

  // Open Graph
  const ogTitleTag = document.querySelector('meta[property="og:title"]');
  if (ogTitleTag) ogTitleTag.setAttribute('content', meta.ogTitle || meta.title);

  const ogDescTag = document.querySelector('meta[property="og:description"]');
  if (ogDescTag) ogDescTag.setAttribute('content', meta.ogDescription || meta.description);

  const ogUrlTag = document.querySelector('meta[property="og:url"]');
  if (ogUrlTag && meta.canonical) ogUrlTag.setAttribute('content', meta.canonical);
}

// 페이지별 SEO 데이터
export const PAGE_SEO: Record<string, SEOMeta> = {
  home: {
    title: '리니지 학교 | 기란팀 리니지 클래식 대리 육성 전문 | 100% 수작업',
    description: '리니지 학교(기란팀)는 리니지 클래식 전문 대리 육성 및 부주 서비스입니다. 100% 수작업 보장, 24시간 실시간 상담, 안전한 보안 시스템을 제공합니다. 리니지 대리, 리니지 클래식 대리, 리니지 부주, 리니지 클래식 부주 전문.',
    keywords: '리니지 학교, 기란팀, 리니지 대리, 리니지 클래식 대리, 리니지 육성, 리니지 부주, 리니지 클래식 부주, 리니지 클래식 육성, 게임 대리, 리니지 대리 가격, 리니지 클래식 부주 가격, 리니지학교',
    canonical: BASE_URL,
  },
  services: {
    title: '리니지 대리 이용요금 | 리니지 클래식 대리·부주 가격 안내 | 기란팀',
    description: '리니지 학교(기란팀)의 리니지 클래식 대리 육성 및 부주 서비스 이용요금을 안내합니다. 시간별 패키지, 100% 수작업 보장, 투명한 가격 정책. 리니지 대리 가격, 리니지 클래식 부주 가격을 확인하세요.',
    keywords: '리니지 대리 가격, 리니지 클래식 대리 가격, 리니지 부주 가격, 리니지 클래식 부주 가격, 리니지 대리 이용요금, 기란팀 요금, 리니지 학교 가격',
    canonical: `${BASE_URL}/items`,
    ogTitle: '리니지 대리 이용요금 안내 | 기란팀',
    ogDescription: '리니지 클래식 대리·부주 서비스 이용요금을 확인하세요. 시간별 패키지, 100% 수작업 보장.',
  },
  reviews: {
    title: '리니지 대리 후기 | 리니지 클래식 대리 이용 후기 | 기란팀 리뷰',
    description: '리니지 학교(기란팀) 리니지 클래식 대리 서비스를 이용한 고객님들의 실제 후기입니다. 리니지 대리 후기, 리니지 클래식 대리 후기를 확인하고 안심하고 이용하세요.',
    keywords: '리니지 대리 후기, 리니지 클래식 대리 후기, 기란팀 후기, 리니지 학교 후기, 리니지 대리 리뷰, 리니지 클래식 부주 후기',
    canonical: `${BASE_URL}/about`,
    ogTitle: '리니지 대리 후기 | 기란팀 고객 리뷰',
    ogDescription: '기란팀 리니지 클래식 대리 서비스를 이용한 고객님들의 실제 후기를 확인하세요.',
  },
  faq: {
    title: '리니지 대리 FAQ | 리니지 클래식 대리·부주 자주 묻는 질문 | 기란팀',
    description: '리니지 학교(기란팀) 리니지 대리 서비스에 대한 자주 묻는 질문입니다. 결제 방법, 계정 보안, 환불 규정 등 리니지 클래식 대리 및 부주 서비스 관련 궁금증을 해결하세요.',
    keywords: '리니지 대리 FAQ, 리니지 클래식 대리 질문, 리니지 대리 결제, 리니지 대리 환불, 리니지 대리 계정 보안, 기란팀 FAQ',
    canonical: `${BASE_URL}/qna`,
    ogTitle: '리니지 대리 FAQ | 기란팀 자주 묻는 질문',
    ogDescription: '리니지 클래식 대리·부주 서비스에 대한 자주 묻는 질문과 답변을 확인하세요.',
  },
  recruitment: {
    title: '기사 모집 | 리니지 학교(기란팀) 리니지 클래식 대리 전문 파트너 채용',
    description: '리니지 학교(기란팀)에서 리니지 클래식 대리 전문 기사를 모집합니다. 안정적인 수익, 자유로운 업무 환경, 전문 교육 프로그램을 제공합니다.',
    keywords: '리니지 대리 기사 모집, 리니지 클래식 대리 채용, 기란팀 채용, 리니지 학교 모집, 게임 대리 구인',
    canonical: `${BASE_URL}/recruitment`,
    ogTitle: '기사 모집 | 기란팀 리니지 클래식 대리 파트너 채용',
    ogDescription: '리니지 학교(기란팀)에서 리니지 클래식 대리 전문 기사를 모집합니다.',
  },
};
