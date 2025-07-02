import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'
import { Clock, Heart } from 'lucide-react'

const couponCardVariants = cva('overflow-hidden rounded-lg bg-white shadow-md h-full flex flex-col transition-all hover:shadow-lg relative', {
  variants: {
    status: {
      available: '',
      limited: '',
      expired: 'opacity-70',
    }
  },
  defaultVariants: {
    status: 'available',
  },
})

export interface CouponCardProps
  extends ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof couponCardVariants> {
  id: string
  image: {
    src: string
    alt: string
  }
  title: string
  discount: string
  isFavorite?: boolean
  status?: 'available' | 'limited' | 'expired'
  expiryDate?: string
}

export const CouponCard = ({
  className,
  image,
  title,
  discount,
  isFavorite = false,
  status = 'available',
  expiryDate,
  ...props
}: CouponCardProps) => {
  return (
    <div 
      className={cn(
        couponCardVariants({ status }), 
        className,
        status === 'expired' ? 'cursor-not-allowed' : 'cursor-pointer hover:-translate-y-1'
      )} 
      {...props}
    >
      <div className="relative">
        <img
          src={image.src}
          alt={image.alt}
          className={cn(
            "h-44 w-full object-cover",
            status === 'expired' && "grayscale"
          )}
        />
        <button
          className="absolute right-2 top-2 rounded-full bg-white/80 p-1.5 hover:bg-white shadow-sm transition-all hover:shadow z-10"
          aria-label={isFavorite ? "从收藏中移除" : "添加到收藏"}
        >
          <Heart
            className={cn(
              "size-5",
              isFavorite ? "fill-rose-500 text-rose-500" : "text-gray-400"
            )}
          />
        </button>
        
        {status === 'limited' && (
          <div className="absolute top-0 left-0 bg-amber-500 text-white px-3 py-1 text-xs font-medium">
            残りわずか
          </div>
        )}
        
        {status === 'expired' && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-gray-800 text-white px-4 py-2 rounded-md font-medium">
              期限切れ
            </span>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-base font-medium text-gray-900 line-clamp-2 min-h-[3rem]">{title}</h3>
        <div className="mt-auto">
          <div className="mt-4 rounded-md bg-amber-50 border border-amber-200 px-3 py-2.5 text-center font-medium text-amber-800 shadow-sm">
            {discount}
          </div>
          
          {expiryDate && (
            <div className="mt-2 flex items-center justify-end text-xs text-gray-500">
              <Clock className="size-3 mr-1" />
              <span>有効期限: {expiryDate}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 