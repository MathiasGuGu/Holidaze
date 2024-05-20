import { Ghost } from "lucide-react";

const VenuePostsEmpty = ({ searchParam }: { searchParam: string }) => {
  return (
    <div className="w-screen h-96 flex flex-col gap-2  items-center justify-center">
      <Ghost size={60} strokeWidth={1} />
      <div className="flex gap-2">
        <h2>Found no results for</h2>"{searchParam}"
      </div>
      <div className="text-text/60">
        Try searching for something else or check back later
      </div>
    </div>
  );
};

export default VenuePostsEmpty;
