"use client"
import { RiFilmFill } from 'react-icons/ri';
import { TbDeviceTvOldFilled } from 'react-icons/tb';
import { ReactNode } from 'react';
import { Show } from '@/lib/types';

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
    movie: Show; 
    isTrending?: boolean;
}

export default function MovieDetails({movie, isTrending = false}:MovieDetailsProps) {
    const isMovie = movie.category == "Movie";

    return (
        <>
            <div className='flex gap-2 items-center'>
                <MovieCardDetail text={movie.year.toString()} isTrending={isTrending}/>
                <MovieCardSeparator />
                <MovieCardDetail 
                    text={movie.category} 
                    icon={isMovie 
                        ? <RiFilmFill size={14} className={`fill-pure-white-75`}/> 
                        : <TbDeviceTvOldFilled size={14} className={`fill-pure-white-75`}/>
                    }
                    isTrending={isTrending}
                />
                <MovieCardSeparator />
                <MovieCardDetail text={movie.rating} isTrending={isTrending}/>
            </div>
            <div 
                className={`
                    font-medium md:text-heading-s
                    ${isTrending ? "text-[15px] md:text-heading-s" : "text-[14px] md:text-heading-xs"}
                `}
            >
                {movie.title}
            </div>
        </>
    )
}
