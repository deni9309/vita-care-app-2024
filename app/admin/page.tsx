import Image from 'next/image'
import Link from 'next/link'

import { getRecentAppointmentList } from '@/actions/appointment.actions'
import { StatusCard } from '@/components/status-card'
import { DataTable } from '@/components/table/data-table'
import { columns } from '@/components/table/columns'

export default async function Admin() {
  const appointments = await getRecentAppointmentList()

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" prefetch className="cursor-pointer">
          <Image
            src="/assets/vita-care-logo-noslogan.svg"
            alt="VitaCare logo"
            priority
            width={400}
            height={245}
            className="h-24 w-fit pt-2.5"
          />
        </Link>
        <p className="text-16-semibold max-sm:max-w-[95px]">Admin Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">
            Start the day with managing new appointments
          </p>
        </section>
        {appointments ? (
          <section className="admin-stat">
            <StatusCard
              type="appointments"
              count={appointments.scheduledCount}
              label="Scheduled appointments"
              icon="/assets/icons/appointments.svg"
            />
            <StatusCard
              type="pending"
              count={appointments.pendingCount}
              label="Pending appointments"
              icon="/assets/icons/pending.svg"
            />
            <StatusCard
              type="cancelled"
              count={appointments.cancelledCount}
              label="Cancelled appointments"
              icon="/assets/icons/cancelled.svg"
            />
          </section>
        ) : (
          <div className="flex h-[200px] w-full items-center rounded-2xl bg-gradient-to-r from-zinc-800 to-transparent pl-4 text-lg font-semibold text-white/95">
            <div>
              <span className="text-green-500">All done.</span> There are no
              current appointments to manage.
            </div>
          </div>
        )}

        {appointments && (
          <DataTable columns={columns} data={appointments.documents} />
        )}
      </main>
    </div>
  )
}
