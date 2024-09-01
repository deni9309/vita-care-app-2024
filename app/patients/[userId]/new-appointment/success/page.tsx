import Image from 'next/image'
import Link from 'next/link'

import { getAppointment } from '@/actions/appointment.actions'
import { Doctors } from '@/constants'
import { formatDateTime } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export default async function Success({
  params: { userId },
  searchParams
}: SearchParamProps) {
  const appointmentId = (searchParams?.appointmentId as string) || ''
  const appointment = await getAppointment(appointmentId)

  if (!appointment) return null

  const doctor = Doctors.find(doctor => doctor.name === appointment.primaryPhysician)
  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/" prefetch>
          <Image
            src="/assets/vita-care-logo.svg"
            alt="VitaCare logo"
            width={1000}
            height={1000}
            className="h-[140px] w-fit"
          />
        </Link>

        <section className="flex flex-col items-center">
          <div className="relative mb-6 mt-2 h-[70px] w-[70px] rounded-full bg-green-100">
            <Image
              src="/assets/gifs/success2.gif"
              alt="success"
              fill
              priority
              sizes="50"
              unoptimized
            />
          </div>
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p>We will be in touch shortly to confirm.</p>
        </section>

        <section className="request-details">
          <p>Requested appointment details:</p>
          <div className="flex items-center gap-3">
            <Image
              src={doctor?.image ?? '/assets/icons/doctor-avatar.svg'}
              width={100}
              height={100}
              alt='doctor'
              priority
              className='size-11'
            />
            <p className='whitespace-nowrap'>Dr. {doctor?.name}</p>
          </div>
          <div className='flex gap-2'>
            <Image
              src='/assets/icons/calendar.svg'
              alt='calendar'
              width={24}
              height={24}
            />
            <p>{formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>

        <Button
          variant='default'
          className='shad-primary-btn'
          asChild
        >
          <Link
            href={`/patients/${userId}/new-appointment`}
            prefetch
          >
            Schedule Appointment
          </Link>
        </Button>

        <p className="copyright py-12">© 2024 VitaCare</p>
      </div>
    </div>
  )
}
