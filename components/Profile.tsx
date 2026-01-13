
import React from 'react';
import { MOCK_USER } from '../constants';

const Profile: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">🛡️</span>
        </div>
        <h2 className="text-2xl font-bold mb-1">{MOCK_USER.maruId}</h2>
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded">본인인증 완료</span>
          <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-bold rounded">티어 {MOCK_USER.tier}</span>
        </div>
        <p className="text-slate-500 text-sm">최근 활동: {MOCK_USER.lastActivity}</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg font-bold mb-4 text-slate-800">평판 분석 (Qualitative)</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">신원 검증도</span>
                <span className="text-xs font-bold text-blue-600">매우 높음</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full w-[95%]"></div>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">KYC 및 정부 도장 인증 시스템을 통해 검증되었습니다.</p>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">생태계 참여도</span>
                <span className="text-xs font-bold text-blue-600">중간</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full w-[65%]"></div>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">DApp 사용 기록 및 이벤트 참여 빈도가 준수합니다.</p>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">무결성 지수</span>
                <span className="text-xs font-bold text-green-600">최우수</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full w-[100%]"></div>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">과거 해킹, 사기 혹은 비정상 거래 이력이 없습니다.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl text-white">
          <h3 className="text-lg font-bold mb-4">신뢰 증명 (Dojang Attestation)</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-xl border border-slate-700">
              <span className="text-xl">🏛️</span>
              <div>
                <p className="text-xs text-slate-400">금융 계좌 연동 인증</p>
                <p className="text-sm font-medium">2024.01.12 완료</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-xl border border-slate-700">
              <span className="text-xl">📜</span>
              <div>
                <p className="text-xs text-slate-400">MARU 거버넌스 투표 참여</p>
                <p className="text-sm font-medium">총 12회 참여</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-xl border border-slate-700">
              <span className="text-xl">📍</span>
              <div>
                <p className="text-xs text-slate-400">오프라인 컨퍼런스 인증</p>
                <p className="text-sm font-medium">KBW 2023 현장 인증</p>
              </div>
            </div>
          </div>
          <button className="w-full mt-6 py-3 bg-blue-600 rounded-xl text-sm font-bold hover:bg-blue-500 transition-colors">
            추가 인증하기
          </button>
        </div>
      </section>
    </div>
  );
};

export default Profile;
