import MovieGrid from "@/components/MovieGrid";
import { Show } from "@/lib/types";
import { getMatchedShows } from "@/lib/utils";

interface HomeProps {
    searchParams?: Promise<{
        term?: string;
    }>;
  }
  

export default async function Home({ searchParams }: Readonly<HomeProps>) {
  const term = (await searchParams)?.term || '';

  const matchedShows = getMatchedShows(term) as Show[];
  
  return (
    <div className="px-4 md:px-6">
      <MovieGrid label={`Found ${matchedShows.length} results for '${term}'`} movies={matchedShows}/>
    </div>
  );
}
