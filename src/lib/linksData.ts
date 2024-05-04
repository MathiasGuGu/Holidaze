export const navLinks = [
  {
    name: "Home",
    path: "/",
    onlyMobile: false,
  },
  {
    name: "Venues",
    path: "/",
    onlyMobile: false,
    description: "Find the perfect venue for your event",
    children: [
      {
        name: "Your Venues",
        description: "Manage your venues",
        path: "/venues",
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
        path: "/my-bookings",
      },
      {
        name: "Upcoming Bookings",
        description: "View and manage your upcoming bookings",
        path: "/upcoming-bookings",
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
