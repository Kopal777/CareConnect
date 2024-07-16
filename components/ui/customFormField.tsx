"use-client"

import React from 'react'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control } from 'react-hook-form'
import { FormFieldType } from '../forms/PatientForms'
import Image from 'next/image'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

//Interface is a way to define the shape(properties) of an object.
//React: props are passed as plain javascript objects.
//Typescript: interface defines the expected shape of the props object and ensures type safety during development.

interface CustomProps {
    control: Control<any>,
    fieldType: FormFieldType,
    name: string,
    label?: string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field: any) => React.ReactNode
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
    const { placeholder, iconSrc, iconAlt, fieldType } = props;
    switch (fieldType) {
        case FormFieldType.INPUT:
            return (
                <div className='flex rounded-md border border-dark-500 bg-dark-400'>
                    {iconSrc && (
                        <Image
                            src={iconSrc}
                            alt={iconAlt || 'icon'}
                            height={24}
                            width={24}
                            className='ml-2' />
                    )}
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            {...field}
                            className='shad-input border-0' />
                    </FormControl>
                </div>
            )
        case FormFieldType.PHONE_INPUT:
            return (
                <FormControl>
                    <PhoneInput
                        defaultCountry='IN'
                        placeholder={placeholder}
                        international
                        withCountryCallingCode
                        value={field.value as E164Number | undefined}
                        onChange={field.onChange}
                        className='input-phone'
                    />
                </FormControl>
            )

        default:
            break;
    }
}

function CustomFormField(props: CustomProps) {
    const { control, fieldType, name, label } = props;
    return (
        <div>
            {/* control is a key part of the react-hook-form library that helps manage form state, validation, and input registration. */}
            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <FormItem className="flex-1">
                        {fieldType !== FormFieldType.CHECKBOX && label && (
                            <FormLabel>
                                {label}
                            </FormLabel>
                        )}

                        <RenderField field={field} props={props} />
                        <FormMessage className='shad-error' />

                    </FormItem>
                )}
            />
        </div>
    )
}

export default CustomFormField