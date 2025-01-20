import { useEffect, useState, useRef } from 'react';
import { SlArrowLeft } from 'react-icons/sl';
import { SlArrowRight } from 'react-icons/sl';

function BannerSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const files = import.meta.glob('/src/assets/banner/*');
  const bannerImages = Object.keys(files);
  const totalSlides = bannerImages.length;

  // 자동 슬라이더 설정
  useEffect(() => {
    startAutoSlide();
    return stopAutoSlide;
  }, [currentIndex]);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      goToNextSlide();
    }, 3000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1,
    );
  };

  const slideStyle = {
    transform: `translateX(-${currentIndex * 100}%)`,
  };

  return (
    <div className='relative w-full overflow-hidden'>
      <div
        ref={sliderRef}
        className='flex transition-transform duration-500 ease-in-out'
        style={slideStyle}
      >
        {bannerImages.map((image, index) => (
          <div key={index} className='min-w-full'>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className='h-auto w-full object-cover'
            />
          </div>
        ))}
      </div>

      <button
        className='absolute left-4 top-1/2 -translate-y-1/2 p-2 text-[1.5rem] text-white'
        onClick={goToPrevSlide}
        onMouseEnter={stopAutoSlide}
        onMouseLeave={startAutoSlide}
      >
        <SlArrowLeft />
      </button>

      <button
        className='absolute right-4 top-1/2 -translate-y-1/2 p-2 text-[1.5rem] text-white'
        onClick={goToNextSlide}
        onMouseEnter={stopAutoSlide}
        onMouseLeave={startAutoSlide}
      >
        <SlArrowRight />
      </button>

      <div className='absolute bottom-2 left-1/2 -translate-x-1/2 rounded-lg bg-[rgb(0,0,0,0.4)] px-4 text-sm text-brand-white'>
        {currentIndex + 1} / {totalSlides}
      </div>
    </div>
  );
}

export default BannerSlider;
