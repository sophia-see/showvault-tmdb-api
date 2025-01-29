"use client"
import React, { ReactNode } from 'react'
import { CustomCardFooter } from '../custom-ui/card'

export default function FormFooter({text, children}: {text?: string, children: ReactNode}) {
	return (
		<CustomCardFooter>
			<p className='text-body-m text-pure-white'>
				{text}
				{children}
			</p>
		</CustomCardFooter>
	)
}
