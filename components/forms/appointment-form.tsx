'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { SubmitButton } from '@/components/submit-button'
import { Form } from '@/components/ui/form'
import { CreateAppointmentSchema } from '@/schemas/create-appointment.schema'
import { CustomFormField } from '@/components/custom-form-field'
import { Doctors, FormFieldType } from '@/constants'
import { SelectItem } from '@/components/ui/select'
import { cn } from '@/lib/utils'

export const AppointmentForm = ({
  type,
  userId,
  patientId,
}: {
  type: 'create' | 'cancel' | 'schedule',
  userId: string,
  patientId: string
}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof CreateAppointmentSchema>>({
    resolver: zodResolver(CreateAppointmentSchema),
    defaultValues: {
      primaryPhysician: '',
      schedule: new Date(),
      reason: '',
      note: '',
      cancellationReason: ''
    },
  })

  let btnLabel
  switch (type) {
    case 'cancel':
      btnLabel = 'Cancel appointment'; break
    case 'schedule':
      btnLabel = 'Schedule appointment'; break
    default:
      btnLabel = 'Create appointment'; break
  }

  async function onSubmit(values: z.infer<typeof CreateAppointmentSchema>) {
    setIsLoading(true)

    try {
      // const userData = { name, email, phone }

      // const user = await createUser(userData)

      // if (user) {
      //   setIsLoading(false)
      //   router.push(`/patients/${user.$id}/register`)
      // }
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header">New Appointment</h1>
          <p className="text-dark-700">
            Request a new appointment in 10 seconds!
          </p>
        </section>

        {type === 'create' && (
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
              name='schedule'
              label='Expected appointment date'
              showTimeSelect
              timeFormat='HH:mm'
              dateFormat='dd/MM/yyyy - HH:mm'
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

        {type === 'cancel' && (
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
          className={cn('w-full',
            type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'
          )}
        >
          {btnLabel}
        </SubmitButton>
      </form>
    </Form>
  )
}