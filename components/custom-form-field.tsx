'use client'

import Image from 'next/image'
import { ControllerRenderProps, FieldValues, Form } from 'react-hook-form'
import { E164Number } from 'libphonenumber-js/core'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FormFieldType } from '@/constants'
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

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
    label,
    inputType,
    placeholder,
    autocomplete,
    showTimeSelect,
    dateFormat,
    renderSkeleton,
    children,
    disabled,
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
              className="ml-2 mr-2 h-[24px] w-[24px] my-auto"
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
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            {...field}
            placeholder={placeholder ?? 'Type here...'}
            disabled={disabled}
            className='shad-textArea'
          />
        </FormControl>
      )
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            {...field}
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
    case FormFieldType.DATE_PICKER:
      return (
        <div className='flex rounded-md border border-dark-500 bg-dark-400'>
          <Image
            src='/assets/icons/calendar.svg'
            width={24}
            height={24}
            alt='calendar'
            className='ml-2 mr-2 h-[24px] w-[24px] my-auto'
          />
          <FormControl>
            <DatePicker
              {...field}
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat={dateFormat ?? 'MM/dd/yyyy'}
              showTimeSelect={showTimeSelect ?? false}
              timeInputLabel='Time:'
              wrapperClassName='date-picker'
            />
          </FormControl>
        </div>
      )
    case FormFieldType.SELECT:
      return (
        <Label>
          <p className="shad-input-label pb-2">{label}</p>
          <FormControl id={field.name}>
            <Select
              name={field.name}
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <SelectTrigger className='shad-select-trigger'>
                <SelectValue placeholder={placeholder ?? 'Select from the list'} />
              </SelectTrigger>
              <SelectContent className='shad-select-content'>
                {children}
              </SelectContent>
            </Select>
          </FormControl>
        </Label>
      )
    case FormFieldType.SKELETON:
      return renderSkeleton ? (
        <FormControl>
          {renderSkeleton(field)}
        </FormControl>
      ) : null
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className='flex items-center gap-4'>
            <Checkbox
              id={name}
              name={name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <Label
              htmlFor={name}
              className='checkbox-label'>
              {label}
            </Label>
          </div>
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
          {
            fieldType !== FormFieldType.CHECKBOX &&
            fieldType !== FormFieldType.SELECT &&
            label && (
              <FormLabel className="shad-input-label">{label}</FormLabel>
            )}
          <RenderField field={field} props={props} />

          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  )
}
