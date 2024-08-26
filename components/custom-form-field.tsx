'use client'

import Image from 'next/image'
import { ControllerRenderProps, FieldValues } from 'react-hook-form'
import { E164Number } from 'libphonenumber-js/core'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FormFieldType } from '@/constants'

const RenderField = ({
  field,
  props,
}: {
  field: ControllerRenderProps<FieldValues, string>
  props: CustomFormFieldProps
}) => {
  const {
    fieldType,
    iconSrc,
    iconAlt,
    name,
    inputType,
    placeholder,
    autocomplete,
  } = props

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || name}
              width={24}
              height={24}
              className="ml-2 mr-2"
            />
          )}
          <FormControl>
            <Input
              {...field}
              {...(inputType && { type: inputType })}
              {...(placeholder && { placeholder })}
              autoComplete={autocomplete ?? 'off'}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      )
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="BG"
            value={field.value as E164Number | undefined}
            placeholder={placeholder}
            international
            withCountryCallingCode
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      )
    default:
      break
  }
}

export const CustomFormField = (props: CustomFormFieldProps) => {
  const { control, fieldType, name, label } = props
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className="shad-input-label">{label}</FormLabel>
          )}
          <RenderField field={field} props={props} />

          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  )
}
