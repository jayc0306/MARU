
import React from 'react';
import { MOCK_USER } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: 'dashboard' | 'profile' | 'mindshare' | 'events' | 'arena' | 'info';
  onTabChange: (tab: any) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-20 md:pb-0">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold text-blue-600 cursor-pointer" onClick={() => onTabChange('dashboard')}>
              MARU <span className="text-slate-900">CHAIN</span>
            </h1>
            <nav className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => onTabChange('dashboard')}
                className={`text-sm font-medium ${activeTab === 'dashboard' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
              >
                홈
              </button>
              <button 
                onClick={() => onTabChange('arena')}
                className={`text-sm font-medium ${activeTab === 'arena' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
              >
                아레나
              </button>
              <button 
                onClick={() => onTabChange('info')}
                className={`text-sm font-medium ${activeTab === 'info' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
              >
                정보
              </button>
              <button 
                onClick={() => onTabChange('events')}
                className={`text-sm font-medium ${activeTab === 'events' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
              >
                이벤트
              </button>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <div 
              onClick={() => onTabChange('profile')}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full cursor-pointer hover:bg-slate-200 transition-colors"
            >
              <span className="text-xs font-semibold text-slate-600">티어 {MOCK_USER.tier}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              <span className="hidden sm:inline text-sm font-medium text-slate-800">{MOCK_USER.maruId}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6 md:py-8">
        {children}
      </main>

      {/* 모바일 하단 내비게이션 바 */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around items-center h-16 px-2 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => onTabChange('dashboard')}
          className={`flex flex-col items-center justify-center flex-1 gap-1 ${activeTab === 'dashboard' ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <span className="text-xl">🏠</span>
          <span className="text-[10px] font-bold">홈</span>
        </button>
        <button 
          onClick={() => onTabChange('arena')}
          className={`flex flex-col items-center justify-center flex-1 gap-1 ${activeTab === 'arena' ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <span className="text-xl">📊</span>
          <span className="text-[10px] font-bold">아레나</span>
        </button>
        <button 
          onClick={() => onTabChange('info')}
          className={`flex flex-col items-center justify-center flex-1 gap-1 ${activeTab === 'info' ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <span className="text-xl">📰</span>
          <span className="text-[10px] font-bold">정보</span>
        </button>
        <button 
          onClick={() => onTabChange('events')}
          className={`flex flex-col items-center justify-center flex-1 gap-1 ${activeTab === 'events' ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <span className="text-xl">🎁</span>
          <span className="text-[10px] font-bold">이벤트</span>
        </button>
        <button 
          onClick={() => onTabChange('profile')}
          className={`flex flex-col items-center justify-center flex-1 gap-1 ${activeTab === 'profile' ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <span className="text-xl">👤</span>
          <span className="text-[10px] font-bold">내 평판</span>
        </button>
      </nav>

      <footer className="hidden md:block bg-white border-t border-slate-200 py-8 text-center text-slate-400 text-sm">
        &copy; 2024 MARU Chain. 모든 데이터는 블록미디어(Blockmedia) 기반 투자 참고용입니다.
      </footer>
    </div>
  );
};

export default Layout;
