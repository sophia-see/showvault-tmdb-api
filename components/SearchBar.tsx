"use client"

import React, { useEffect, useState } from 'react'
import { CustomSearchInput } from './custom-ui/search-input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchBar() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const [searchVal, setSearchVal] = useState(searchParams.get("term")?.toString() ?? '');
    const isSearch = pathname == "/search"
        
    const handleSearch = useDebouncedCallback((search) => {
        const params = new URLSearchParams(searchParams);
        if (search) {
            params.set('term', search);
            replace(`/search?${params.toString()}`);
        } else {
            params.delete('term');

            if (isSearch)
                replace("/");
        }
    }, 500);

    useEffect(() => {
        handleSearch(searchVal)
    }, [searchVal, handleSearch]);

    useEffect(() => {
        if (!isSearch) setSearchVal("")
    }, [pathname, isSearch])

    // Conditionally hide navbar on login/signup pages
    if (pathname === "/login" || pathname === "/sign-up") {
        return null;
    }

    return (
        <div className='px-[16px] md:px-[24px]'>
            <CustomSearchInput className="my-[24px]" placeholder="Search for movies or TV series" value={searchVal} onChange={(e) => setSearchVal(e.target.value)}/> 
        </div>
    )
}
