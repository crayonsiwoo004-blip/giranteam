import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function KakaoConsultButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleKakaoClick = () => {
    window.open('https://open.kakao.com/o/sIZhRNhi', '_blank');
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 group"
        aria-label="카카오톡 상담"
      >
        <div className="relative">
          {/* Pulse Animation */}
          <div className="absolute inset-0 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-20 animate-pulse"></div>

          {/* Main Button */}
          <div className="relative w-14 h-14 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center border-2 border-yellow-200">
            <MessageCircle className="w-7 h-7 text-white" />
          </div>

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-3 bg-black/90 text-white text-xs font-medium px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            카카오톡 상담
            <div className="absolute top-full right-2 w-2 h-2 bg-black/90 transform rotate-45"></div>
          </div>
        </div>
      </button>

      {/* Popup Menu */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 px-6 py-4 flex items-center justify-between">
              <h3 className="font-bold text-gray-800">리니지 학교 상담</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                안녕하세요! 리니지 학교(기란팀)입니다.<br />
                궁금하신 점이나 상담이 필요하신 경우<br />
                카카오톡 오픈채팅으로 편하게 문의해주세요.
              </p>

              <div className="space-y-2 pt-2">
                <p className="text-xs text-gray-500 font-medium">운영시간</p>
                <p className="text-sm text-gray-700">24시간 연중무휴</p>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleKakaoClick}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold py-3 px-4 rounded-lg transition-all hover:shadow-lg flex items-center justify-center gap-2 mt-4"
              >
                <MessageCircle className="w-5 h-5" />
                카카오톡 오픈채팅 열기
              </button>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                빠른 응답을 위해 카카오톡으로만 상담을 받고 있습니다.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
