/* eslint-disable no-unused-vars */

declare interface CustomFormFieldProps {
  control: Control<FieldValues>
  fieldType: FormFieldType
  inputType?: 'text' | 'password' | 'number'
  name: string
  label?: string
  placeholder?: string
  autocomplete?: React.HTMLInputAutoCompleteAttribute
  iconSrc?: string
  iconAlt?: string
  disabled?: boolean
  dateFormat?: string
  timeFormat?: string
  showTimeSelect?: boolean
  children?: React.ReactNode
  renderSkeleton?: (field: ControllerRenderProps<FieldValues, string>) => React.ReactNode
}

declare type SearchParamProps = {
  params: { [key: string]: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

declare type Gender = "male" | "female" | "other"
declare type Status = "pending" | "scheduled" | "cancelled"

declare interface CreateUserParams {
  name: string
  email: string
  phone: string
}

declare interface User extends CreateUserParams {
  $id: string
}

declare interface RegisterUserParams extends CreateUserParams {
  userId: string
  birthDate: Date
  gender: Gender
  address: string
  occupation: string
  emergencyContactName: string
  emergencyContactNumber: string
  primaryPhysician: string
  insuranceProvider: string
  insurancePolicyNumber: string
  allergies?: string | undefined
  currentMedication?: string | undefined
  familyMedicalHistory?: string | undefined
  pastMedicalHistory?: string | undefined
  identificationType?: string | undefined
  identificationNumber?: string | undefined
  identificationDocument?: FormData | undefined
  privacyConsent: boolean
}

declare type CreateAppointmentParams = {
  userId: string
  patient: string
  primaryPhysician: string
  reason: string
  schedule: Date
  status: Status
  note: string | undefined
}

declare type UpdateAppointmentParams = {
  appointmentId: string
  userId: string
 // timeZone: string
  appointment: Appointment
  type: string
}

declare type AppointmentList = {
  documents: Appointment[]
  scheduledCount: number
  pendingCount: number
  cancelledCount: number
  totalCount: number
}