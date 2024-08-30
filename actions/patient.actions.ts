'use server'

import { AppwriteException, ID, Query } from 'node-appwrite'
import { InputFile } from 'node-appwrite/file'

import {
  BUCKET_ID,
  DATABASE_ID,
  databases,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  storage,
  users,
} from '@/lib/appwrite.config'
import { parseStringify } from '@/lib/utils'
import { Patient } from '@/types/appwrite.types'

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name,
    )

    return parseStringify(newUser)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal('email', [user.email])])

      return documents?.users[0]
    }
  }
}

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId)

    return parseStringify(user)
  } catch (error) {
    console.error(error)
  }
}

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    let file

    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get('blobFile') as Blob,
        identificationDocument?.get('fileName') as string,
      )

      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile)
    }

    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
        ...patient,
      },
    )

    return parseStringify(newPatient)
  } catch (error) {
    console.error(error)
  }
}

export const getPatient = async (userId: string): Promise<Patient | undefined> => {
  let patient

  try {
    const patients = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal('userId', userId)]
    )

    patient = patients.documents[0] as Patient
  } catch (error) {
    console.error(error)
  }

  return parseStringify(patient)
}