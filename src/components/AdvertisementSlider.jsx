import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const AdvertisementSlider = ({ advertisements = [] }) => {
  const { t, language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  // Determine font class based on language
  const getFontClass = () => {
    return language === 'ar' ? 'font-arabic' : 'font-english';
  };

  // إذا لم تكن هناك إعلانات، استخدم الإعلانات الافتراضية
  const defaultAds = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1592928301960-9708de56057b',
      link: '/products?category=spices'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1570197785710-bddf3f0d0b24',
      link: '/products?category=dates'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1502447535320-0bcc5aae2a37',
      link: '/products?category=honey'
    }
  ];

  const ads = advertisements.length > 0 ? advertisements : defaultAds;

  useEffect(() => {
    if (!isPlaying || ads.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length);
    }, 5000); // تغيير كل 5 ثوان

    return () => clearInterval(interval);
  }, [isPlaying, ads.length]);

  // إعادة تعيين الأبعاد عند تغيير الإعلان
  useEffect(() => {
    setImageDimensions({ width: 0, height: 0 });
  }, [currentIndex]);

  // إعادة حساب الأبعاد عند تغيير حجم النافذة
  useEffect(() => {
    const handleResize = () => {
      if (imageDimensions.height > 0) {
        // إعادة حساب الأبعاد عند تغيير حجم النافذة
        const currentImg = document.querySelector('.advertisement-slider img');
        if (currentImg && currentImg.naturalWidth > 0) {
          calculateImageDimensions(currentImg);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [imageDimensions.height]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + ads.length) % ads.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleImageLoad = (event) => {
    const img = event.target;
    
    // التأكد من أن الصورة محملة بشكل صحيح
    if (img.naturalWidth === 0 || img.naturalHeight === 0) {
      // إعادة المحاولة بعد فترة قصيرة
      setTimeout(() => {
        if (img.naturalWidth > 0 && img.naturalHeight > 0) {
          calculateImageDimensions(img);
        }
      }, 200);
      return;
    }

    calculateImageDimensions(img);
  };

  const calculateImageDimensions = (img) => {
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    const containerWidth = window.innerWidth * 0.8; // عرض الحاوية (80% من عرض الشاشة)
    
    // حساب الارتفاع بناءً على نسبة الأبعاد
    let calculatedHeight;
    
    if (aspectRatio > 2) {
      // صورة أفقية جداً
      calculatedHeight = Math.min(350, containerWidth / aspectRatio);
    } else if (aspectRatio > 1.2) {
      // صورة أفقية
      calculatedHeight = Math.min(450, containerWidth / aspectRatio);
    } else if (aspectRatio < 0.6) {
      // صورة عمودية جداً
      calculatedHeight = Math.min(650, containerWidth / aspectRatio);
    } else if (aspectRatio < 0.9) {
      // صورة عمودية
      calculatedHeight = Math.min(550, containerWidth / aspectRatio);
    } else {
      // صورة مربعة أو قريبة من المربع
      calculatedHeight = Math.min(500, containerWidth / aspectRatio);
    }

    // التأكد من أن الارتفاع ضمن الحدود المقبولة
    const finalHeight = Math.max(300, Math.min(600, calculatedHeight));
    
    // تحديث الأبعاد مباشرة
    setImageDimensions({ 
      width: img.naturalWidth, 
      height: finalHeight 
    });
  };

  if (ads.length === 0) {
    return null;
  }

  return (
    <div 
      className="relative w-full overflow-hidden rounded-3xl shadow-2xl transition-all duration-300 advertisement-slider"
      style={{ 
        height: imageDimensions.height > 0 ? `${imageDimensions.height}px` : '500px',
        minHeight: '300px',
        maxHeight: '600px'
      }}
    >
      {/* الإعلان الحالي */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div className="relative w-full h-full">
            <img
              src={ads[currentIndex].image}
              alt="إعلان"
              className="w-full h-full object-cover cursor-pointer advertisement-slider"
              onLoad={handleImageLoad}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
                // إعادة تعيين الارتفاع في حالة الخطأ
                setImageDimensions({ width: 0, height: 500 });
              }}
              onClick={() => {
                if (ads[currentIndex].link) {
                  window.location.href = ads[currentIndex].link;
                }
              }}
            />
            {/* Fallback for broken images */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-amber-500 to-orange-500 hidden">
              <div className="text-center text-white">
                <p className={`text-lg ${getFontClass()}`}>{t('cannotDisplayImage')}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* أزرار التنقل */}
      {ads.length > 1 && (
        <>
          <Button
            onClick={goToPrevious}
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            onClick={goToNext}
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {/* أزرار التحكم */}
      {ads.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
          <Button
            onClick={togglePlayPause}
            variant="ghost"
            size="icon"
            className="bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </div>
      )}

      {/* مؤشرات الشرائح */}
      {ads.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {ads.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdvertisementSlider; 