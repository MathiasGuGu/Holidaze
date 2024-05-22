import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BASE_URL, getUserBookings, getUserVenues } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/authStore";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Ghost,
  Loader2,
  Plus,
  PlusCircle,
  Star,
  Wand,
  Wand2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useStore } from "zustand";
import { useMutation } from "@tanstack/react-query";
import { MagicWandIcon } from "@radix-ui/react-icons";

const VenueManagerForm = ({
  name,
  accessToken,
  apiKey,
}: {
  name: string;
  accessToken: string;
  apiKey: string;
}) => {
  const store: any = useStore(useAuthStore);
  const user = store.user;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const updateVenueManager = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(BASE_URL + "/holidaze/profiles/" + name, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": apiKey,
        },
        body: JSON.stringify({ venueManager: true }),
      });
      if (res.ok) {
        setIsLoading(false);
        // Update user in store
        user.venueManager = true;
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full mt-4">
        <div className="mt-4 text-lg font-bold bg-purple-400/30 text-purple-800 px-6 py-1 rounded-full">
          Sign Up Here
        </div>
      </DialogTrigger>
      <DialogContent className="h-auto ">
        <DialogTitle className="text-2xl">Become a venue manager</DialogTitle>
        <DialogDescription>
          <p>
            Become a venue manager and view your active venues. You can also
            manage your venues and bookings
          </p>
        </DialogDescription>
        <button
          onClick={() => {
            updateVenueManager();
          }}
          className="mt-4 text-lg font-bold bg-purple-400/30 text-purple-800 px-6 py-1 rounded-full"
        >
          Register as a venue manager
        </button>
      </DialogContent>
    </Dialog>
  );
};

