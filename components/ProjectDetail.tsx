
import React from 'react';
import { ProjectMindshare, Asset, NewsItem } from '../types';
import { MOCK_NEWS, MOCK_CAMPAIGNS, MOCK_ASSETS } from '../constants';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ProjectDetailProps {
  project: ProjectMindshare;
  onBack: () => void;
}

const generateFullChartData = () => {
  return Array.from({ length: 30 }, (_, i) => ({
    date: `05-${i + 1}`,
    value: Math.floor(Math.random() * 50) + 50 + (i * 2),
  }));
};

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  const chartData = generateFullChartData();
  
  // CoinNess Mock Data for integration in detail view
  const coinnessMockNews: NewsItem[] = [
    {
      id: 'cn-d1',
      title: `[속보] ${project.name}(${project.symbol}), 업비트 내 거래량 급증하며 시장 관심도 1위 기록`,
      source: 'CoinNess',
      summary: '실시간 시장 모니터링 결과 해당 자산의 매수세가 강하게 유입되고 있습니다.',
      link: 'https://coinness.com/',
      timestamp: '방금 전',
      relatedSymbol: project.symbol
    },
    {
      id: 'cn-d2',
      title: `분석 "BTC 강세 속 ${project.symbol} 고래 보유 비중 확대 중"`,
      source: 'CoinNess',
      summary: '온체인 데이터 분석 결과 주요 홀더들의 매집 정황이 포착되었습니다.',
      link: 'https://coinness.com/',
      timestamp: '1시간 전',
      relatedSymbol: project.symbol
    }
  ];

  // Combine MOCK_NEWS (Blockmedia) and CoinNess news for the specific project
  const combinedProjectNews = [
    ...MOCK_NEWS.filter(n => n.relatedSymbol === project.symbol),
    ...coinnessMockNews
  ].sort((a, b) => b.timestamp.localeCompare(a.timestamp)).slice(0, 5);

  const communityPosts = MOCK_NEWS.filter(n => n.relatedSymbol === project.symbol && n.isTrendingArticle).slice(0, 2);
  const relatedEvents = MOCK_CAMPAIGNS.filter(c => c.projectName.includes(project.name) || project.name.includes(c.projectName));
  
  // Find related asset for price information
  const assetInfo = MOCK_ASSETS.find(a => a.symbol === project.symbol);

  // Mock Leaderboard
  const leaderboard = [
    { rank: 1, id: 'giwa.king.88', tier: 4, points: '12,400' },
    { rank: 2, id: 'crypto.scholar', tier: 4, points: '10,150' },
    { rank: 3, id: 'maru.pioneer', tier: 3, points: '9,800' },
    { rank: 4, id: 'blue.whale', tier: 3, points: '8,200' },
  ];

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom duration-500 space-y-6 pb-20 md:pb-8">
      {/* Navigation Top Bar */}
      <div className="flex items-center justify-between sticky top-[64px] bg-slate-50/80 backdrop-blur-md py-2 z-40 -mx-4 px-4 border-b border-slate-200 md:static md:bg-transparent md:border-0 md:px-0">
        <button onClick={onBack} className="text-slate-500 hover:text-slate-900 flex items-center gap-2 font-bold transition-colors text-sm">
          ← 뒤로
        </button>
        <div className="flex items-center gap-2">
           <span className="text-xs font-black text-slate-400">UPBIT MARKET INTELLIGENCE</span>
           {project.isVerified && <span className="bg-blue-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">UPBIT LISTED</span>}
        </div>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8">
        {/* Main Analysis Section */}
        <div className="lg:col-span-8 space-y-6">
          <section className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            
            {/* TOKEN HEADER SECTION */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-50">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-xl md:text-2xl font-black shadow-inner overflow-hidden">
                  {project.logo}
                </div>
                <div className="flex flex-col">
                  <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-none mb-1">
                    {project.name}
                  </h1>
                  <p className="text-[11px] md:text-xs font-bold text-blue-600 uppercase tracking-widest">
                    {project.symbol} • 업비트 관심도 #{project.rank}
                  </p>
                </div>
              </div>

              {/* PRICE INFO SECTION */}
              {assetInfo && (
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-0.5">업비트 실시간 시세 (KRW)</p>
                  <p className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                    {assetInfo.valueKrw.toLocaleString()}원
                  </p>
                  <div className={`flex items-center justify-end gap-1 text-[11px] md:text-xs font-black ${assetInfo.changePercent >= 0 ? 'text-red-500' : 'text-blue-500'}`}>
                    <span>{assetInfo.changePercent >= 0 ? '▲' : '▼'}</span>
                    <span>{assetInfo.changeKrw.toLocaleString()}</span>
                    <span>({assetInfo.changePercent > 0 ? '+' : ''}{assetInfo.changePercent}%)</span>
                  </div>
                </div>
              )}
            </div>

            {/* Mindshare Chart */}
            <div className="mb-8">
              <div className="flex justify-between items-end mb-4">
                 <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">30일 한국 시장 점유율 변동</h3>
                 <span className={`text-sm font-black ${project.trend > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {project.trend > 0 ? '+' : ''}{project.trend}% (Upbit Vol)
                 </span>
              </div>
              <div className="h-[220px] md:h-[300px] w-full -mx-4 md:mx-0">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 9, fill: '#94a3b8'}} />
                    <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                      itemStyle={{ fontWeight: 'bold', color: '#2563eb' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* AI Research Summary */}
            <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100/50">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs">🤖</span>
                <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest">AI 시장 분석 요약</h4>
              </div>
              <p className="text-sm text-slate-700 font-bold leading-relaxed">
                {project.aiSummary} 업비트 원화 마켓 내 거래대금이 전일 대비 유의미하게 증가하며, 김치 프리미엄이 2.5% 수준에서 안정적으로 형성되고 있습니다.
              </p>
            </div>
          </section>

          {/* 주요 뉴스 섹션 - CoinNess & Blockmedia Integration */}
          <section className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                📰 {project.name} 주요 뉴스 & 속보
              </h3>
              <div className="flex gap-2">
                <span className="text-[10px] font-black text-slate-300">BLOCKMEDIA</span>
                <span className="text-[10px] font-black text-orange-400">COINNESS</span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {combinedProjectNews.length > 0 ? combinedProjectNews.map((news) => (
                <div 
                  key={news.id} 
                  onClick={() => handleExternalLink(news.link)}
                  className={`group cursor-pointer p-5 rounded-2xl transition-all border ${news.source === 'CoinNess' ? 'bg-orange-50/20 border-orange-100/50 hover:border-orange-300' : 'bg-slate-50 border-transparent hover:border-blue-100 hover:bg-white'} hover:shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter ${news.source === 'CoinNess' ? 'bg-orange-500 text-white' : 'bg-blue-600 text-white'}`}>
                        {news.source}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">{news.timestamp}</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-800 leading-snug group-hover:text-blue-600 transition-colors">
                      {news.title}
                    </h4>
                  </div>
                  <span className="hidden md:block text-slate-300 group-hover:text-blue-500 transition-colors text-xl">→</span>
                </div>
              )) : (
                <div className="text-center py-10 border-2 border-dashed border-slate-100 rounded-3xl">
                  <p className="text-sm font-bold text-slate-400">관련된 최신 뉴스가 없습니다.</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar Sections */}
        <div className="lg:col-span-4 space-y-6">
          <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-xs font-black text-slate-400 mb-5 uppercase tracking-widest">
              🏆 업비트 홀더 리더보드
            </h3>
            <div className="space-y-1">
              {leaderboard.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className={`w-5 text-xs font-black ${user.rank === 1 ? 'text-amber-500' : 'text-slate-300'}`}>0{user.rank}</span>
                    <div>
                      <p className="text-xs font-bold text-slate-800">{user.id}</p>
                      <p className="text-[9px] font-black text-blue-600 bg-blue-50 px-1.5 rounded inline-block">TIER {user.tier}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-slate-900">{user.points}</p>
                    <p className="text-[8px] text-slate-400 font-black uppercase tracking-tighter">REP SCORE</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl relative overflow-hidden">
            <h3 className="text-xs font-black text-slate-400 mb-5 uppercase tracking-widest relative z-10">
              🎁 참여 가능 이벤트
            </h3>
            <div className="space-y-4 relative z-10">
              {relatedEvents.length > 0 ? relatedEvents.map(event => (
                <div key={event.id} className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-black text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded uppercase tracking-widest">{event.rewardType}</span>
                    <span className="text-[10px] font-black text-slate-500">{event.deadlineDDay}</span>
                  </div>
                  <h4 className="text-sm font-bold mb-4 line-clamp-2 leading-snug">{event.title}</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold text-slate-400 uppercase">티어 {event.requiredTier} 이상</span>
                    <button className="text-[10px] font-black bg-blue-600 px-4 py-2 rounded-xl hover:bg-blue-500 transition-colors shadow-lg">참여</button>
                  </div>
                </div>
              )) : (
                <div className="text-center py-6 opacity-40">
                  <p className="text-xs font-bold">현재 진행 중인 이벤트 없음</p>
                </div>
              )}
            </div>
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-blue-600/10 rounded-full blur-[40px]"></div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
