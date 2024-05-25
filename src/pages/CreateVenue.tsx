import HolidazeButton from "@/components/ui/HolidazeButton";
import { createVenue } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useStore } from "zustand";

interface CreateVenueFormData {
  name: string;
  description: string;
  media?: {
    url: string;
    alt: string;
  }[];
  price: number;
  maxGuests: number;
  rating?: number;
  meta?: {
    wifi: boolean;
    parking: boolean;
    breakfast: boolean;
    pets: boolean;
  };
  location?: {
    address: string;
    city: string;
    zip: string;
    country: string;
    continent: string;
    lat: number;
    lng: number;
  };
}

const CreateVenueSchema = z.object({
  name: z.string().min(1).max(40),
  description: z.string().min(1).max(600),
  media: z
    .array(
      z.object({
        url: z.string().url().optional(),
        alt: z.string().optional(),
      })
    )
    .optional(),
  price: z.coerce.number().max(10000).min(0).default(0),
  maxGuests: z.coerce.number().default(0),
  rating: z.coerce.number().optional().default(0),
  meta: z
    .object({
      wifi: z.boolean().optional(),
      parking: z.boolean().optional(),
      breakfast: z.boolean().optional(),
      pets: z.boolean().optional(),
    })
    .optional(),
  location: z
    .object({
      address: z.string().optional(),
      city: z.string().optional(),
      zip: z.string().optional(),
      country: z.string().optional(),
      continent: z.string().optional(),
      lat: z.coerce.number().optional().default(0),
      lng: z.coerce.number().optional().default(0),
    })
    .optional(),
});

const Input = ({ name, useType, placeholder, register, error }: any) => {
  if (useType === "checkbox") {
    return (
      <div className="flex items-center gap-4 text-lg font-title">
        <input
          className="w-6 h-6"
          id={name + "-input"}
          type={useType}
          {...register(name)}
        />
        <label htmlFor={name + "-input"} className="flex flex-col">
          <p className="text-sm text-zinc-500">
            {
              // @ts-ignore
              {
                "meta.wifi": "Includes",
                "meta.parking": "Includes",
                "meta.breakfast": "Includes",
                "meta.pets": "Allows",
              }[name]
            }
          </p>
          {placeholder}
        </label>
        {error && <p>{error.message}</p>}
      </div>
    );
  }

  return (
    <div>
      <input
        className={cn({
          ["border-red-500"]: error,
          ["py-2 bg-background w-full rounded-lg px-4"]: true,
        })}
        id={name + "-input"}
        type={useType}
        placeholder={`${placeholder}`}
        {...register(name)}
      />
      {error && <p>{error.message}</p>}
    </div>
  );
};

const CreateVenue = () => {
  const [venueMedia, setVenueMedia] = useState<{ url: string; alt: string }[]>(
    []
  ); // [url, url, url
  const [currentMediaUrl, setCurrentMediaUrl] = useState<string>("");
  const [currentMediaAlt, setCurrentMediaAlt] = useState<string>("");

  const store: any = useStore(useAuthStore); // Get the store instance

  const isLoggedIn = store.isLoggedIn;

  // TODO: Redirect back
  if (!isLoggedIn) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold">
          Please log in to view your profile
        </h1>
      </div>
    );
  }

  const accessToken = store.accessToken;
  const apiKey = store.apiKey.key;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateVenueFormData>({
    resolver: zodResolver(CreateVenueSchema),
  });

  const { mutate: createVenueAction, isPending } = useMutation({
    mutationFn: (data: any) => createVenue(data, accessToken, apiKey),
  });

  const submitFunction = (data: CreateVenueFormData) => {
    data.media = venueMedia;
    createVenueAction(data);
  };

  // TODO: Probably take image urls in a textarea and split them by new line
  return (
    <div className="w-screen h-auto flex flex-col items-center justify-center py-12 px-2">
      <div className="w-full max-w-3xl my-6">
        <h1 className="text-3xl font-title">Add your venue</h1>
        <p>
          Please fill out the form below so people can start visiting your
          venue.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(submitFunction)}
        className=" grid grid-cols-1  md:grid-cols-2 gap-6 w-full max-w-3xl"
      >
        <Input
          name="name"
          useType="text"
          placeholder="Venue Name"
          register={register}
          error={errors.name}
        />
        <Input
          name="description"
          useType="text"
          placeholder="Venue Description"
          register={register}
          error={errors.description}
        />
        <div className=" col-span-2 flex flex-col gap-3">
          <h2 className="text-lg font-title">Venue Media</h2>
          <div className="flex flex-col gap-1 ml-3 text-zinc-500">
            <p>Selected media:</p>
            <ul>
              {venueMedia.map((url: any) => (
                <li>{url.url}</li>
              ))}
            </ul>
          </div>
          <input
            onChange={(e) => setCurrentMediaUrl(e.target.value)}
            type="text"
            placeholder="Venue Media"
            className="py-2 bg-background w-full rounded-lg px-4"
          />
          <input
            onChange={(e) => setCurrentMediaAlt(e.target.value)}
            type="text"
            placeholder="Venue Media"
            className="py-2 bg-background w-full rounded-lg px-4"
          />
          <HolidazeButton
            variant="primary"
            type="button"
            onClick={() => {
              setVenueMedia([
                ...venueMedia,
                { url: currentMediaUrl, alt: currentMediaAlt },
              ]);
            }}
          >
            Add Image
          </HolidazeButton>
        </div>

        <Input
          name="price"
          useType="text"
          placeholder="Venue Price"
          register={register}
          error={errors.price}
        />
        <Input
          name="maxGuests"
          useType="text"
          placeholder="Max Guests"
          register={register}
          error={errors.maxGuests}
        />
        <Input
          name="rating"
          useType="text"
          placeholder="Rating"
          register={register}
          error={errors.rating}
        />
        <div className=" col-span-2 flex flex-wrap  gap-6">
          <Input
            name="meta.wifi"
            useType="checkbox"
            placeholder="Wifi"
            register={register}
            error={errors.meta?.wifi}
          />

          <Input
            name="meta.parking"
            useType="checkbox"
            placeholder="Parking"
            register={register}
            error={errors.meta?.parking}
          />

          <Input
            name="meta.breakfast"
            useType="checkbox"
            placeholder="Breakfast"
            register={register}
            error={errors.meta?.breakfast}
          />

          <Input
            name="meta.pets"
            useType="checkbox"
            placeholder="Pets"
            register={register}
            error={errors.meta?.pets}
          />
        </div>
        <Input
          name="location.address"
          useType="text"
          placeholder="Address"
          register={register}
          error={errors.location?.address}
        />
        <Input
          name="location.city"
          useType="text"
          placeholder="City"
          register={register}
          error={errors.location?.city}
        />
        <Input
          name="location.zip"
          useType="text"
          placeholder="Zip"
          register={register}
          error={errors.location?.zip}
        />
        <Input
          name="location.country"
          useType="text"
          placeholder="Country"
          register={register}
          error={errors.location?.country}
        />
        <Input
          name="location.continent"
          useType="text"
          placeholder="Continent"
          register={register}
          error={errors.location?.continent}
        />
        <Input
          name="location.lat"
          useType="text"
          placeholder="Latitude"
          register={register}
          error={errors.location?.lat}
        />
        <Input
          name="location.lng"
          useType="text"
          placeholder="Longitude"
          register={register}
          error={errors.location?.lng}
        />

        <button>{isPending ? "Creating venue..." : "Create Venue"}</button>
      </form>
    </div>
  );
};

export default CreateVenue;
