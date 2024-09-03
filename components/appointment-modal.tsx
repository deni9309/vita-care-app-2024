'use client'

import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { AppointmentForm } from '@/components/forms/appointment-form'
import { Appointment } from '@/types/appwrite.types'
import { AppointmentStatusType } from '@/constants'

interface AppointmentModalProps {
  type: AppointmentStatusType
  patientId: string
  userId: string
  appointment: Appointment
}

export const AppointmentModal = ({
  type,
  patientId,
  userId,
  appointment,
}: AppointmentModalProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            'font-semibold capitalize',
            type === 'schedule' && 'text-green-400',
          )}
        >
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog max-sm:mx-1 sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">{type} Appointment</DialogTitle>
          <DialogDescription>
            Please, fill in the following details to {type} an appointment.
          </DialogDescription>
        </DialogHeader>

        <AppointmentForm
          userId={userId}
          patientId={patientId}
          type={type}
          appointment={appointment}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  )
}
