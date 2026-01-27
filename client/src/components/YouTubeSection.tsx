import React from 'react';
import { Play } from 'lucide-react';

export default function YouTubeSection() {
  return (
    <section className="py-16 bg-black/50 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">서비스 소개 영상</h2>
          <p className="text-muted-foreground text-lg">리니지대리의 서비스를 영상으로 확인해보세요</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/sYMtR-Yf7t8"
              title="리니지대리 서비스 소개"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
