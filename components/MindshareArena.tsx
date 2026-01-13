
import React, { useState, useEffect } from 'react';
import { MOCK_MINDSHARE } from '../constants';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import ProjectDetail from './ProjectDetail';
import { ProjectMindshare } from '../types';

const generateMockChartData = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    value: Math.random() * 100 + 50,
  }));
};

interface ArenaCardProps {
  item: ProjectMindshare;
  isLarge?: boolean;
  onClick: () => void;
  mentionCount: number;
}

const ArenaCard: React.FC<ArenaCardProps> = ({ item, isLarge = false, onClick, mentionCount }) => {
  const chartData = generateMockChartData();
  const color = item.trend > 0 ? '#f97316' : '#3b82f6';
  const bgColor = 'bg-white';
  const borderColor = 'border-slate-100';

  return (
    <div 
      onClick={onClick}
      className={`relative overflow-hidden rounded-3xl border ${borderColor} ${bgColor} p-5 flex flex-col justify-between shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer group ${isLarge ? 'col-span-2 row-span-2 min-h-[320px]' : 'h-[160px]'}`}
    >
      <div className="relative z-10 flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-8 h-8 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-[10px] font-black shadow-lg uppercase`}>
              {item.logo}
            </div>
            <h4 className={`font-black text-slate-900 uppercase tracking-tight group-hover:text-blue-600 transition-colors ${isLarge ? 'text-xl' : 'text-sm'}`}>
              {item.name}
            </h4>
          </div>
          <div className="flex flex-col mt-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">실시간 관심도</p>
            <p className={`${isLarge ? 'text-2xl' : 'text-lg'} font-black text-slate-900`}>
                {mentionCount.toLocaleString()}
                <span className="text-[10px] ml-1 text-slate-400">Pts</span>
            </p>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-0 pointer-events-none opacity-20 h-1/3">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <Area type="monotone" dataKey="value" stroke={color} strokeWidth={3} fill={color} fillOpacity={0.2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      {isLarge && (
        <div className="relative z-10 mt-auto">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-[10px] text-slate-500 font-bold mb-1">시장 데이터 분석</p>
            <p className="text-xs text-slate-800 font-black leading-snug line-clamp-2">"거래대금 상위권 유지 중", "원화 마켓 내 개인 투자자 관심 집중"</p>
          </div>
        </div>
      )}
    </div>
  );
};

const MindshareArena: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectMindshare | null>(null);
  const [mobileTab, setMobileTab] = useState<'post' | 'pre'>('post');
  
  const preTGE = [
    { ...MOCK_MINDSHARE[0], mentionCount: 12450 },
    { ...MOCK_MINDSHARE[1], mentionCount: 8900 },
    { ...MOCK_MINDSHARE[3], mentionCount: 4200 },
    { ...MOCK_MINDSHARE[4], mentionCount: 3100 },
  ];

  const postTGE = [
    { symbol: 'BTC', name: 'Bitcoin', logo: 'B', rank: 1, trend: 5.2, isVerified: true, aiSummary: '디지털 금으로 불리는 시장 대장주.', mentionCount: 245000 },
    { symbol: 'ETH', name: 'Ethereum', logo: 'E', rank: 2, trend: 3.1, isVerified: true, aiSummary: '스마트 컨트랙트 플랫폼의 표준.', mentionCount: 128000 },
    { symbol: 'XRP', name: 'Ripple', logo: 'X', rank: 3, trend: 15.4, isVerified: true, aiSummary: '국내 투자자들의 강력한 팬덤을 보유한 결제 솔루션.', mentionCount: 98400 },
    { symbol: 'SOL', name: 'Solana', logo: 'S', rank: 4, trend: 12.8, isVerified: true, aiSummary: '고성능 레이어 1 프로젝트로 생태계 확장 중.', mentionCount: 84000 },
    { symbol: 'DOGE', name: 'Dogecoin', logo: 'D', rank: 5, trend: -2.1, isVerified: true, aiSummary: '대표적인 밈 코인으로 높은 거래량 유지.', mentionCount: 72000 },
  ];

  if (selectedProject) {
    return <ProjectDetail project={selectedProject} onBack={() => setSelectedProject(null)} />;
  }

  const PreSection = () => (
    <section className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
          🚀 Pre-TGE
        </h3>
        <span className="text-[10px] font-bold text-slate-400 italic">Community Mindshare Based</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ArenaCard item={preTGE[0]} mentionCount={preTGE[0].mentionCount} isLarge={true} onClick={() => setSelectedProject(preTGE[0])} />
        {preTGE.slice(1).map((item) => (
          <ArenaCard key={item.symbol} item={item} mentionCount={item.mentionCount} onClick={() => setSelectedProject(item)} />
        ))}
      </div>
    </section>
  );

  const PostSection = () => (
    <section className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
          📊 Post-TGE
        </h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {postTGE.map((item, idx) => (
          <ArenaCard 
            key={item.symbol} 
            item={item as any} 
            isLarge={idx === 0}
            mentionCount={(item as any).mentionCount} 
            onClick={() => setSelectedProject(item as any)} 
          />
        ))}
      </div>
    </section>
  );

  return (
    <div className="space-y-8 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
             지금 <span className="text-blue-600 italic underline decoration-blue-200 decoration-4 underline-offset-4">주목받는 코인</span>
          </h2>
        </div>
        
        <div className="flex md:hidden w-full bg-slate-100 p-1 rounded-2xl">
          <button 
            onClick={() => setMobileTab('post')}
            className={`flex-1 py-2 text-xs font-black rounded-xl transition-all ${mobileTab === 'post' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}
          >
            Post-TGE
          </button>
          <button 
            onClick={() => setMobileTab('pre')}
            className={`flex-1 py-2 text-xs font-black rounded-xl transition-all ${mobileTab === 'pre' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}
          >
            Pre-TGE
          </button>
        </div>
      </header>

      <div className="hidden md:grid md:grid-cols-1 gap-12">
        <PostSection />
        <PreSection />
      </div>

      <div className="md:hidden">
        {mobileTab === 'pre' ? <PreSection /> : <PostSection />}
      </div>

      <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
         <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center text-2xl border border-blue-500/20 shadow-inner">⚡</div>
            <div>
               <h4 className="text-lg font-black mb-1">Smart Monitoring</h4>
               <p className="text-sm text-slate-400 font-medium">실시간 매수 심리와 코인 커뮤니티 언급량을 가공하여 제공합니다.</p>
            </div>
         </div>
         <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]"></div>
      </div>
    </div>
  );
};

export default MindshareArena;
