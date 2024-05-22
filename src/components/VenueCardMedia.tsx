import { venueMediaType } from "@/lib/types";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const VenueCardMedia = ({
  media,
  postId,
}: {
  media: venueMediaType[];
  postId: string;
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [count, setCount] = useState(0);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel setApi={setApi} className="relative w-auto h-56 group z-40">
      <Link to={`/discover/${postId}`}>
        <CarouselContent>
          {media.map((item, index) => {
            return (
              <CarouselItem key={index} className="h-56">
                <img
                  src={item.url}
                  alt={item.alt}
                  className="w-full h-full object-cover rounded"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Link>
      <div className="absolute bottom-2 right-2 text-white text-sm bg-black bg-opacity-50 rounded-md px-2 py-1">
        {current}/{count}
      </div>
      <CarouselPrevious className="absolute left-2 disabled:opacity-0 group-hover:opacity-100 group-hover:disabled:opacity-0 opacity-0 transition-all duration-500" />
      <CarouselNext className="absolute right-2 disabled:opacity-0 group-hover:opacity-100 group-hover:disabled:opacity-0 opacity-0 transition-all duration-500" />
    </Carousel>
  );
};

export default VenueCardMedia;
