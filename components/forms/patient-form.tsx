'use client'

import { useState } from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { UserFormSchema } from '@/schemas/userForm.schema'
import { Form } from '@/components/ui/form'
import { CustomFormField } from '@/components/custom-form-field'
import { FormFieldType } from '@/constants'
import { SubmitButton } from '@/components/submit-button'

export const PatientForm = () => {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: { name: '', email: '', phone: '' },
  })

  function onSubmit(values: z.infer<typeof UserFormSchema>) {
    setIsLoading(true)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header">Welcome</h1>
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
          placeholder="(+359) 879 555 333"
        />

        <SubmitButton isLoading={isLoading}>
          Get Started
        </SubmitButton>
      </form>
    </Form>
  )
}
