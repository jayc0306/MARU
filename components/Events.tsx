
import React from 'react';
import { MOCK_CAMPAIGNS, MOCK_USER } from '../constants';

const Events: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-2">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-slate-900">검증된 캠페인</h2>
          <p className="text-slate-500 text-sm">MARU ID 평판 티어에 따라 참여 가능한 프리미엄 이벤트 목록입니다.</p>
        </div>
        <div className="px-4 py-2 bg-blue-50 border border-blue-100 rounded-lg">
          <span className="text-xs text-blue-600 font-medium">나의 현재 참여 가능 티어: </span>
          <span className="text-sm font-bold text-blue-700">티어 {MOCK_USER.tier} 이하</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {MOCK_CAMPAIGNS.map((campaign) => {
          const canParticipate = MOCK_USER.tier >= campaign.requiredTier;
          
          return (
            <div key={campaign.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col shadow-sm">
              {/* Header */}
              <div className="p-8 pb-4">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full border border-blue-500 flex items-center justify-center">
                        <span className="text-blue-500 text-[10px]">🛡️</span>
                    </div>
                    <span className="text-sm text-slate-500">{campaign.chainName}</span>
                  </div>
                  <span className="text-[11px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">진행 중</span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-4">{campaign.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-8">
                  {campaign.description}
                </p>

                {/* Info List */}
                <div className="space-y-3 mb-8">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2 text-slate-500">
                        <span>🎁</span>
                        <span>보상</span>
                    </div>
                    <span className="font-semibold text-slate-800">{campaign.rewardDetail}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2 text-slate-500">
                        <span>👤</span>
                        <span>최소 요구 Tier</span>
                    </div>
                    <span className="text-[11px] font-bold border border-slate-300 rounded px-2 py-0.5 text-slate-500">Tier {campaign.requiredTier}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2 text-slate-500">
                        <span>👥</span>
                        <span>참여자</span>
                    </div>
                    <span className="text-slate-800 font-medium">{campaign.participants.toLocaleString()} / {campaign.maxParticipants.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2 text-slate-500">
                        <span>🕒</span>
                        <span>마감</span>
                    </div>
                    <span className="text-slate-800 font-medium">{campaign.deadline} ({campaign.deadlineDDay})</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-10">
                    <div className="flex justify-between text-[11px] font-bold text-slate-400 mb-2 uppercase">
                        <span>참여율</span>
                        <span>{campaign.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-blue-600 h-full transition-all duration-500" style={{ width: `${campaign.progress}%` }}></div>
                    </div>
                </div>

                {/* Steps */}
                <div className="space-y-2 mb-8">
                  <p className="text-sm font-bold text-slate-900 mb-3">참여 방법:</p>
                  <ol className="space-y-1.5">
                    {campaign.steps.map((step, idx) => (
                        <li key={idx} className="text-sm text-blue-600 flex gap-1.5">
                            <span className="font-medium shrink-0">{idx + 1}.</span>
                            <span>{step}</span>
                        </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-8 pt-0">
                <button 
                  disabled={!canParticipate}
                  className={`w-full py-4 rounded-xl text-sm font-bold transition-all ${
                    canParticipate 
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md active:scale-[0.98]' 
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-60'
                  }`}
                >
                  {canParticipate ? '캠페인 참여하기' : `티어 ${campaign.requiredTier}부터 참여 가능`}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Events;
