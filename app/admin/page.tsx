import Image from 'next/image';
import Link from 'next/link';

import { StatusCard } from '@/components/status-card';
import { getRecentAppointmentList } from '@/actions/appointment.actions';

export default async function Admin() {
  const appointments = await getRecentAppointmentList()

  return (
    <div className='flex flex-col space-y-14 max-w-7xl mx-auto'>
      <header className='admin-header'>
        <Link
          href='/'
          prefetch
          className='cursor-pointer'
        >
          <Image
            src='/assets/vita-care-logo-noslogan.svg'
            alt='VitaCare logo'
            priority
            width={400}
            height={245}
            className="h-24 pt-2.5 w-fit"
          />
        </Link>
        <p className='text-16-semibold max-sm:max-w-[95px]'>Admin Dashboard</p>
      </header>

      <main className='admin-main'>
        <section className='w-full space-y-4'>
          <h1 className='header'>Welcome 👋</h1>
          <p className='text-dark-700'>Start the day with managing new appointments</p>
        </section>
        {appointments ? (
          <section className='admin-stat'>
            <StatusCard
              type='appointments'
              count={appointments.scheduledCount}
              label='Scheduled appointments'
              icon='/assets/icons/appointments.svg'
            />
            <StatusCard
              type='pending'
              count={appointments.pendingCount}
              label='Pending appointments'
              icon='/assets/icons/pending.svg'
            />
            <StatusCard
              type='cancelled'
              count={appointments.cancelledCount}
              label='Cancelled appointments'
              icon='/assets/icons/cancelled.svg'
            />
          </section>
        ) : (
          <div className='font-semibold text-lg bg-gradient-to-r from-zinc-800 to-transparent  w-full text-white/95 rounded-2xl flex pl-4 items-center h-[200px]'>
            <div>
              <span className='text-green-500'>All done.</span> There are no current appointments to manage.
            </div>
          </div>
        )}
      </main>
    </div>
  )
}