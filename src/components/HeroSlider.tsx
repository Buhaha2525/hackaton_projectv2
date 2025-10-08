import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, QrCode } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const slides = [
  {
    image: "https://www.radiofrance.fr/s3/cruiser-production/2020/08/50c33f16-a344-4987-97c1-b96b7e4a050f/1200x680_img_0315.webp",
    title: {
      fr: 'Musée des Civilisations Noires',
      en: 'Museum of Black Civilizations',
      wo: 'Musée des Civilisations Noires'
    },
    subtitle: {
      fr: 'Un voyage à travers l\'histoire et la culture africaine',
      en: 'A journey through African history and culture',
      wo: 'Dawal ci tàriix ak aada bu Afrika'
    }
  },
  {
    image: 'https://images.unsplash.com/photo-1552793084-49132af00ff1?w=1920',
    title: {
      fr: 'Collections Exceptionnelles',
      en: 'Exceptional Collections',
      wo: 'Njuumte yu bees'
    },
    subtitle: {
      fr: 'Plus de 18 000 œuvres d\'art du continent africain',
      en: 'Over 18,000 works of art from the African continent',
      wo: '18 000 jafe yu art ci Afrika'
    }
  },
  {
    image: "https://i.pinimg.com/1200x/95/8a/ae/958aaefe3c05dd18f644a687bd5964fb.jpg",
    title: {
      fr: 'Expositions Temporaires',
      en: 'Temporary Exhibitions',
      wo: 'Exposition yu yéeme'
    },
    subtitle: {
      fr: 'Découvrez nos nouvelles expositions tout au long de l\'année',
      en: 'Discover our new exhibitions throughout the year',
      wo: 'Xam sunu exposition bu bees ci at bi'
    }
  },
  {
    image: 'https://images.unsplash.com/photo-1720945489924-19b707539b3a?w=1920',
    title: {
      fr: 'Patrimoine Vivant',
      en: 'Living Heritage',
      wo: 'Ndeup bu ndem'
    },
    subtitle: {
      fr: 'Art, histoire et mémoire des civilisations noires',
      en: 'Art, history and memory of black civilizations',
      wo: 'Art, tàriix ak xalaat bu civilisations yu ñuul'
    }
  },
  {
    image: 'https://i.pinimg.com/736x/91/dd/d9/91ddd99067a9132bdbc201f8c260b03d.jpg',
    title: {
      fr: 'Expérience Immersive',
      en: 'Immersive Experience',
      wo: 'Xam-xam bu bees'
    },
    subtitle: {
      fr: 'Visite guidée, réalité augmentée et parcours interactifs',
      en: 'Guided tours, augmented reality and interactive paths',
      wo: 'Jël bu melni, réalité augmentée ak yoon yu interactive'
    }
  }
];

interface HeroSliderProps {
  onExploreClick: () => void;
  onScanClick: () => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onExploreClick, onScanClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { language, t } = useLanguage();

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const slide = slides[currentSlide];

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <ImageWithFallback
            src={slide.image}
            alt={slide.title[language]}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container mx-auto px-4 text-center text-white">
          <motion.div
            key={`content-${currentSlide}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {slide.title[language]}
            </h1>
            <p className="text-xl md:text-3xl mb-10 max-w-4xl mx-auto leading-relaxed text-white/90">
              {slide.subtitle[language]}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#93441A] to-[#B67332] hover:from-[#7a3715] hover:to-[#9e5f29] text-white px-8 py-6 text-lg"
                onClick={onExploreClick}
              >
                {t('home.discoverCollections')}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 px-8 py-6 text-lg backdrop-blur-sm"
                onClick={onScanClick}
              >
                <QrCode className="w-5 h-5 mr-2" />
                {t('home.scanQR')}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all rounded-full ${
              index === currentSlide
                ? 'w-12 h-3 bg-[#B67332]'
                : 'w-3 h-3 bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
