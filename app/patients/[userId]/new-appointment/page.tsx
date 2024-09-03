import Image from 'next/image'

import { AppointmentForm } from '@/components/forms/appointment-form'
import { getPatient } from '@/actions/patient.actions'
import { AppointmentStatusType } from '@/constants'

export default async function NewAppointment({
  params: { userId },
}: SearchParamProps) {
  const patient = await getPatient(userId)
  if (!patient) return null

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/vita-care-logo.svg"
            alt="VitaCare Logo"
            width={400}
            height={245}
            className="w-[200px]"
            priority
          />

          <AppointmentForm
            type={AppointmentStatusType.CREATE}
            userId={userId}
            patientId={patient.$id}
          />

          <p className="copyright py-12">© 2024 VitaCare</p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        alt="Medical Appointment Photo"
        width={1000}
        height={1000}
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  )
}
