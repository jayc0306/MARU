
import React, { useState, useEffect } from 'react';
import { MOCK_ASSETS, MOCK_NEWS, MOCK_MINDSHARE, MOCK_USER, MOCK_CAMPAIGNS } from '../constants';
import { Asset, ProjectMindshare, EximExchangeRate } from '../types';
import ProjectDetail from './ProjectDetail';

const Dashboard: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const [currency, setCurrency] = useState<'KRW' | 'USD'>('KRW');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [focusedProject, setFocusedProject] = useState<ProjectMindshare | null>(null);
  const [fxRates, setFxRates] = useState<Record<string, EximExchangeRate>>({});

  useEffect(() => {
    const fetchFxRates = async () => {
      // 한국수출입은행 API 응답 규격에 맞춘 Mock 데이터
      // 현재 시장 상황을 반영하여 1,450원대로 조정
      const mockEximResponse: EximExchangeRate[] = [
        {
          result: 1,
          cur_unit: "USD",
          ttb: "1,442.10",
          tts: "1,468.50",
          deal_bas_r: "1,455.30",
          bkpr: "1455",
          yy_efee_r: "0",
          ten_dd_efee_r: "0",
          kftc_bkpr: "1455",
          kftc_deal_bas_r: "1455.3",
          cur_nm: "미국 달러"
        },
        {
          result: 1,
          cur_unit: "EUR",
          ttb: "1,520.20",
          tts: "1,548.40",
          deal_bas_r: "1534.30",
          bkpr: "1534",
          yy_efee_r: "0",
          ten_dd_efee_r: "0",
          kftc_bkpr: "1534",
          kftc_deal_bas_r: "1534.3",
          cur_nm: "유로"
        }
      ];
      
      const rates: Record<string, EximExchangeRate> = {};
      mockEximResponse.forEach(rec => {
        rates[rec.cur_unit] = rec;
      });
      setFxRates(rates);
    };

    fetchFxRates();
  }, []);

  const totalValueKrw = MOCK_ASSETS.reduce((acc, curr) => acc + curr.valueKrw, 0);
  const totalValueUsd = MOCK_ASSETS.reduce((acc, curr) => acc + curr.valueUsd, 0);

  const handleAssetClick = (asset: Asset) => {
    const project = MOCK_MINDSHARE.find(p => p.symbol === asset.symbol);
    if (project) {
      setFocusedProject(project);
    } else {
      setFocusedProject({
        rank: 99,
        name: asset.name,
        symbol: asset.symbol,
        logo: asset.symbol[0],
        trend: asset.changePercent,
        isVerified: true,
        aiSummary: `${asset.name}은 현재 한국 시장 내에서 활발히 거래되고 있는 주요 자산입니다.`
      });
    }
  };

  if (focusedProject) {
    return <ProjectDetail project={focusedProject} onBack={() => setFocusedProject(null)} />;
  }

  return (
    <div className="space-y-6 pb-10">
      
      {/* 1. TOP SECTION: MARU Reputation Identity */}
      <section 
        onClick={() => onNavigate('profile')}
        className="bg-slate-900 px-6 py-5 rounded-[1.5rem] text-white shadow-lg relative overflow-hidden group cursor-pointer hover:bg-slate-800 transition-all border border-white/5"
      >
        <div className="relative z-10 flex items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="hidden sm:flex w-12 h-12 rounded-full bg-blue-600/20 items-center justify-center text-xl border border-blue-500/20 shadow-inner">🛡️</div>
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <h3 className="text-xl font-black tracking-tight">{MOCK_USER.maruId}</h3>
                <span className="bg-blue-600 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter shadow-sm">Tier {MOCK_USER.tier}</span>
                <span className="text-[10px] font-bold text-blue-400">상위 5%</span>
              </div>
              <div className="flex items-center gap-5 text-[12px] font-bold text-slate-400">
                <span className="flex items-center gap-1.5">신뢰도 <span className="text-white">98%</span></span>
                <span className="flex items-center gap-1.5">참여율 <span className="text-white">85%</span></span>
                <span className="flex items-center gap-1.5">평판 <span className="text-white">92%</span></span>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center relative group-hover:border-blue-500/50 transition-all shadow-xl">
            <div className="text-2xl grayscale group-hover:grayscale-0 transition-all">💎</div>
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-blue-500 rounded-full border-2 border-slate-900 shadow-sm"></div>
            <span className="absolute -bottom-2 text-[8px] font-black text-slate-500 uppercase tracking-tighter">MARU NFT</span>
          </div>
        </div>
        <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-40 transition-opacity">
          <span className="text-xs">내 평판 이동 →</span>
        </div>
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-blue-600/10 rounded-full blur-[40px] group-hover:bg-blue-600/20 transition-all duration-700"></div>
      </section>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">
        <div className="w-full lg:col-span-8 space-y-8">
          
          {/* Asset Summary Section */}
          <section className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <div className="flex flex-col">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">내 자산 현황</h3>
                {fxRates['USD'] && (
                  <span className="text-[10px] text-blue-600 font-bold mt-1">
                    수출입은행 환율: 1$ = {fxRates['USD'].deal_bas_r}원
                  </span>
                )}
              </div>
              <div className="flex gap-1 bg-slate-100 p-0.5 rounded-lg">
                  <button onClick={(e) => { e.stopPropagation(); setCurrency('KRW'); }} className={`px-3 py-1 text-[11px] font-bold rounded-md transition-all ${currency === 'KRW' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}>KRW</button>
                  <button onClick={(e) => { e.stopPropagation(); setCurrency('USD'); }} className={`px-3 py-1 text-[11px] font-bold rounded-md transition-all ${currency === 'USD' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}>USD</button>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-[11px] text-slate-400 font-bold mb-1 uppercase tracking-wider">Estimated Total Balance</p>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                {currency === 'KRW' ? totalValueKrw.toLocaleString() : totalValueUsd.toLocaleString()}
                <span className="text-base font-bold ml-1 text-slate-500">{currency === 'KRW' ? '원' : 'USD'}</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MOCK_ASSETS.map((asset) => (
                <div 
                  key={asset.id} 
                  onClick={() => handleAssetClick(asset)} 
                  className={`flex items-center justify-between cursor-pointer p-4 rounded-2xl border transition-all bg-slate-50 border-slate-50 hover:border-blue-300 hover:bg-white hover:shadow-md group`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xs font-black shadow-sm transition-transform group-hover:scale-110 ${asset.logoColor}`}>{asset.symbol[0]}</div>
                    <div>
                      <p className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors">{asset.name}</p>
                      <p className="text-[11px] text-slate-400 font-bold">{asset.balance} {asset.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-slate-900">{currency === 'KRW' ? asset.valueKrw.toLocaleString() : asset.valueUsd.toLocaleString()}</p>
                    <p className={`text-[11px] font-black ${asset.changePercent >= 0 ? 'text-red-500' : 'text-blue-500'}`}>
                      {asset.changePercent > 0 ? '+' : ''}{asset.changePercent}%
                    </p>
                    <p className="text-[8px] font-black text-blue-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">상세 인텔리전스 →</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Real-time Popular Events */}
          <section className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">🔥 실시간 인기 이벤트</h3>
              <button onClick={() => onNavigate('events')} className="text-xs font-black text-blue-600 hover:underline">모두 보기</button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
              {MOCK_CAMPAIGNS.slice(0, 3).map((campaign) => (
                <div key={campaign.id} onClick={() => onNavigate('events')} className="min-w-[290px] md:min-w-[340px] bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between hover:border-blue-300 transition-all cursor-pointer group">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="bg-blue-600 text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest">{campaign.rewardType}</span>
                      <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-1 rounded-lg">{campaign.deadlineDDay} 마감</span>
                    </div>
                    <h4 className="text-base font-black text-slate-800 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">{campaign.title}</h4>
                    <p className="text-[11px] text-slate-500 font-bold">MARU ID 티어 {campaign.requiredTier} 이상</p>
                  </div>
                  <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center text-[8px]">👤</div>)}
                      </div>
                      <span className="text-[10px] font-black text-slate-400">+{campaign.participants}명 참여 중</span>
                    </div>
                    <span className="text-blue-600 font-black text-xs group-hover:translate-x-1 transition-transform">참여 →</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar: Latest Market News */}
        <div className="w-full lg:col-span-4 space-y-6">
          <section className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-[11px] font-black text-slate-400 mb-6 uppercase tracking-widest flex items-center justify-between">최신 마켓 소식</h3>
            <div className="space-y-6">
              {MOCK_NEWS.filter(n => !n.isTrendingArticle).slice(0, 5).map(news => (
                <div key={news.id} className="group cursor-pointer">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-[9px] font-black text-blue-600 uppercase tracking-tighter">{news.source}</p>
                    <p className="text-[9px] font-bold text-slate-300">{news.timestamp}</p>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">{news.title}</h4>
                </div>
              ))}
            </div>
            <button onClick={() => onNavigate('info')} className="w-full mt-8 py-3 bg-slate-50 text-slate-400 text-[10px] font-black rounded-xl hover:bg-slate-100 transition-all uppercase tracking-widest">뉴스 전체보기</button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
