'use client'

import Image from 'next/image'
import { ColumnDef } from '@tanstack/react-table'

import { formatDateTime } from '@/lib/utils'
import { AppointmentStatusType, Doctors } from '@/constants'
import { Appointment } from '@/types/appwrite.types'
import { StatusBadge } from '@/components/status-badge'
import { AppointmentModal } from '@/components/appointment-modal'

export const columns: ColumnDef<Appointment>[] = [
  {
    header: 'ID',
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: 'patient',
    header: 'Patient',
    cell: ({ row }) => {
      const appointment = row.original
      return <p className="text-14-medium">{appointment.patient.name}</p>
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: 'schedule',
    header: 'Appointment',
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[100px]">
        {formatDateTime(row.original.schedule).dateTime}
      </p>
    ),
  },
  {
    accessorKey: 'primaryPhysician',
    header: 'Doctor',
    cell: ({ row }) => {
      const doctor = Doctors.find(
        (doc) => doc.name === row.original.primaryPhysician,
      )
      return (
        <div className="flex items-center gap-2.5">
          <Image
            src={doctor?.image ?? '/assets/icons/doctor-avatar.svg'}
            alt={doctor?.name ?? 'Doctor'}
            width={32}
            height={32}
            className="size-8"
            title={doctor?.name}
          />
          {doctor && <p className="whitespace-nowrap">Dr. {doctor.name}</p>}
        </div>
      )
    },
  },
  {
    id: 'actions',
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row: { original: data } }) => {
      return (
        <div className="flex gap-1">
          <AppointmentModal
            type={AppointmentStatusType.SCHEDULE}
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data}
          />
          <AppointmentModal
            type={AppointmentStatusType.CANCEL}
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data}
          />
        </div>
      )
    },
  },
]
