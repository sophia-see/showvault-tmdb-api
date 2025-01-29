import MovieGrid from "@/components/MovieGrid";
import MovieRow from "@/components/MovieRow";
import { Show } from "@/lib/types";
import { getRecommenededShows, getTrendingShows } from "@/lib/utils";

export default function Home() {
  const trendingShows = getTrendingShows() as Show[];
  const recommendedShows = getRecommenededShows() as Show[];
  
  return (
      <div className="flex flex-col gap-6">
        <div className="pl-4 md:pl-6">
          <MovieRow label={"Trending"} movies={trendingShows}/>
        </div>
        <div className="px-4 md:px-6">
          <MovieGrid label={"Recommended for you"} movies={recommendedShows}/>
        </div>
      </div>
  );
}
