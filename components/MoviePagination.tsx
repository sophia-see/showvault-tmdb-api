"use client"

import React from 'react'
import { CustomButton } from './custom-ui/button'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function MoviePagination({hasPrevPage, hasNextPage}:{hasPrevPage: boolean; hasNextPage: boolean}) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();
    const onPrevPage = () => {
        const params = new URLSearchParams(searchParams)
        const pageQuery = params.get("page") ?? "1";
        const nextPage = parseInt(pageQuery) - 1;

        params.set("page", nextPage.toString());
        replace(`${pathname}?${params.toString()}`)
    }

    const onNextPage = () => {
        const params = new URLSearchParams(searchParams)
        const pageQuery = params.get("page") ?? "1";
        const nextPage = parseInt(pageQuery) + 1;

        params.set("page", nextPage.toString());
        replace(`${pathname}?${params.toString()}`)
    }

    return (
        <div className='space-x-4'>
            <CustomButton 
                onClick={hasPrevPage ? onPrevPage : undefined}
                disabled={!hasPrevPage}
                className='bg-greyish-blue text-pure-white hover:bg-transparent hover:border hover:border-greyish-blue'
            >
                Back
            </CustomButton>
            <CustomButton 
                onClick={hasNextPage ? onNextPage : undefined}
                disabled={!hasNextPage}
            >
                Next
            </CustomButton>
        </div>
    )
}
