import { useState, useEffect, useRef } from 'react';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import jobkoreaBanner from '../../assets/banner/jobkorea_banner.png';
import jobplanetBanner from '../../assets/banner/jobplanet_banner.png';
import saraminBanner from '../../assets/banner/saramin_banner.png';

function BannerSlider() {
  const bannerInfo = [
    [saraminBanner, 'https://www.saramin.co.kr/'],
    [jobkoreaBanner, 'https://www.jobkorea.co.kr/'],
    [jobplanetBanner, 'https://www.jobplanet.co.kr'],
  ];
  const totalSlides = bannerInfo.length;

  // 첫 번째 복제 슬라이드에서 시작
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const goToNextSlide = () => moveSlide(currentIndex + 1);
  const goToPrevSlide = () => moveSlide(currentIndex - 1);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(goToNextSlide, 3000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  // 슬라이드 이동 함수
  const moveSlide = (newIndex: number) => {
    setIsTransitioning(true);
    setCurrentIndex(newIndex);

    setTimeout(() => {
      if (newIndex === totalSlides + 1) {
        setIsTransitioning(false);
        setCurrentIndex(1);
      } else if (newIndex === 0) {
        setIsTransitioning(false);
        setCurrentIndex(totalSlides);
      }
    }, 500); // 애니메이션 후 점프
  };

  useEffect(() => {
    startAutoSlide();
    return stopAutoSlide;
  }, [currentIndex]);

  return (
    <aside className='relative w-full overflow-hidden py-6'>
      <div
        ref={sliderRef}
        className='flex transition-transform duration-500 ease-in-out'
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
        }}
      >
        {/* 마지막 슬라이드 복제 (첫 번째 앞) */}
        <a
          href={bannerInfo[totalSlides - 1][1]}
          target='_blank'
          rel='noopener noreferrer'
          className='w-full flex-shrink-0'
        >
          <img
            src={bannerInfo[totalSlides - 1][0]}
            alt='복제된 마지막 배너'
            className='h-auto w-full object-cover'
          />
        </a>

        {/* 원래 슬라이드들 */}
        {bannerInfo.map(([bannerImage, bannerUrl], index) => (
          <a
            key={index}
            href={bannerUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='w-full flex-shrink-0'
          >
            <img
              src={bannerImage}
              alt={`Slide ${index + 1}`}
              className='h-auto w-full object-cover'
            />
          </a>
        ))}

        {/* 첫 번째 슬라이드 복제 (마지막 뒤) */}
        <a
          href={bannerInfo[0][1]}
          target='_blank'
          rel='noopener noreferrer'
          className='w-full flex-shrink-0'
        >
          <img
            src={bannerInfo[0][0]}
            alt='복제된 첫 번째 배너'
            className='h-auto w-full object-cover'
          />
        </a>
      </div>

      {/* 좌우 이동 버튼 */}
      <button
        className='absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black bg-opacity-50 p-2 text-white'
        onClick={goToPrevSlide}
        onMouseEnter={stopAutoSlide}
        onMouseLeave={startAutoSlide}
      >
        <SlArrowLeft />
      </button>
      <button
        className='absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black bg-opacity-50 p-2 text-white'
        onClick={goToNextSlide}
        onMouseEnter={stopAutoSlide}
        onMouseLeave={startAutoSlide}
      >
        <SlArrowRight />
      </button>

      {/* 페이지 인디케이터 */}
      <div className='absolute bottom-7 left-1/2 -translate-x-1/2 rounded-md bg-black bg-opacity-50 px-3 py-1 text-sm text-white'>
        {currentIndex === 0
          ? totalSlides
          : currentIndex === totalSlides + 1
            ? 1
            : currentIndex}{' '}
        / {totalSlides}
      </div>
    </aside>
  );
}

export default BannerSlider;
