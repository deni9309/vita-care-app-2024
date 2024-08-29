'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { UserFormSchema } from '@/schemas/user-form.schema'
import { createUser } from '@/actions/patient.actions'
import { FormFieldType } from '@/constants'
import { Form } from '@/components/ui/form'
import { CustomFormField } from '@/components/custom-form-field'
import { SubmitButton } from '@/components/submit-button'

export const RegisterUserForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: { name: '', email: '', phone: '' },
  })

  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormSchema>) {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there 👋</h1>
          <p className="text-dark-700">
            Schedule your first medical appointment right away!
          </p>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="name"
          label="Full Name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />
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
          placeholder="(+359) 879 55 333"
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  )
}
