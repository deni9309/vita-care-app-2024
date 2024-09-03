'use client'

import { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  createAppointment,
  updateAppointment,
} from '@/actions/appointment.actions'
import { Appointment } from '@/types/appwrite.types'
import { getAppointmentSchema } from '@/schemas/appointment.schemas'
import { AppointmentStatusType, Doctors, FormFieldType } from '@/constants'
import { cn } from '@/lib/utils'
import { SubmitButton } from '@/components/submit-button'
import { Form } from '@/components/ui/form'
import { CustomFormField } from '@/components/custom-form-field'
import { SelectItem } from '@/components/ui/select'

export const AppointmentForm = ({
  type = AppointmentStatusType.CREATE,
  userId,
  patientId,
  appointment,
  setOpen,
}: {
  type: AppointmentStatusType
  userId: string
  patientId: string
  appointment?: Appointment
  setOpen?: Dispatch<SetStateAction<boolean>>
}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const AppointmentFormSchema = getAppointmentSchema(type)

  let btnLabel
  switch (type) {
    case AppointmentStatusType.CANCEL:
      btnLabel = 'Cancel appointment'
      break
    case AppointmentStatusType.SCHEDULE:
      btnLabel = 'Schedule appointment'
      break
    default:
      btnLabel = 'Create appointment'
  }

  const form = useForm<z.infer<typeof AppointmentFormSchema>>({
    resolver: zodResolver(AppointmentFormSchema),
    defaultValues: {
      primaryPhysician: appointment ? appointment.primaryPhysician : '',
      schedule: appointment
        ? new Date(appointment.schedule)
        : new Date(Date.now()),
      reason: appointment?.reason || '',
      note: appointment?.note || '',
      cancellationReason: appointment?.cancellationReason || '',
    },
  })

  async function onSubmit(values: z.infer<typeof AppointmentFormSchema>) {
    setIsLoading(true)

    let status: Status
    switch (type) {
      case AppointmentStatusType.SCHEDULE:
        status = 'scheduled'
        break
      case AppointmentStatusType.CANCEL:
        status = 'cancelled'
        break
      default:
        status = 'pending'
    }

    try {
      if (type === AppointmentStatusType.CREATE && patientId) {
        const appointmentData: CreateAppointmentParams = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          note: values.note,
          status,
        }

        const appointment = await createAppointment(appointmentData)

        if (appointment) {
          setIsLoading(false)
          form.reset()

          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`,
          )
        }
      } else {
        if (!appointment) {
          setIsLoading(false)
          return
        }

        const appointmentToUpdate = {
          userId,
          appointmentId: appointment.$id,
          appointment: {
            primaryPhysician: values.primaryPhysician,
            schedule: new Date(values.schedule),
            status,
            cancellationReason: values.cancellationReason,
          },
          type,
        }

        const updatedAppointment = await updateAppointment(appointmentToUpdate)

        if (updatedAppointment) {
          setOpen && setOpen(false)
          form.reset()
        }
      }
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }

    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        {type === AppointmentStatusType.CREATE && (
          <section className="mb-12 space-y-4">
            <h1 className="header">New Appointment</h1>
            <p className="text-dark-700">
              Request a new appointment in 10 seconds!
            </p>
          </section>
        )}

        {type !== AppointmentStatusType.CANCEL && (
          <>
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.SELECT}
              name="primaryPhysician"
              label="Doctor"
              placeholder="Select a doctor"
            >
              {Doctors.map((doctor, i) => (
                <SelectItem key={doctor.name + i} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      width={32}
                      height={32}
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.DATE_PICKER}
              name="schedule"
              label="Expected appointment date"
              showTimeSelect
              timeFormat="HH:mm"
              dateFormat="dd/MM/yyyy - HH:mm"
            />
            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.TEXTAREA}
                name="reason"
                label="Reason for appointment"
                placeholder="Enter the reason for the medical appointment..."
              />
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.TEXTAREA}
                name="note"
                label="Notes (if any)"
                placeholder="Enter your notes here..."
              />
            </div>
          </>
        )}

        {type === AppointmentStatusType.CANCEL && (
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="cancellationReason"
            label="Reason for cancellation"
            placeholder="Enter reason for cancellation..."
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          className={cn(
            'w-full',
            type === AppointmentStatusType.CANCEL
              ? 'shad-danger-btn'
              : 'shad-primary-btn',
          )}
        >
          {btnLabel}
        </SubmitButton>
      </form>
    </Form>
  )
}
