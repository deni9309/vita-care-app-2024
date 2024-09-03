import Image from 'next/image'

import { cn } from '@/lib/utils'

interface StatusCardProps {
  type: 'appointments' | 'pending' | 'cancelled'
  count?: number
  label: string
  icon: string
}

export const StatusCard = ({
  type,
  count = 0,
  label,
  icon,
}: StatusCardProps) => {
  return (
    <div
      className={cn('stat-card', {
        'bg-appointments': type === 'appointments',
        'bg-pending': type === 'pending',
        'bg-cancelled': type === 'cancelled',
      })}
    >
      <div className="flex items-center gap-4">
        <Image
          src={icon}
          alt={label}
          width={32}
          height={32}
          className="h-8 w-fit"
        />
        <h2 className="text-32-bold text-white">{count}</h2>
      </div>

      <p className="text-14-regular">{label}</p>
    </div>
  )
}
