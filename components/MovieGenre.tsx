"use client"

import * as React from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Genre } from "@/lib/types"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

type Checked = DropdownMenuCheckboxItemProps["checked"]

interface MovieGenreProps {
    movieGenres?: Genre[];
    selectedGenres?: string[];
}

export function MovieGenre({movieGenres, selectedGenres}: MovieGenreProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [filteredGenre, setFilteredGenre] = React.useState<string[]>(selectedGenres ?? []);

    const onUpdateFilteredGenre = (genre: Genre, isChecked: boolean) => {
        
        const newGenres = isChecked ? filteredGenre.filter(i => i != genre.id.toString()) : [...filteredGenre, genre.id,toString()]
        setFilteredGenre(newGenres as string[]);
    }
    
    const onApplyFilter = () => {
        const params = new URLSearchParams(searchParams);

        if (filteredGenre.length) {
            params.set("genre", encodeURI(filteredGenre.map(i => i).join(" OR ")))
        } else {
            params.delete("genre")
        }

        replace(`${pathname}?${params.toString()}`)
    }

    return (
        <div className="flex gap-4">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">Filter</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="end" className="w-56 bg-greyish-blue text-pure-white">
                    <DropdownMenuLabel>Genre</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-slate-400"/>
                    <ScrollArea className="h-72 w-full overflow-auto scrollbar-none ">
                        {movieGenres?.map((genre) => {
                            const isChecked = !!filteredGenre.find(i => i == genre.id.toString());
                            return (
                                <DropdownMenuCheckboxItem
                                    checked={isChecked}
                                    onCheckedChange={() => onUpdateFilteredGenre(genre, isChecked)}
                                    key={genre.id}
                                    className="cursor-pointer"
                                    onSelect={(event) => event.preventDefault()} // ⬅️ Prevents dropdown from closing
                                >
                                    {genre.name}
                                </DropdownMenuCheckboxItem>
                            )
                        })}              
                    </ScrollArea>   
                </DropdownMenuContent>
            </DropdownMenu>
            <Button className="bg-greyish-blue hover:bg-slate-400" onClick={onApplyFilter}>Apply</Button>
        </div>
    )
}
