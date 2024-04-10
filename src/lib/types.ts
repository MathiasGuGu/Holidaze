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
  id: "string";
  alt: "string";
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
