
import { User, Asset, NewsItem, ProjectMindshare, Campaign } from './types';

export const MOCK_USER: User = {
  maruId: "maru.user.77",
  isVerified: true,
  tier: 3,
  lastActivity: "2024-05-22 14:30"
};

export const MOCK_ASSETS: Asset[] = [
  { 
    id: '1', name: '이더리움', symbol: 'ETH', balance: 2.5, 
    valueKrw: 12500000, valueUsd: 9125, 
    changeKrw: 2214923, changePercent: 7.3,
    logoColor: 'bg-slate-800'
  },
  { 
    id: '2', name: 'GIWA 토큰', symbol: 'GIWA', balance: 1500, 
    valueKrw: 3000000, valueUsd: 2190, 
    changeKrw: 1140006, changePercent: 64.9,
    logoColor: 'bg-blue-600'
  },
  { 
    id: '3', name: '테더', symbol: 'USDT', balance: 500, 
    valueKrw: 685000, valueUsd: 500, 
    changeKrw: -408571, changePercent: -2.0,
    logoColor: 'bg-green-500'
  },
];

export const MOCK_NEWS: NewsItem[] = [
  {
    id: 'n1',
    relatedSymbol: 'KOSPI',
    title: '[속보] 코스피 장중 급등… 외인·기관 동반 매수에 2700선 탈환 시도',
    source: '블록미디어',
    summary: '코스피 지수가 외국인과 기관의 강력한 매수세에 힘입어 전일 하락분을 회복하며 급등하고 있습니다.',
    link: 'https://www.blockmedia.co.kr/',
    timestamp: '방금 전'
  },
  {
    id: 'n2',
    relatedSymbol: 'KORBIT',
    title: '가상자산 이용자보호법 시행령 개정안 국무회의 통과',
    source: '블록미디어',
    summary: '이용자 자산 보호와 불공정 거래 행위 규제를 골자로 하는 시행령 개정안이 통과되었습니다.',
    link: 'https://www.blockmedia.co.kr/',
    timestamp: '15분 전'
  },
  {
    id: 'n3',
    relatedSymbol: 'BTC',
    title: '비트코인, $95K 저항선 돌파 시도… 숏 스퀴즈 가능성 제기',
    source: '블록미디어',
    summary: '주요 저항선인 95,000달러를 앞두고 대규모 청산 물량이 포착되며 변동성이 커지고 있습니다.',
    link: 'https://www.blockmedia.co.kr/',
    timestamp: '1시간 전',
    isTrendingArticle: true
  },
  {
    id: 'n4',
    relatedSymbol: 'BTC',
    title: '블랙록 IBIT, 하루 유입액 역대 최고치 경신… 기관 매집 가속',
    source: '블록미디어',
    summary: '비트코인 현물 ETF로의 자금 유입이 멈추지 않고 있습니다. 블랙록의 IBIT가 시장을 주도하고 있습니다.',
    link: 'https://www.blockmedia.co.kr/',
    timestamp: '2시간 전',
    isTrendingArticle: true
  }
];

export const MOCK_MINDSHARE: ProjectMindshare[] = [
  { rank: 1, name: 'GIWA Finance', symbol: 'GIWA', logo: 'G', trend: 15.2, isVerified: true, aiSummary: '국내 최초 평판 기반 디파이 프로토콜로 사용자 참여도가 급증하고 있습니다.' },
  { rank: 2, name: 'Hanul Network', symbol: 'HAN', logo: 'H', trend: 8.4, isVerified: true, aiSummary: '레이어 2 솔루션 중 가장 빠른 TPS와 로컬 파트너십을 보유하고 있습니다.' },
  { rank: 3, name: 'Dojang ID', symbol: 'DOJ', logo: 'D', trend: -2.1, isVerified: true, aiSummary: '인증 시스템 고도화로 인해 기존 사용자들의 스테이킹 전환이 활발합니다.' },
  { rank: 4, name: 'Goryeo Vault', symbol: 'GOR', logo: 'V', trend: 4.5, isVerified: false, aiSummary: '자산 보관 솔루션으로 커뮤니티 내 보안성 평가가 긍정적입니다.' },
  { rank: 5, name: 'Seoul Bridge', symbol: 'SEO', logo: 'S', trend: 0.8, isVerified: true, aiSummary: '체인간 자산 이동 편의성 개선으로 거래량이 꾸준히 증가하고 있습니다.' }
];

export const MOCK_CAMPAIGNS: Campaign[] = [
  { 
    id: 'c1', 
    projectName: 'GIWA Swap', 
    chainName: 'GIWA Chain',
    title: 'GIWA Swap 유동성 공급 캠페인',
    isVerified: true, 
    rewardType: '보상',
    rewardDetail: '100,000 GIWA 토큰 풀',
    requiredTier: 2, 
    participants: 1234,
    maxParticipants: 5000,
    deadline: '2025.05.30',
    deadlineDDay: 'D-8',
    progress: 25,
    steps: [
        'GIWA Swap에 접속',
        '최소 $100 상당의 유동성 공급',
        '7일간 유동성 유지',
        '캠페인 종료 후 보상 자동 지급'
    ],
    description: 'GIWA Swap에 유동성을 공급하고 보상을 받으세요. Tier 2 이상 사용자만 참여 가능합니다.' 
  },
  { 
    id: 'c2', 
    projectName: 'Polygon', 
    chainName: 'Polygon',
    title: 'Polygon zkEVM 테스트넷 참여 이벤트',
    isVerified: true, 
    rewardType: '보상',
    rewardDetail: 'NFT 뱃지 + 에어드랍 가능성',
    requiredTier: 1, 
    participants: 3421,
    maxParticipants: 10000,
    deadline: '2025.06.10',
    deadlineDDay: 'D-19',
    progress: 34,
    steps: [
        'zkEVM 테스트넷 월렛 연결',
        '5개 이상의 DApp 상호작용',
        '피드백 설문 작성',
        '참여 증명 NFT 민팅'
    ],
    description: 'Polygon zkEVM 테스트넷에서 다양한 DApp을 테스트하고 피드백을 제공하세요.' 
  }
];
