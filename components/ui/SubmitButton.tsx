import React from 'react'
import { Button } from './button'
import Image from 'next/image'

interface ButtonProps{
    isLoading: boolean,
    childrean: React.ReactNode,
    classname?: string

}

const SubmitButton = ({isLoading, children, className}: ButtonProps) => {
  return (
    <Button type='submit' disabled={isLoading} className={className?? 'shad-primary-btn w-full'}>
        {isLoading ? (
        <div>
            <Image
            src="/assets/icons/loader.svg"
            alt="loader"
            height={24}
            width={24}
            className='animate-spins'/>
            Loading...
        </div>)
        : children}

    </Button>
  )
}

export default SubmitButton
