import MovieGrid from "@/components/MovieGrid";
import { fetchMediaSearch } from "../api/data";
import { QueryList } from "@/lib/types";
import MoviePagination from "@/components/MoviePagination";

interface HomeProps {
  searchParams?: Promise<{
      term?: string;
      page?: string;
  }>;
}


export default async function Home({ searchParams }: Readonly<HomeProps>) {
  const term = (await searchParams)?.term || '';
  const page = (await searchParams)?.page || '1';

  const {results: matchedShows, hasNextPage, hasPrevPage} = await fetchMediaSearch(term, page) as QueryList;
  
  return (
    <div className="px-4 md:px-6">
      <div className="flex flex-col gap-6">
        <MovieGrid label={`Found ${matchedShows.length} results for '${term}'`} medias={matchedShows}/>
        <div className='ml-auto'>
          <MoviePagination hasPrevPage={hasPrevPage} hasNextPage={hasNextPage}/>
        </div>
      </div>
    </div>
  );
}
