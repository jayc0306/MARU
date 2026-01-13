
export type ReputationTier = 0 | 1 | 2 | 3 | 4;

export interface User {
  maruId: string;
  isVerified: boolean;
  tier: ReputationTier;
  lastActivity: string;
}

export interface EximExchangeRate {
  result: number;        // 조회 결과 (1: 성공)
  cur_unit: string;     // 통화코드
  cur_nm: string;       // 국가/통화명
  ttb: string;          // 전신환(송금) 받으실때
  tts: string;          // 전신환(송금) 보내실때
  deal_bas_r: string;   // 매매 기준율
  bkpr: string;         // 장부가격
  yy_efee_r: string;    // 년환가료율
  ten_dd_efee_r: string; // 10일환가료율
  kftc_deal_bas_r: string; // 서울외국환중개 매매기준율
  kftc_bkpr: string;    // 서울외국환중개 장부가격
}

export interface Asset {
  id: string;
  name: string;
  symbol: string;
  balance: number;
  valueKrw: number;
  valueUsd: number;
  changeKrw: number;
  changePercent: number;
  logoColor: string;
  eximRate?: EximExchangeRate; // 한국수출입은행 실시간 환율 정보 연동
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  summary: string;
  link: string;
  timestamp: string;
  relatedSymbol: string;
  isTrendingArticle?: boolean;
}

export interface ProjectMindshare {
  rank: number;
  name: string;
  symbol: string;
  logo: string;
  trend: number;
  isVerified: boolean;
  aiSummary: string;
}

export interface Campaign {
  id: string;
  projectName: string;
  chainName: string;
  title: string;
  isVerified: boolean;
  rewardType: string;
  rewardDetail: string;
  requiredTier: ReputationTier;
  participants: number;
  maxParticipants: number;
  deadline: string;
  deadlineDDay: string;
  progress: number;
  steps: string[];
  description: string;
}
