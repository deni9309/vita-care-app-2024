import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface SubmitButtonProps {
  isLoading: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
  children: React.ReactNode
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
}

export const SubmitButton = ({
  type = 'submit',
  variant = 'default',
  isLoading = false,
  children,
  className,
}: SubmitButtonProps) => {
  return (
    <Button
      type={type}
      className={cn('shad-primary-btn w-full', className)}
      variant={variant}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Image
            src="/assets/icons/loader.svg"
            width={24}
            height={24}
            alt="loader"
            className="animate-spin"
          />
          Loading...
        </div>
      ) : (
        children
      )}
    </Button>
  )
}
