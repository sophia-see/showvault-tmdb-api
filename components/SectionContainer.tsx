"use client"
import React, { ReactNode } from 'react'

interface SectionContainerProps {
    label: string;
    children: ReactNode;
}

export default function SectionContainer({label, children}: SectionContainerProps) {
    return (
        <div className='flex flex-col gap-4 md:gap-6'>
            <span className='font-light text-[20px] md:text-heading-l tracking-[-0.31px]'>{label}</span>
            {children}
        </div>
    )
}
