"use client"

import React, { ReactNode } from 'react'
import { CustomCard, CustomCardHeader } from '../custom-ui/card'

export default function FormContainer({label, children}:{label: string, children: ReactNode}) {
    return (
        <CustomCard>
            <CustomCardHeader>
                <div className='text-heading-l'>{label}</div>
            </CustomCardHeader>
            {children}
        </CustomCard>
    )
}
