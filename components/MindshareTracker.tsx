
import React from 'react';
import { MOCK_MINDSHARE } from '../constants';

const MindshareTracker: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">한국 커뮤니티 마인드셰어</h2>
        <p className="text-slate-500 text-sm">실시간 SNS, 온체인 데이터 및 뉴스 언급량을 분석하여 선정된 주목 프로젝트입니다.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase w-16">순위</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">프로젝트</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">트렌드</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">AI 요약 분석</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase w-24">검증</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_MINDSHARE.map((item) => (
                <tr key={item.name} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-6 align-top">
                    <span className="text-lg font-bold text-slate-300">#{item.rank}</span>
                  </td>
                  <td className="px-6 py-6 align-top">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                        {item.logo}
                      </div>
                      <div>
                        <p className="text-base font-bold text-slate-900">{item.name}</p>
                        <p className="text-xs text-slate-400">{item.symbol}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 align-top">
                    <div className={`flex items-center gap-1 font-bold ${item.trend > 0 ? 'text-red-500' : 'text-blue-500'}`}>
                      {item.trend > 0 ? '▲' : '▼'} {Math.abs(item.trend)}%
                    </div>
                  </td>
                  <td className="px-6 py-6 align-top max-w-md">
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.aiSummary}
                    </p>
                  </td>
                  <td className="px-6 py-6 align-top">
                    {item.isVerified ? (
                      <span className="inline-flex items-center px-2 py-1 rounded bg-blue-50 text-blue-600 text-[10px] font-bold">
                        MARU 검증
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded bg-slate-100 text-slate-400 text-[10px] font-bold">
                        미검증
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MindshareTracker;
