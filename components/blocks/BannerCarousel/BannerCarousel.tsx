"use client"
import { useState, useEffect, useRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'
import { type ImageProps } from '@/components/primitives'

// 轮播项目类型定义
export interface BannerItem {
  id?: string
  heading?: string
  description?: string
  image?: ImageProps
  type?: string
}

const bannerCarouselVariants = cva('w-full relative overflow-hidden', {
  variants: {
    size: {
      default: 'h-[400px] md:h-[500px]',
      large: 'h-[500px] md:h-[600px]',
      small: 'h-[300px] md:h-[400px]',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

export interface BannerCarouselProps
  extends ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof bannerCarouselVariants> {
  banners: BannerItem[]
  autoPlay?: boolean
  interval?: number
  showIndicators?: boolean
  showArrows?: boolean
}

export const BannerCarousel = ({
  className,
  banners,
  size,
  autoPlay = true,
  interval = 5000,
  showIndicators = true,
  showArrows = true,
  ...props
}: BannerCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const bannerContainerRef = useRef<HTMLDivElement>(null)
  
  const totalBanners = banners.length
  
  // 自动轮播逻辑
  useEffect(() => {
    if (!autoPlay || isPaused || totalBanners <= 1) return
    
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalBanners)
    }, interval)
    
    return () => clearInterval(slideInterval)
  }, [autoPlay, isPaused, interval, totalBanners])
  
  // 上一张/下一张轮播控制
  const goToSlide = (index: number) => {
    setCurrentSlide((index + totalBanners) % totalBanners)
  }
  
  const nextSlide = () => goToSlide(currentSlide + 1)
  const prevSlide = () => goToSlide(currentSlide - 1)

  return (
    <div
      className={cn(bannerCarouselVariants({ size }), className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      {...props}
    >
      <div 
        ref={bannerContainerRef} 
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner, index) => (
          <div 
            key={banner.id || index} 
            className="min-w-full h-full relative"
          >
            {banner.image && (
              <div className="absolute inset-0">
                <img
                  src={banner.image.src}
                  alt={banner.image.alt || ''}
                  className={cn("w-full h-full object-cover", banner.image.className)}
                />
              </div>
            )}
            {/* <div className="absolute inset-0 bg-black/40">
              <div className="container mx-auto h-full flex flex-col justify-center items-center text-center text-white p-4">
                {banner.heading && (
                  <h2 className="text-3xl md:text-5xl font-bold mb-4">{banner.heading}</h2>
                )}
                {banner.description && (
                  <p className="text-lg md:text-xl max-w-2xl">{banner.description}</p>
                )}
              </div>
            </div> */}
          </div>
        ))}
      </div>
      
      {/* 轮播指示器 */}
      {showIndicators && totalBanners > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {Array.from({ length: totalBanners }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-3 h-3 rounded-full",
                index === currentSlide ? "bg-red-500" : "bg-white/50"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
      
      {/* 前进/后退按钮 */}
      {showArrows && totalBanners > 1 && (
        <>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/70"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            &#10094;
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/70"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            &#10095;
          </button>
        </>
      )}
    </div>
  )
}

// 默认样例值
BannerCarousel.defaults = {
  banners: [
    {
      heading: '轮播图标题1',
      description: '这是第一个轮播图的描述文本内容',
      image: {
        src: '/static/placeholders/drupal-decoupled/landscape-large.png',
        alt: '轮播图1',
      },
    },
    {
      heading: '轮播图标题2',
      description: '这是第二个轮播图的描述文本内容',
      image: {
        src: '/static/placeholders/drupal-decoupled/landscape-large.png',
        alt: '轮播图2',
      },
    },
    {
      heading: '轮播图标题3',
      description: '这是第三个轮播图的描述文本内容',
      image: {
        src: '/static/placeholders/drupal-decoupled/landscape-large.png',
        alt: '轮播图3',
      },
    },
  ],
  autoPlay: true,
  interval: 5000,
  showIndicators: true,
  showArrows: true,
} satisfies BannerCarouselProps 