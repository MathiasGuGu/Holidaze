import { venueType } from "@/lib/types";

const VenueDiscoveryCard = ({ post }: { post: venueType }) => {
  const { media, owner, name, description } = post;
  console.log(name);

  return <div>VenueDiscoveryCard</div>;
};

export default VenueDiscoveryCard;
