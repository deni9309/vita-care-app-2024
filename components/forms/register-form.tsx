'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { RegisterFormSchema } from '@/schemas/RegisterForm.schema'
import { createUser } from '@/actions/patient.actions'
import { Doctors, FormFieldType, GenderOptions } from '@/constants'
import { Form, FormControl, FormLabel, FormItem } from '@/components/ui/form'
import { CustomFormField } from '@/components/custom-form-field'
import { SubmitButton } from '@/components/submit-button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { SelectItem } from '@/components/ui/select'

export const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      privacyConsent: false,
      birthDate: undefined,
      gender: undefined,
      occupation: undefined,
      emergencyContactName: undefined,
      emergencyContactNumber: undefined,
      primaryPhysician: undefined,
      insuranceProvider: undefined,
      insurancePolicyNumber: undefined,
      allergies: undefined,
      currentMedication: undefined,
      familyMedicalHistory: undefined,
      pastMedicalHistory: undefined,
      identificationType: undefined,
      identificationNumber: undefined,
      identificationDocument: undefined
    }
  })

  async function onSubmit({ name, email, phone }: z.infer<typeof RegisterFormSchema>) {
    setIsLoading(true)

    try {
      const userData = { name, email, phone }
      const user = await createUser(userData)

      if (user) {
        setIsLoading(false)
        router.push(`/patients/${user.$id}/register`)
      }
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-12">
        <section className="space-y-4">
          <h1 className="header">Welcome</h1>
          <p className="text-dark-700">Let us know more about yourself.</p>
        </section>

        <section className="space-y-6">
          <div className='mb-9 space-y-1'>
            <h2 className="sub-header">Personal Information</h2>
          </div>
        </section>
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          label='Full Name'
          name="name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />
        <div className='flex flex-col gap-6 xl:flex-row'>
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="email"
            label="Email"
            placeholder="johndoe@example.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.PHONE_INPUT}
            name="phone"
            label="Phone Number"
            placeholder="(+359) 879 555 333"
          />
        </div>
        <div className='flex flex-col gap-6 xl:flex-row'>
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.DATE_PICKER}
            name="birthDate"
            label="Date of Birth"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SKELETON}
            name="gender"
            renderSkeleton={(field) => (
              <Label>
                <span className='shad-input-label'>Gender</span>
                <RadioGroup
                  {...field}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className='flex h-11 mt-2 gap-6 xl:justify-between'
                >
                  {GenderOptions.map(option => (
                    <FormItem key={option} className='radio-group'>
                      <FormControl>
                        <RadioGroupItem value={option} />
                      </FormControl>
                      <FormLabel className='cursor-pointer !mt-0'>
                        {option}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </Label>
            )}
          />
        </div>
        <div className='flex flex-col gap-6 xl:flex-row'>
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="address"
            label="Address"
            placeholder="14th Street, New York"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="occupation"
            label="Occupation"
            placeholder="Engineer"
          />
        </div>
        <div className='flex flex-col gap-6 xl:flex-row'>
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="emergencyContactName"
            label="Emergency contact name"
            placeholder="Guardian's name"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.PHONE_INPUT}
            name="emergencyContactNumber"
            label="Emergency contact number"
            placeholder="(+359) 777 555 333"
          />
        </div>

        <section className="space-y-6">
          <div className='mb-9 space-y-1'>
            <h2 className="sub-header">Medical Information</h2>
          </div>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.SELECT}
          name="primaryPhysician"
          label="Primary Physician"
          placeholder="Select a physician"
        >
          {Doctors.map(doctor => (
            <SelectItem key={doctor.name} value={doctor.name}>
              <div className='flex items-center gap-2 cursor-pointer'>
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  width={32}
                  height={32}
                  className='rounded-full border border-dark-500'
                />
                <p>{doctor.name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>

        <SubmitButton isLoading={isLoading}>
          Get Started
        </SubmitButton>
      </form>
    </Form>
  )
}
