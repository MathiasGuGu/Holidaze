import { useForm } from "react-hook-form";
import HolidazeButton from "./ui/HolidazeButton";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { editVenue } from "@/lib/api";
import { useState } from "react";
import { cn } from "@/lib/utils";

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

const EditVenueSchema = z.object({
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
  price: z.string().default("0"),
  maxGuests: z.string().default("0"),
  rating: z.string().optional().default("0"),
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
      lat: z.string().optional().default("0"),
      lng: z.string().optional().default("0"),
    })
    .optional(),
});

const Input = ({
  name,
  useType,
  placeholder,
  register,
  error,
  checked,
  value,
}: any) => {
  if (useType === "checkbox") {
    return (
      <div className="flex items-center gap-4 text-lg font-title">
        <input
          defaultChecked={checked}
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
        defaultValue={value}
        type={useType}
        placeholder={`${placeholder}`}
        {...register(name)}
      />
      {error && <p>{error.message}</p>}
    </div>
  );
};

const EditVenueButton = ({
  accessToken,
  apiKey,
  venue,
}: {
  accessToken: string;
  apiKey: string;
  name: string;
  venue: any;
}) => {
  const [venueMedia, setVenueMedia] = useState<{}[]>([]); // [url, url, url
  const [currentMediaUrl, setCurrentMediaUrl] = useState<string>("");
  const [currentMediaAlt, setCurrentMediaAlt] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateVenueFormData>({
    resolver: zodResolver(EditVenueSchema),
  });

  const {
    mutate: editVenueMutation,
    isError,
    isPending,
  } = useMutation({
    mutationFn: async ({ accessToken, apiKey, data, venueId }: any) => {
      editVenue({ accessToken, apiKey, data, venueId });
    },
  });

  const submitFunction = (data: any) => {
    data.price = Number(data.price);
    data.maxGuests = Number(data.maxGuests);
    if (data.rating) data.rating = Number(data.rating);
    if (data.location && data.location.lat)
      data.location.lat = Number(data.location.lat);
    if (data.location && data.location.lng)
      data.location.lng = Number(data.location.lng);
    data.media = venueMedia;

    if (data.media.length === 0) {
      data.media.push({
        url: "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg",
      });
    }

    editVenueMutation({ data, accessToken, apiKey, venueId: venue.id });
  };

  return (
    <Dialog>
      <DialogTrigger className=" mt-4 text-white h-12 w-32 rounded-full bg-text">
        Edit Venue
      </DialogTrigger>
      <DialogContent className="w-[98vw] max-w-lg overflow-scroll pt-64 flex flex-col items-center justify-center md:pb-8 h-[95vh] md:h-[90vh] ">
        <DialogTitle className="text-lg">
          {isError ? "Error" : isPending ? "Loading" : "Edit Venue"}
        </DialogTitle>
        <form
          onSubmit={handleSubmit(submitFunction)}
          className=" grid grid-cols-1  md:grid-cols-2 gap-6 w-full max-w-3xl"
        >
          <Input
            name="name"
            useType="text"
            value={venue.name}
            placeholder={venue.name}
            register={register}
            error={errors.name}
          />
          <Input
            name="description"
            useType="text"
            value={venue.description}
            placeholder={venue.description}
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
              placeholder="Venue Media Alt"
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
            placeholder={"price: " + venue.price}
            value={venue.price}
            register={register}
            error={errors.price}
          />
          <Input
            name="maxGuests"
            useType="text"
            value={venue.maxGuests}
            placeholder={"max guests: " + venue.maxGuests}
            register={register}
            error={errors.maxGuests}
          />
          <Input
            name="rating"
            useType="text"
            value={venue.rating}
            placeholder={"rating: " + venue.rating}
            register={register}
            error={errors.rating}
          />
          <div className=" col-span-2 flex flex-wrap  gap-6">
            <Input
              name="meta.wifi"
              useType="checkbox"
              placeholder="Wifi"
              checked={venue.meta.wifi}
              register={register}
              error={errors.meta?.wifi}
            />

            <Input
              name="meta.parking"
              useType="checkbox"
              placeholder="Parking"
              checked={venue.meta.parking}
              register={register}
              error={errors.meta?.parking}
            />

            <Input
              name="meta.breakfast"
              useType="checkbox"
              placeholder="Breakfast"
              checked={venue.meta.breakfast}
              register={register}
              error={errors.meta?.breakfast}
            />

            <Input
              name="meta.pets"
              useType="checkbox"
              placeholder="Pets"
              checked={venue.meta.pets}
              register={register}
              error={errors.meta?.pets}
            />
          </div>
          <Input
            name="location.address"
            useType="text"
            value={venue.location.address}
            placeholder={"address: " + venue.location.address}
            register={register}
            error={errors.location?.address}
          />
          <Input
            name="location.city"
            useType="text"
            value={venue.location.city}
            placeholder={"city: " + venue.location.city}
            register={register}
            error={errors.location?.city}
          />
          <Input
            name="location.zip"
            useType="text"
            value={venue.location.zip}
            placeholder={"zip: " + venue.location.zip}
            register={register}
            error={errors.location?.zip}
          />
          <Input
            name="location.country"
            useType="text"
            value={venue.location.country}
            placeholder={"country: " + venue.location.country}
            register={register}
            error={errors.location?.country}
          />
          <Input
            name="location.continent"
            useType="text"
            value={venue.location.continent}
            placeholder={"continent: " + venue.location.continent}
            register={register}
            error={errors.location?.continent}
          />
          <Input
            name="location.lat"
            useType="text"
            value={venue.location.lat}
            placeholder={"lat: " + venue.location.lat}
            register={register}
            error={errors.location?.lat}
          />
          <Input
            name="location.lng"
            useType="text"
            value={venue.location.lng}
            placeholder={"lng: " + venue.location.lng}
            register={register}
            error={errors.location?.lng}
          />

          <button>submit</button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditVenueButton;
