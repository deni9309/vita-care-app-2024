import { StatusIcon } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <div
      className={cn('status-badge', {
        'bg-green-600': status === 'scheduled',
        'bg-blue-600': status === 'pending',
        'bg-red-600': status === 'cancelled',
      })}
    >
      <Image
        src={StatusIcon[status]}
        alt={status}
        width={24}
        height={24}
        className="h-fit w-3"
      />
      <p
        className={cn('text-[12px] font-bold capitalize tracking-wider', {
          'text-green-400': status === 'scheduled',
          'text-blue-400': status === 'pending',
          'text-red-400': status === 'cancelled',
        })}
      >
        {status}
      </p>
    </div>
  )
}
