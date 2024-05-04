import { z, ZodType } from "zod"; // Add new import

// __________________________________  BOOKING TYPES   _____________________________________________

export type bookingVenueType = {
  id: string;
  name: string;
  description: string;
  media: venueMediaType[];
  price: number;
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
  meta: venueMetaType;
};

export type bookingCustomerType = {
  name: string;
  email: string;
  bio: string;
  avatar: {
    url: string;
    alt: string;
  };
  banner: {
    url: string;
    alt: string;
  };
};

export type bookingType = {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  venue?: bookingVenueType;
  customer?: bookingCustomerType;
};

export enum bookingQueryParams {
  customer = "_customer",
  venue = "_venue",
}
// _______________________________________________________________________________________________

// __________________________________  VENUE TYPES   _____________________________________________

type venueMediaType = {
  url: string;
  alt: string;
};

type venueMetaType = {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
};

type venueLocationType = {
  address: string;
  city: string;
  zip: string;
  country: string;
  continent: string;
  lat: number;
  lng: number;
};

export type venueOwnerType = {
  name: string;
  email: string;
  bio: string;
  avatar: {
    url: string;
    alt: string;
  };
  banner: {
    url: string;
    alt: string;
  };
};

export type venueBookingsType = {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  customer: {
    name: string;
    email: string;
    bio: string;
    avatar: {
      url: string;
      alt: string;
    };
    banner: {
      url: string;
      alt: string;
    };
  };
};

export type venueType = {
  id: string;
  name: string;
  description: string;
  media: venueMediaType[];
  price: number;
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
  meta: venueMetaType;
  location: venueLocationType;
  owner?: venueOwnerType;
  bookings?: venueBookingsType[];
};

export enum venueQueryParams {
  owner = "_owner",
  bookings = "_bookings",
}

// _______________________________________________________________________________________________
// __________________________________  PROFILE TYPES   _____________________________________________

export type profileType = {
  name: string;
  email: string;
  banner: venueMetaType;
  avatar: venueMetaType;
  venueManager: boolean;
  _count: {
    bookings: number;
    venues: number;
  };

  bookings?: bookingType[];
  venues?: venueType[];
};

export enum profileQueryParams {
  bookings = "_bookings",
  venues = "_venues",
}

// _______________________________________________________________________________________________
// __________________________________  PROFILE TYPES   _____________________________________________

import { FieldError, UseFormRegister } from "react-hook-form";

export type RegisterFormData = {
  name?: string;
  email?: string;
  password: string;
  bio?: string;
  bannerUrl?: string;
  bannerAlt?: string;
  avatarUrl?: string;
  avatarAlt?: string;
  venueManager?: boolean;
};

export type FormFieldProps = {
  type: string;
  placeholder?: string;
  name: ValidRegisterNames;
  register: UseFormRegister<RegisterFormData>;
  error?: FieldError | undefined;
  valueAsNumber?: boolean;
  variant?: "primary" | "secondary" | "tertiary";
  size?: "sm" | "md" | "lg";
  className?: string;
};

export type ValidRegisterNames =
  | "email"
  | "name"
  | "password"
  | "bio"
  | "bannerUrl"
  | "bannerAlt"
  | "avatarUrl"
  | "avatarAlt"
  | "venueManager";

const exeptedNameCharacters = ["_"];

export const RegisterSchema: ZodType<RegisterFormData> = z
  .object({
    name: z
      .string()
      .min(3, "name-short")
      .max(50, "name-long")
      .refine(
        (val) =>
          val.split("").every((char) => {
            return (
              char.match(/[a-zA-Z0-9]/) || exeptedNameCharacters.includes(char)
            );
          }),
        {
          message: "name-invalid-char",
        }
      ),
    email: z.string().email("email-invalid").includes("@stud.noroff.no", {
      message: "email-not-noroff",
    }),
    password: z.string().min(8, "password-short"),

    bannerUrl: z
      .string()
      .url("banner-url-invalid")
      .optional()
      .default("")
      .or(z.literal("")),
    bannerAlt: z
      .string()
      .max(120, { message: "banner-alt-long" })
      .optional()
      .default(""),
    avatarUrl: z
      .string()
      .url("avatar-url-invalid")
      .optional()
      .or(z.literal("")),

    avatarAlt: z
      .string()
      .max(120, { message: "avatar-alt-long" })
      .optional()
      .default(""),

    bio: z
      .string()
      .max(120, { message: "bio-long" })
      .optional()
      .or(z.literal("")),

    venueManager: z.boolean(),
  })
  .refine(
    (data) => {
      return data.bannerAlt.length > 0 ? data.bannerUrl.length > 0 : true;
    },
    {
      message: "banner-required",
      path: ["bannerAlt"],
    }
  )
  .refine(
    (data) => {
      return data.avatarAlt.length > 0 ? data.avatarUrl!.length > 0 : true;
    },
    {
      message: "avatar-required",
      path: ["avatarAlt"],
    }
  );

export type LoginFormData = {
  name: string;
};

export type ValidLoginNames = "name" | "password";

export const LoginSchema: ZodType<RegisterFormData> = z.object({
  email: z.string().email("email-invalid").includes("@stud.noroff.no", {
    message: "email-not-noroff",
  }),
  password: z.string().min(8, "password-short"),
});
