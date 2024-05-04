import Pagination from "@/components/Pagination";
import VenueDiscoveryCard from "@/components/VenueDiscoveryCard";
import { useFetch } from "@/hooks/useFetch";
import { BASE_URL } from "@/lib/api";
import { venueType } from "@/lib/types";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const PostLoader = () => {
  return <div>Loading...</div>;
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
          <div className="flex flex-wrap gap-8 items-center justify-center">
            {posts &&
              posts.data.map((post: venueType) => (
                <VenueDiscoveryCard key={post.id} post={post} />
              ))}
          </div>
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
