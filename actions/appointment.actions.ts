'use server'

import { ID, Models, Query } from 'node-appwrite'
import { revalidatePath } from 'next/cache'

import {
  DATABASE_ID,
  databases,
  APPOINTMENT_COLLECTION_ID,
  messaging,
} from '@/lib/appwrite.config'
import { formatDateTime, parseStringify } from '@/lib/utils'
import { Appointment } from '@/types/appwrite.types'
import { AppointmentStatusType } from '@/constants'

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

export const getRecentAppointmentList =
  async (): Promise<AppointmentList | null> => {
    try {
      const appointments = await databases.listDocuments(
        DATABASE_ID!,
        APPOINTMENT_COLLECTION_ID!,
        [Query.orderDesc('$createdAt')],
      )

      const initialCounts = {
        scheduledCount: 0,
        pendingCount: 0,
        cancelledCount: 0,
      }

      const counts = (appointments.documents as Appointment[]).reduce(
        (acc, appointment) => {
          if (appointment.status === 'scheduled') {
            acc.scheduledCount += 1
          } else if (appointment.status == 'pending') {
            acc.pendingCount += 1
          } else if (appointment.status === 'cancelled') {
            acc.cancelledCount += 1
          }

          return acc
        },
        initialCounts,
      )

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

export const updateAppointment = async ({
  appointmentId,
  userId,
  appointment,
  type,
}: UpdateAppointmentParams): Promise<Appointment | null> => {
  try {
    const updatedAppointment = await databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment,
    )

    if (!updateAppointment) {
      throw new Error('Error! Appointment update failed.')
    }

    const smsMessage = `
    Thank you for choosing VitaCare!
    
    ${
      type === AppointmentStatusType.SCHEDULE
        ? ` Your appointment has been scheduled for ${formatDateTime(appointment?.schedule).dateTime} with Dr. ${appointment.primaryPhysician}`
        : ` We regret to inform you that your appointment has been cancelled. Reason for cancellation: ${appointment.cancellationReason}`
    }`

    await sendSmsNotification(userId, smsMessage)

    revalidatePath('/admin')

    return parseStringify(updatedAppointment)
  } catch (error) {
    console.error(error)
  }

  return null
}

export const sendSmsNotification = async (
  userId: string,
  content: string,
): Promise<Models.Message | null> => {
  try {
    const message = await messaging.createSms(
      ID.unique(),
      content,
      [],
      [userId],
    )

    if (message) return parseStringify(message)
  } catch (error) {
    console.error(error)
  }

  return null
}
