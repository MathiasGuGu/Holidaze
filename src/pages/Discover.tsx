import CardList from "@/components/CardList";
import Pagination from "@/components/Pagination";
import VenueDiscoveryCard from "@/components/VenueDiscoveryCard";
import { useFetch } from "@/hooks/useFetch";
import { BASE_URL } from "@/lib/api";
import { venueType } from "@/lib/types";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

const PostLoader = () => {
  return (
    <CardList>
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="flex h-96  flex-col gap-2">
          <div className="w-full h-56 bg-gray-300 rounded-lg"></div>
          <div className="grid grid-rows-3 w-full  text-sm gap-1">
            <div className="flex gap-1 h-8 w-24 bg-zinc-300 rounded "></div>
            <div className="bg-zinc-300 w-6 h-8 rounded"></div>
          </div>
          <div className=" align-bottom bg-zinc-300 w-full h-8 rounded"></div>
        </div>
      ))}
    </CardList>
  );
};

const DiscoverFeed = ({
  searchParam,
  searchEmpty,
}: {
  searchParam: string;
  searchEmpty: boolean;
}) => {
  const [page, setPage] = useState(1);

  const {
    data: posts,
    loading,
    error,
  } = searchEmpty
    ? useFetch(`${BASE_URL}/holidaze/venues?page=${page}`)
    : useFetch(
        `${BASE_URL}/holidaze/venues/search?q=${searchParam}&page=${page}`
      );

  return (
    <div>
      <div className="w-screen h-48 mb-12 bg-gradient-to-r from-orange-300 to-rose-300"></div>

      {
        // If there is an error, display an error message
        error && <div>There was an error fetching the posts</div>
      }

      {
        // If the data is still loading, display a loading message
        loading && <PostLoader />
      }

      {
        // If the data has loaded, display the posts and the pagination
        <>
          <CardList>
            <AnimatePresence>
              {posts &&
                posts.data.map((post: venueType, index: number) => (
                  <VenueDiscoveryCard key={post.id} post={post} index={index} />
                ))}
            </AnimatePresence>
          </CardList>
          <Pagination
            page={page}
            pageCount={posts?.meta.pageCount}
            setPage={setPage}
          />
        </>
      }
    </div>
  );
};

const Discover = () => {
  let location = useLocation();
  let searchParams = new URLSearchParams(location.search);
  let search = searchParams.get("search");

  const searchIsEmpty =
    search === null || search === undefined || search.length === 0;

  return <DiscoverFeed searchParam={search!} searchEmpty={searchIsEmpty} />;
};

export default Discover;
