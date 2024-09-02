'use server'

import { ID, Query } from 'node-appwrite'

import {
  BUCKET_ID,
  DATABASE_ID,
  databases,
  ENDPOINT,
  APPOINTMENT_COLLECTION_ID,
  PROJECT_ID,
  storage,
  users,
} from '@/lib/appwrite.config'
import { parseStringify } from '@/lib/utils'
import { Appointment } from '@/types/appwrite.types'

export const createAppointment = async (
  appointment: CreateAppointmentParams,
): Promise<Appointment | null> => {
  try {
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment,
    )

    if (newAppointment) return parseStringify(newAppointment)
  } catch (error) {
    console.error(error)
  }

  return null
}

export const getAppointment = async (
  appointmentId: string,
): Promise<Appointment | null> => {
  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
    )

    if (appointment) return parseStringify(appointment)
  } catch (error) {
    console.error(error)
  }

  return null
}

export const getRecentAppointmentList = async (): Promise<AppointmentList | null> => {
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc('$createdAt')]
    )

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    }

    const counts = (appointments.documents as Appointment[]).reduce((acc, appointment) => {
      if (appointment.status === 'scheduled') {
        acc.scheduledCount += 1
      } else if (appointment.status == 'pending') {
        acc.pendingCount += 1
      } else if (appointment.status === 'cancelled') {
        acc.cancelledCount += 1
      }

      return acc
    }, initialCounts)

    const data: AppointmentList = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents as Appointment[],
    }

    if (data) return parseStringify(data)
  } catch (error) {
    console.error(error)
  }

  return null
}