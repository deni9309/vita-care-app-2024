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

export const getAppointment = async (appointmentId: string): Promise<Appointment | null> => {
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
