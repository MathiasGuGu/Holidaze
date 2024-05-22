export const bookingsLinks = {
  name: "Bookings",
  path: "/profile?tab=bookings",
  onlyMobile: false,
  description: "Manage your bookings",
  children: [
    {
      name: "My Bookings",
      description: "View and manage your bookings",
      path: "/profile?tab=bookings",
    },
    {
      name: "Upcoming Bookings",
      description: "View and manage your upcoming bookings",
      path: "/profile/bookings?status=upcoming",
    },
    {
      name: "See Venue Bookings",
      description: "View and manage your venue bookings",
      path: "/venue-bookings",
    },
  ],
};

export const venuesLinks = {
  name: "Venues",
  path: "/discover",
  onlyMobile: false,
  description: "Find the perfect venue for your event",
  children: [
    {
      name: "Your Venues",
      description: "Manage your venues",
      path: "/profile?tab=venues",
    },
    {
      name: "Create a Venue",
      description: "Add your venue to our platform",
      path: "/venues/create",
    },
  ],
};

export const navLinks = [
  {
    name: "Home",
    path: "/",
    onlyMobile: false,
  },
  {
    name: "Venues",
    path: "/discover",
    onlyMobile: false,
    description: "Find the perfect venue for your event",
    children: [
      {
        name: "Your Venues",
        description: "Manage your venues",
        path: "/profile?tab=venues",
      },

      {
        name: "Create a Venue",
        description: "Add your venue to our platform",
        path: "/venues/create",
      },
    ],
  },
  {
    name: "Bookings",
    path: "/",
    onlyMobile: false,
    description: "Manage your bookings",
    children: [
      {
        name: "My Bookings",
        description: "View and manage your bookings",
        path: "/profile?tab=bookings",
      },
      {
        name: "Upcoming Bookings",
        description: "View and manage your upcoming bookings",
        path: "/profile/bookings?status=upcoming",
      },
      {
        name: "See Venue Bookings",
        description: "View and manage your venue bookings",
        path: "/venue-bookings",
      },
    ],
  },
  {
    name: "Contact",
    path: "/contact",
    onlyMobile: true,
  },
];
