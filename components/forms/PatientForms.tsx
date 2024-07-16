"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {Form} from "@/components/ui/form"
import CustomFormField from "@/components/ui/customFormField";
import SubmitButton from "../ui/SubmitButton"
import { useState } from "react"
import { userForm } from "@/lib/UserForm"
import { useRouter } from "next/navigation"
 

//Enum stands for "enumeration", it is a way to define a set of named constants. It ensures type safety and improves code readability. 
export enum FormFieldType{
  INPUT = 'input',
  TEXTAREA = 'textarea',
  PHONE_INPUT = 'phoneInput',
  CHECKBOX = 'checkbox',
  DATE_PICKER = 'datePicker',
  SELECT = 'select',
  SKELETON = 'skeleton'
}


 
const PatientForms=()=> {

  const [isLoading, setIsLoading] = useState(false);
  // Router from nex/navigation
  const router = useRouter();      
  // 1. Define your form.
  const form = useForm<z.infer<typeof userForm>>({
    resolver: zodResolver(userForm),
    defaultValues: {
      name: "",
      email: "",
      phone: ""
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit({name, email, phone}: z.infer<typeof userForm>) {
    setIsLoading(true);

    try {
      // const userData = { name, email, phone };

      // const user = await createUser(userData);

      // if(user) router.push(`/patients/${user.$id}/register`)

    } catch (error) {
      console.log(error);
    }
  }

  return(
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <section className="mb-12 space-y-4">
        <h1 className="header">Hi there!</h1>
        <p className="text-dark-700">Schedule your first appointment</p>
      </section>

      <CustomFormField 
        control = {form.control}
        fieldType = {FormFieldType.INPUT}
        name = "name"
        label = "Full name"
        placeholder= "John Doe"
        iconSrc =  "/assets/icons/user.svg"
        iconAlt= "user"
      />
      <CustomFormField 
        control = {form.control}
        fieldType = {FormFieldType.INPUT}
        name = "email"
        label = "Email"
        placeholder= "johndoe@gmail.com"
        iconSrc =  "/assets/icons/email.svg"
        iconAlt= "email"
      />
      <CustomFormField 
        control = {form.control}
        fieldType = {FormFieldType.PHONE_INPUT}
        name = "phone"
        label = "Phone number"
        placeholder= "5671382392"
      />

      <SubmitButton isLoading={ isLoading }>
        Get Started
      </SubmitButton>
    </form>
  </Form>
  )
}

export default PatientForms
