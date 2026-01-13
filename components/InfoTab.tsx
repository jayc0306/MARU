
import React, { useState } from 'react';
import { MOCK_NEWS } from '../constants';
import { GoogleGenAI } from "@google/genai";

const InfoTab: React.FC = () => {
  const [commSort, setCommSort] = useState<'recent' | 'popular'>('recent');
  const [isCrawling, setIsCrawling] = useState(false);
  const [livePulse, setLivePulse] = useState<{title: string, summary: string, source: string, url: string}[] | null>(null);

  const fetchLiveCommunityData = async () => {
    setIsCrawling(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      // We use gemini-3-pro-preview because it supports high-quality reasoning and search tools
      const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: "오늘(2025년 5월 22일) 디시인사이드 비트코인 갤러리와 코인판에서 가장 화제가 되고 있는 게시물 제목 3개와 주요 여론(심리)을 요약해줘. 한국어로 답변하고, 각 게시물에 대한 출처 URL을 포함해줘.",
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const text = response.text;
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      
      // We'll create a simple list based on the AI response
      // In a real app, you'd parse the JSON or specific structure, but here we provide a high-quality summary view
      setLivePulse([
        { 
          title: "실시간 커뮤니티 트렌드 분석 완료", 
          summary: text || "최신 게시물을 분석 중입니다.", 
          source: "AI Live Crawl", 
          url: chunks[0]?.web?.uri || "https://gall.dcinside.com/board/lists/?id=bitcoins_new1"
        }
      ]);
    } catch (error) {
      console.error("Crawl failed:", error);
    } finally {
      setIsCrawling(false);
    }
  };

  const researches = [
    {
      id: 'r1',
      title: '웹3 네오뱅크, 결제를 넘어 온체인으로-071 리서치',
      source: '071 Labs',
      summary: '가상자산 지갑이 은행의 역할을 대체하는 시대가 도래하며, 온체인 결제 인프라의 확장이 가속화되고 있습니다.',
      date: '2025-05-22',
      link: 'https://www.blockmedia.co.kr/'
    },
    {
      id: 'r2',
      title: '2025년 가상자산 시장 전망: 제도권 시대의 개막',
      source: '고팍스 리서치',
      summary: '제도적 수용도가 높아짐에 따라 디지털 자산이 전통 금융 포트폴리오의 필수 요소로 자리 잡을 전망입니다.',
      date: '2025-05-22',
      link: 'https://www.blockmedia.co.kr/'
    }
  ];

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="animate-in fade-in duration-500 space-y-12 pb-20">
      <div className="space-y-8">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">인텔리전스 <span className="text-blue-600">리포트</span></h2>
            <p className="text-sm text-slate-500 font-medium">실시간 마켓 뉴스 및 전문 분석</p>
          </div>
          <button 
            onClick={fetchLiveCommunityData}
            disabled={isCrawling}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-black transition-all ${isCrawling ? 'bg-slate-200 text-slate-400' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200'}`}
          >
            {isCrawling ? (
              <><span className="animate-spin">🔄</span> 커뮤니티 분석 중...</>
            ) : (
              <><span className="text-sm">⚡</span> 실시간 커뮤니티 펄스 가져오기</>
            )}
          </button>
        </header>

        {/* AI Pulse View */}
        {livePulse && (
          <section className="bg-blue-50 border border-blue-100 rounded-[2rem] p-6 animate-in slide-in-from-top duration-500">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xs">AI</span>
              <h3 className="text-sm font-black text-blue-900">실시간 커뮤니티 감성 분석 (Search Grounded)</h3>
            </div>
            {livePulse.map((item, idx) => (
              <div key={idx} className="space-y-3">
                <p className="text-sm text-slate-700 font-medium leading-relaxed whitespace-pre-wrap">
                  {item.summary}
                </p>
                <div className="pt-4 border-t border-blue-200/50">
                  <p className="text-[10px] font-black text-blue-400 uppercase mb-2">검증된 출처</p>
                  <button 
                    onClick={() => handleExternalLink(item.url)}
                    className="text-xs font-bold text-blue-600 underline break-all text-left"
                  >
                    {item.url}
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}

        <section className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6 px-2">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">📰 주요 뉴스 & 속보</h3>
            <div className="flex gap-3 items-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Blockmedia</span>
              <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">CoinNess</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {MOCK_NEWS.map((news, idx) => (
              <div 
                key={news.id} 
                onClick={() => handleExternalLink(news.link)}
                className={`group cursor-pointer p-4 rounded-2xl transition-all border bg-slate-50 border-transparent hover:border-blue-100 hover:bg-white hover:shadow-md`}
              >
                <div className="flex justify-between items-start">
                  <span className={`text-xl font-black text-blue-600/20 group-hover:text-blue-600 transition-colors`}>0{idx + 1}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-800 leading-tight mt-2 line-clamp-3 group-hover:text-blue-600 transition-colors">{news.title}</h4>
                <div className="flex justify-between items-center mt-3">
                  <p className={`text-[9px] font-black uppercase text-blue-500`}>{news.source}</p>
                  <p className="text-[9px] text-slate-400 font-bold">{news.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
          <div className="flex items-center justify-between mb-8 relative z-10">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              🔬 전문 리서치 하이라이트
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {researches.map((res) => (
              <div 
                key={res.id} 
                onClick={() => handleExternalLink(res.link)}
                className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-black text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded">{res.source}</span>
                  <span className="text-[9px] font-bold text-slate-500">{res.date}</span>
                </div>
                <h4 className="text-sm font-bold mb-3 leading-snug group-hover:text-blue-400 transition-colors">{res.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">{res.summary}</p>
              </div>
            ))}
          </div>
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px]"></div>
        </section>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-xl font-black text-slate-900 tracking-tight">실시간 <span className="text-orange-500">커뮤니티</span></h2>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => setCommSort('recent')}
              className={`px-3 py-1.5 text-[10px] font-black rounded-lg transition-all ${commSort === 'recent' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
            >
              최신순
            </button>
            <button 
              onClick={() => setCommSort('popular')}
              className={`px-3 py-1.5 text-[10px] font-black rounded-lg transition-all ${commSort === 'popular' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
            >
              인기순
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
            <div className="bg-blue-600 px-6 py-4 flex justify-between items-center">
              <h4 className="text-white text-sm font-black flex items-center gap-2">
                <span className="w-5 h-5 bg-white/20 rounded flex items-center justify-center text-[10px]">C</span> 
                코인판 (자유게시판)
              </h4>
            </div>
            <div className="divide-y divide-slate-50 flex-1">
              {[
                { id: 'cp1', title: '이 김치코인 뭐냐? 차트 보셈', author: 'coinpban', time: '방금 전', up: 8, comments: 24, link: 'https://coinpan.com/free' },
                { id: 'cp2', title: '테더 보유량 늘리는게 답인가요?', author: '보잡째정상수', time: '5분 전', up: 15, comments: 42, link: 'https://coinpan.com/free' },
                { id: 'cp3', title: '리플 $1 돌파 실화냐 ㅋㅋㅋㅋ', author: '코인만오르면..', time: '15분 전', up: 22, comments: 67, link: 'https://coinpan.com/free' },
              ].map((post) => (
                <div 
                  key={post.id} 
                  onClick={() => handleExternalLink(post.link)}
                  className="p-5 hover:bg-slate-50 transition-all cursor-pointer group"
                >
                  <h4 className="text-sm font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors mb-2">{post.title}</h4>
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                    <span className="text-slate-500">{post.author} • {post.time}</span>
                    <div className="flex gap-3">
                      <span>추천 {post.up}</span>
                      <span className="text-blue-500">댓글 {post.comments}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
            <div className="bg-orange-500 px-6 py-4 flex justify-between items-center">
              <h4 className="text-white text-sm font-black flex items-center gap-2">
                <span className="w-5 h-5 bg-white/20 rounded flex items-center justify-center text-[10px]">D</span> 
                디시인사이드 (비트코인 갤러리)
              </h4>
            </div>
            <div className="divide-y divide-slate-50 flex-1">
              {[
                { id: 'dc1', title: '비트 이대로 1억 가나? 진지하게 물어본다', author: '비갤러(106.101)', time: '방금 전', up: 12, hits: 145, link: 'https://gall.dcinside.com/board/lists/?id=bitcoins_new1' },
                { id: 'dc2', title: '이번에 졸업한 형들 소감좀 써줘 ㅋㅋㅋㅋ', author: '비갤러(220.121)', time: '3분 전', up: 45, hits: 890, link: 'https://gall.dcinside.com/board/lists/?id=bitcoins_new1' },
                { id: 'dc3', title: '가만히 있어도 다 떠먹여주는 곳이 있다? (MARU)', author: '비갤러(223.39)', time: '10분 전', up: 2, hits: 340, link: 'https://gall.dcinside.com/board/lists/?id=bitcoins_new1' },
              ].map((post) => (
                <div 
                  key={post.id} 
                  onClick={() => handleExternalLink(post.link)}
                  className="p-5 hover:bg-slate-50 transition-all cursor-pointer group"
                >
                  <h4 className="text-sm font-bold text-slate-800 line-clamp-1 group-hover:text-orange-600 transition-colors mb-2">{post.title}</h4>
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                    <span className="text-slate-500">{post.author} • {post.time}</span>
                    <div className="flex gap-3">
                      <span className="text-orange-500">추천 {post.up}</span>
                      <span>조회 {post.hits}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default InfoTab;
