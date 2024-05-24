import CardList from "@/components/CardList";
import Pagination from "@/components/Pagination";
import VenueDiscoveryCard from "@/components/VenueDiscoveryCard";
import { getVenuesBySearch } from "@/lib/api";
import { venueType } from "@/lib/types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import VenueDiscoverySearch from "@/components/VenueDiscoverySearch";
import VenuePostsEmpty from "@/components/VenuePostsEmpty";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";

const PostLoader = () => {
  return (
    <CardList>
      {Array.from({ length: 8 }).map((_, index) => (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.5, delay: Math.min(index / 10, 0.1) }}
          key={index}
          className="flex h-96  flex-col gap-2"
        >
          <div className="w-full h-56 bg-gray-200 rounded-lg"></div>
          <div className="grid grid-rows-3 w-full  text-sm gap-1">
            <div className="flex gap-1 h-8 w-24 bg-zinc-300 rounded "></div>
            <div className="bg-zinc-300 w-6 h-8 rounded"></div>
          </div>
          <div className=" align-bottom bg-zinc-300 w-full h-8 rounded"></div>
        </motion.div>
      ))}
    </CardList>
  );
};

const DiscoverFeed = ({ searchParam }: { searchParam: string }) => {
  const [page, setPage] = useState(1);
  const [isPostsEmpty, setIsPostsEmpty] = useState(false);

  //   const {
  //     data: posts,
  //     loading,
  //     error,
  //   } = searchEmpty
  //     ? useFetch(`${BASE_URL}/holidaze/venues?page=${page}`)
  //     : useFetch(
  //         `${BASE_URL}/holidaze/venues/search?q=${searchParam}&page=${page}`
  //       );

  let {
    mutate: getAllVenues,
    data: posts,
    isPending,
    isError,
  } = useMutation({
    mutationFn: ({ searchParam, page }: { searchParam: any; page: any }) =>
      getVenuesBySearch(searchParam, page),
    mutationKey: ["getVenuesBySearch", searchParam, page],
  });

  useEffect(() => {
    getAllVenues({ searchParam, page });
    setIsPostsEmpty(false);
  }, [searchParam, page]);

  useEffect(() => {
    if (!isPending && !isError && posts?.data.length === 0) {
      setIsPostsEmpty(true);
    }
  }, [posts]);

  return (
    <div>
      <VenueDiscoverySearch
        page={page}
        searchParam={searchParam}
        mutation={getAllVenues}
      />
      {
        // If there is an error, display an error message
        isError && <div>There was an error fetching the posts</div>
      }

      {
        // If the data is still loading, display a loading message
        isPending && <PostLoader />
      }

      {
        // If the data has loaded, display the posts and the pagination
        <>
          <CardList>
            {!isError &&
              !isPending &&
              posts &&
              posts?.data.map((post: venueType) => (
                <VenueDiscoveryCard key={post.id} post={post} />
              ))}
          </CardList>
          {isPostsEmpty ? (
            <VenuePostsEmpty searchParam={searchParam} />
          ) : (
            <Pagination
              page={page}
              pageCount={posts?.meta.pageCount}
              setPage={setPage}
            />
          )}
        </>
      }
    </div>
  );
};

const Discover = () => {
  let location = useLocation();
  let searchParams = new URLSearchParams(location.search);
  let search = searchParams.get("search");

  return <DiscoverFeed searchParam={search!} />;
};

export default Discover;
