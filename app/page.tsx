import MovieGrid from "@/components/MovieGrid";
import MovieRow from "@/components/MovieRow";
import { fetchRecommended, fetchTrending } from "./api/data";

export default async function Home() {
  
  const trending = await fetchTrending();
  const recommended = await fetchRecommended();
  
  return (
      <div className="flex flex-col gap-6">
        <div className="pl-4 md:pl-6">
          <MovieRow label={"Trending"} medias={trending}/>
        </div>
        <div className="px-4 md:px-6">
          <MovieGrid label={"Top Rated"} medias={recommended}/>
        </div>
      </div>
  );
}