const ProfileVenueShowcase = ({
  isVenueManager,
  accessToken,
  name,
  apiKey,
  tab,
}: {
  isVenueManager: boolean;
  accessToken: string;
  name: string;
  apiKey: string;
  tab: string;
}) => {
  if (!isVenueManager) {
    return (
      <div className="w-full h-96  flex flex-col items-center gap-4 justify-center font-para">
        <Star size={56} strokeWidth={1} className=" text-purple-400" />
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-2xl font-title">Become a venue manager</h3>
          <p>Become a venue manager and view your active venues</p>
          <VenueManagerForm
            name={name}
            accessToken={accessToken}
            apiKey={apiKey}
          />
        </div>
      </div>
    );
  }

  const {
    mutate: getVenues,
    isPending: isVenuesPending,
    data: venuesData,
    isError: isVenuesError,
  } = useMutation({
    mutationFn: () => getUserVenues(name, accessToken, apiKey),
    mutationKey: ["userVenues", name],
  });
  const {
    mutate: getBookings,
    isPending: isBookingsPending,
    data: bookingsData,
  } = useMutation({
    mutationFn: () => getUserBookings(name, accessToken, apiKey),
    mutationKey: ["userBookings", name],
  });

  useEffect(() => {
    if (tab === "venues") {
      getVenues();
    }
    if (tab === "bookings") {
      getBookings();
    }
  }, [tab]);

  return (
    <div className="w-full px-2 md:px-32 flex flex-col">
      <div className="w-full flex items-center gap-2 border-b pb-4 overflow-scroll">
        <Link
          to={"/profile?tab=venues"}
          className={cn({
            [" font-para font-semibold px-4 py-2 rounded-full text-text "]:
              true,
            [" bg-background text-purple-800 "]: tab === "venues",
          })}
        >
          Venues
        </Link>
        <Link
          to={"/profile?tab=bookings"}
          className={cn({
            [" font-para px-4 py-2 font-semibold rounded-full text-text "]:
              true,
            [" bg-background text-purple-800 "]: tab === "bookings",
          })}
        >
          Bookings
        </Link>

        <Link
          to={"/profile?tab=venue-bookings"}
          className={cn({
            [" font-para px-4 py-2 font-semibold rounded-full text-text "]:
              true,
            [" bg-background text-purple-800 "]: tab === "venue-bookings",
          })}
        >
          Venue Bookings
        </Link>
      </div>
      <section className="w-full mt-8  h-auto min-h-80">
        {tab === "venues" && (
          <div>
            {/* If Venues are pending  */}
            {isVenuesPending && (
              <div className="h-80 w-full flex items-center justify-center">
                <Loader2 size={48} className=" animate-spin" strokeWidth={1} />
              </div>
            )}
            {/* If Venues do NOT exist */}
            {venuesData && venuesData.data.length === 0 && (
              <div className="w-full h-[900px] md:h-[500px] grid grid-cols-1 md:grid-cols-3 grid-rows-4  md:grid-rows-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full bg-purple-100 rounded-lg flex flex-col gap-2 items-center justify-center text-purple-800 px-4 text-center text-balance py-2"
                >
                  <Wand2 strokeWidth={1} size={32} />
                  <p className="text-xl font-title font-bold">
                    Add your first venue
                  </p>

                  <Link
                    to={"/venues/create"}
                    className="bg-purple-200 text-purple-800 px-8 py-2 rounded-full mt-2"
                  >
                    Add Venue
                  </Link>
                </motion.div>
                {new Array(7).fill(0).map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index / 30 }}
                    className={cn({
                      ["w-full h-full bg-gradient-to-t  "]: true,
                      ["from-zinc-100 to-zinc-50"]: index < 2,
                      ["from-zinc-100 to-background-accent"]: index >= 2,
                    })}
                  ></motion.div>
                ))}
              </div>
            )}
            {/* If Venues exist */}
            {venuesData && venuesData.data.length > 0 && (
              <div className="w-full h-auto grid grid-cols-3 gap-8">
                {venuesData.data.map((venue, index: number) => (
                  <div
                    key={index}
                    className="w-full h-80 bg-gray-300 rounded-lg flex flex-col gap-2"
                  >
                    <div className="w-full h-56 bg-gray-300 rounded-lg"></div>
                    <div className="grid grid-rows-3 w-full  text-sm gap-1">
                      <div className="flex gap-1 h-8 w-24 bg-zinc-300 rounded "></div>
                      <div className="bg-zinc-300 w-6 h-8 rounded"></div>
                    </div>
                    <div className=" align-bottom bg-zinc-300 w-full h-8 rounded"></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {tab === "bookings" && (
          <div>
            {isBookingsPending && (
              <div className="h-80 w-full flex items-center justify-center">
                <Loader2 size={48} className=" animate-spin" strokeWidth={1} />
              </div>
            )}
            {bookingsData && bookingsData.data.length === 0 && (
              <div className="w-full h-80 flex flex-col items-center justify-center gap-4">
                <Ghost size={56} strokeWidth={1} />
                <div className="flex flex-col items-center">
                  <h3 className="text-2xl">
                    You do not have any active bookings
                  </h3>
                </div>
              </div>
            )}
            {bookingsData && bookingsData.data.length > 0 && (
              <div className="w-full h-auto grid grid-cols-1 md:grid-cols-3 gap-4">
                {bookingsData.data.map((booking: any, index: number) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index / 30 }}
                    key={index}
                    className="w-full h-48 bg-background rounded-lg flex flex-col gap-2 relative isolate"
                  >
                    <img
                      className="w-full h-48 object-cover rounded-lg absolute z-10"
                      src={booking.venue.media[0].url}
                    ></img>
                    <div className="w-full h-full bg-text/70 rounded-lg absolute z-20"></div>
                    <div className="w-full h-full flex flex-col px-6 py-6 z-20 text-white">
                      <p className="text-sm ">{booking.venue.name}</p>
                      <div className="text-lg font-bold mt-8 mb-2 flex flex-col gap-2">
                        <div>{new Date(booking.dateFrom).toDateString()}</div>
                        <ArrowDown size={24} strokeWidth={1} />
                        <div>{new Date(booking.dateTo).toDateString()}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

const Profile = () => {
  let location = useLocation();
  let searchParams = new URLSearchParams(location.search);
  let tab = searchParams.get("tab");
  if (tab === null) {
    window.location.href = "/profile?tab=venues";
  }

  const store: any = useStore(useAuthStore);
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

  const user: any = store.user;
  const accessToken = user.accessToken;
  const apiKey = user.data.key;
  const name = user.name;
  const isVenueManager = user.venueManager;

  return (
    <div className="w-screen h-auto flex flex-col relative isolate ">
      <motion.section className="w-full h-64 relative flex items-center justify-center isolate ">
        <div className=" flex flex-col md:flex-row items-center justify-center  gap-8 z-20">
          <img src={user.avatar.url} className="w-20 h-20 rounded-full"></img>
          <div className="w-full flex flex-col ">
            <h1 className="text-2xl font-title font-bold text-center md:text-start">
              {user.name}
            </h1>
            <div className="flex gap-4 mt-4 items-center">
              <button className=" text-white h-12 w-32 rounded-full bg-text">
                Edit Profile
              </button>

              <div>
                {isVenueManager ? (
                  <div className=" bg-purple-100 text-purple-600 px-4 py-1 font-bold rounded-full">
                    Venue Manager
                  </div>
                ) : (
                  <div className="  bg-purple-100 text-purple-600 px-4 py-1 font-bold rounded-full ">
                    Not a venue manager
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <img
          src={user.banner.url}
          alt="profile"
          className=" w-full h-full absolute  object-cover opacity-40 z-10"
        />
      </motion.section>
      <section className="w-full h-auto mt-20">
        <ProfileVenueShowcase
          accessToken={accessToken}
          name={name}
          apiKey={apiKey}
          tab={tab!}
          isVenueManager={isVenueManager}
        />
      </section>
    </div>
  );
};

export default Profile;
