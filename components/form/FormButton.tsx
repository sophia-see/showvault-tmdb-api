"use client"
import React from 'react'
import { CustomButton } from '../custom-ui/button'

export default function FormButton({label}:{label: string}) {
    return (
        <CustomButton 
            className='w-full py-[14px] box-border h-auto' 
            type="submit"
        >
            {label}
        </CustomButton>
    )
}