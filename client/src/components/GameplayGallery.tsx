import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
  src: string;
  title: string;
  description: string;
}

const gameplayImages: GalleryImage[] = [
  {
    src: '/images/gameplay-screenshot.jpg',
    title: '실시간 전투 플레이',
    description: '강력한 몬스터와의 전투에서 다양한 스킬을 활용한 박진감 넘치는 게임플레이'
  },
  {
    src: '/images/gameplay-dungeon.jpg',
    title: '던전 탐험',
    description: '팀을 이루어 위험한 던전을 탐험하고 귀중한 아이템을 획득하는 경험'
  }
];

export default function GameplayGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + gameplayImages.length) % gameplayImages.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % gameplayImages.length);
  };

  const currentImage = gameplayImages[currentIndex];

  return (
    <section className="py-16 bg-background relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">게임플레이 갤러리</h2>
          <p className="text-muted-foreground text-lg">리니지 게임의 다양한 콘테늤를 경험해보세요</p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative group">
            {/* Main Image */}
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src={currentImage.src}
                alt={currentImage.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-2">{currentImage.title}</h3>
                <p className="text-gray-300">{currentImage.description}</p>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-primary/80 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-primary/80 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Thumbnail Indicators */}
            <div className="flex justify-center gap-3 mt-8">
              {gameplayImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-primary w-8'
                      : 'bg-white/20 w-2 hover:bg-white/40'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Image Counter */}
          <div className="text-center mt-6 text-muted-foreground">
            {currentIndex + 1} / {gameplayImages.length}
          </div>
        </div>
      </div>
    </section>
  );
}
