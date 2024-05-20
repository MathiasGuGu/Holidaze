import VenuBookingCalendar from "@/components/VenuBookingCalendar";
import HolidazeButton from "@/components/ui/HolidazeButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFetch } from "@/hooks/useFetch";
import { BASE_URL } from "@/lib/api";
import { venueMediaType, venueType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/authStore";
import { PersonIcon } from "@radix-ui/react-icons";
import {
  Car,
  Coins,
  Dog,
  Globe,
  MailIcon,
  PersonStanding,
  Soup,
  User,
  Wifi,
} from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useStore } from "zustand";

const VenueLoading = () => {
  return (
    <div className="w-full h-full  flex gap-3">
      <div className="w-[70%] h-full border rounded-lg"></div>
      <div className="w-[30%] h-full  flex flex-col gap-4">
        <div className="w-full h-40 border rounded-lg"></div>
        <div className="w-full h-40 border rounded-lg"></div>
        <div className="w-full h-40 border rounded-lg"></div>
      </div>
    </div>
  );
};

const VenueMedia = ({ media }: { media: venueMediaType[] }) => {
  return (
    <section className="w-screen h-auto min-h-[500px]  flex items-center justify-center gap-3 pt-6 pb-10 px-36">
      <div className="w-[65%] h-[500px] rounded-lg  relative">
        <img
          src={media[0].url}
          alt={media[0].alt}
          className="w-full h-full rounded-lg object-cover"
        />
      </div>
      <div className="w-[35%] h-[500px] rounded-lg  grid grid-cols-2 grid-rows-2 gap-2 relative">
        {media.slice(1).map((item, index) => {
          if (index <= 3) {
            return (
              <div key={index} className={cn("w-full h-full rounded-lg ")}>
                <img
                  src={item.url}
                  alt={item.alt}
                  className="w-full h-full rounded-lg object-cover"
                />
              </div>
            );
          } else {
            return (
              <HolidazeButton
                type="button"
                variant="primary"
                className=" absolute bottom-4 right-4"
              >
                View All
              </HolidazeButton>
            );
          }
        })}
      </div>
    </section>
  );
};

const Venue = () => {
  const store: any = useStore(useAuthStore);

  // TODO: Import user profile type
  const user: any = store.user;

  const { accessToken } = user;
  const { data: apiKeyData } = user;
  const { key } = apiKeyData;

  let loc = useLocation();
  let id = loc.pathname.split("/")[loc.pathname.split("/").length - 1];

  // get venue data from API
  const { data, error, loading } = useFetch(
    `${BASE_URL}/holidaze/venues/${id}?_owner=true&_bookings=true`
  );

  if (loading) {
    return <VenueLoading />;
  }

  if (error) {
    return <div>Error</div>;
  }

  const venue: venueType = data.data;

  const {
    media,
    name,
    maxGuests,
    location,
    description,
    price,
    owner,
    meta,
    id: venueId,
    bookings,
  } = venue;

  return (
    <div className="flex flex-col w-screen h-auto pt-12">
      <h1 className="w-screen px-36 text-3xl font-title">{name}</h1>
      <VenueMedia media={media} />
      <section className="w-screen px-36 flex gap-3 pb-20 relative">
        <div className="w-[65%] h-auto   flex items-start flex-col p-4 gap-6">
          <div className="w-full h-auto   flex items-start  gap-6">
            <p className=" flex gap-2 items-center text-lg">
              <Globe size={24} strokeWidth={1} />
              {location.city} - {location.country}
            </p>
            <div className=" flex gap-2 items-center text-lg">
              <User size={24} strokeWidth={1.5} />
              {maxGuests}
              <p className="text-sm text-zinc-500">(max guests)</p>
            </div>
            <div className=" flex gap-2 items-center text-lg">
              <Coins size={24} strokeWidth={1.5} />
              {price}nok
              <p className="text-sm text-zinc-500">(per night)</p>
            </div>
          </div>

          <div className="flex flex-col gap-6 my-6 border-t border-b w-full py-4">
            <div>
              <p className="text-lg font-semibold">Amenities</p>
            </div>
            {
              <div className="flex gap-4 items-center">
                <Wifi size={24} strokeWidth={1.5} />
                <div className="flex flex-col">
                  Wifi:
                  {meta.wifi ? (
                    <p className="font-bold">included</p>
                  ) : (
                    <p className="font-bold">Not included</p>
                  )}
                </div>
              </div>
            }
            {
              <div className="flex gap-4 items-center">
                <Soup size={24} strokeWidth={1.5} />
                <div className="flex flex-col">
                  Breakfast:
                  {meta.breakfast ? (
                    <p className="font-bold">included</p>
                  ) : (
                    <p className="font-bold">Not included</p>
                  )}
                </div>
              </div>
            }
            {
              <div className="flex gap-4 items-center">
                <Dog size={24} strokeWidth={1.5} />
                <div className="flex flex-col">
                  Pets:
                  {meta.pets ? (
                    <p className="font-bold">Pets are allowed</p>
                  ) : (
                    <p className="font-bold">Pets are not allowed</p>
                  )}
                </div>
              </div>
            }
            {
              <div className="flex gap-4 items-center">
                <Car size={24} strokeWidth={1.5} />
                <div className="flex flex-col">
                  Parking:
                  {meta.parking ? (
                    <p className="font-bold">Provided</p>
                  ) : (
                    <p className="font-bold">Not provided</p>
                  )}
                </div>
              </div>
            }
          </div>
          <div>
            <p className="text-lg font-semibold">Description</p>
            <div className="text-zinc-500">{description}</div>
          </div>
        </div>
        <div className="w-[35%] sticky top-12 h-fit shadow-lg bg-white flex flex-col justify-between gap-3 p-4  rounded-lg text-zinc-500">
          <div className="flex flex-col gap-3">
            <div className="flex gap-3 items-center">
              {owner?.avatar && (
                <Avatar>
                  <AvatarImage src={owner.avatar.url} alt={owner.name} />
                  <AvatarFallback>User </AvatarFallback>
                </Avatar>
              )}
              <div className=" ">
                Hosted by: <p className="text-text font-bold">{owner?.name}</p>
              </div>
            </div>
          </div>
          <VenuBookingCalendar
            maxGuests={maxGuests}
            name={name}
            bookings={bookings}
            venueId={venueId}
            accessToken={accessToken}
            apiKey={key}
          />
        </div>
      </section>
    </div>
  );
};

export default Venue;
