import { venueType } from "@/lib/types";
import VenueCardMedia from "./VenueCardMedia";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const VenueDiscoveryCard = ({
  post,
  index,
}: {
  post: venueType;
  index: number;
}) => {
  const { media, owner, name, location, price, id, maxGuests } = post;
  const { address, city, country } = location;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex h-[340px] flex-col gap-2"
    >
      {media.length > 0 ? (
        <VenueCardMedia media={media} postId={id} />
      ) : (
        <div className="flex w-full h-56 bg-red-300 rounded-lg"></div>
      )}
      <Link to={`/discover/${id}`} className="grid grid-rows-3 w-full text-sm ">
        <div className="flex flex-col overflow-hidden">
          <h1 className=" font-para text-lg font-bold">{name}</h1>

          <div className="flex gap-1  truncate max-w-full ">
            {city ? <p>{city}, </p> : <p>no city, </p>}
            {country ? <p>{country}</p> : <p>no country</p>}
          </div>
        </div>
        <div className=" align-bottom font-medium text-lg font-para">
          {price} nok / night
        </div>
      </Link>
    </motion.div>
  );
};

export default VenueDiscoveryCard;
