"use client"
import { RiFilmFill } from 'react-icons/ri';
import { TbDeviceTvOldFilled } from 'react-icons/tb';
import { ReactNode } from 'react';
import { Media } from '@/lib/types';

interface MovieCardDetailProps {
    text: string;
    icon?: ReactNode;
    isTrending: boolean;
}

function MovieCardDetail ({text, icon, isTrending}:MovieCardDetailProps) {
    return (
        <div className='flex items-center gap-[6px]'>
            {icon ? icon : <></>}
            <span 
                className={`
                    font-light text-pure-white-75
                    ${isTrending ? "text-[12px] text-body-m" : "text-[11px] text-body-s"}
                `}
            >
                {text}
            </span>
        </div>
    )
}

function MovieCardSeparator () {
    return <span className='h-[3px] w-[3px] rounded-full bg-half-pure-white'></span>
}

interface MovieDetailsProps {
    media: Media; 
    isTrending?: boolean;
}

export default function MovieDetails({media, isTrending = false}:MovieDetailsProps) {
    const isMovie = media.media_type == "movie";
    const releasedYear = media.release_date?.split("-")?.at(0) ?? "N/A"

    return (
        <>
            <div className='flex gap-2 items-center'>
                <MovieCardDetail text={releasedYear} isTrending={isTrending}/>
                <MovieCardSeparator />
                <MovieCardDetail 
                    text={isMovie ? "Movie" : "TV Series"} 
                    icon={isMovie 
                        ? <RiFilmFill size={14} className={`fill-pure-white-75`}/> 
                        : <TbDeviceTvOldFilled size={14} className={`fill-pure-white-75`}/>
                    }
                    isTrending={isTrending}
                />
                <MovieCardSeparator />
                <MovieCardDetail text={"N/A"} isTrending={isTrending}/>
            </div>
            <div 
                className={`
                    font-medium md:text-heading-s
                    ${isTrending ? "text-[15px] md:text-heading-s" : "text-[14px] md:text-heading-xs"}
                `}
            >
                {media.title}
            </div>
        </>
    )
}
