import { BASE_URL, getUserBookings } from "@/lib/api";
import { useAuthStore } from "@/stores/authStore";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useStore } from "zustand";

type bookingType = {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
};

type bookingData = {
  data: bookingType[];
};

// TODO: Add Data Type
const BookingItem = ({ data }: { data: bookingType }) => {
  return (
    <div className="w-full h-auto min-h-24  shadow rounded-lg px-4 py-2 bg-white border-l-4 border-blue-400 flex flex-col">
      <span className="text-xs text-zinc-500">{data.id}</span>
      <div className="flex gap-2 text-xl">
        <span>{new Date(data.dateFrom).toDateString()}</span>
        <ArrowRight size={24} strokeWidth={1} />
        <span>{new Date(data.dateTo).toDateString()}</span>
      </div>
      <div className="flex gap-2">
        <span>guests:</span>
        {data.guests}
      </div>
    </div>
  );
};

enum BookingStatus {
  UPCOMING = "upcoming",
  PAST = "past",
  ALL = "all",
  CANCELLED = "cancelled",
}

const BookingList = ({
  iterator,
  filter,
}: {
  iterator: bookingType[];
  filter: string;
}) => {
  const [filteredData, setFilteredData] = useState<bookingType[]>(iterator);

  function filterBookings(data: bookingType[], filter: string) {
    switch (filter) {
      case BookingStatus.UPCOMING:
        return data.filter((item) =>
          new Date(item.dateFrom) > new Date() ? true : false
        );
      case BookingStatus.PAST:
        return data.filter((item) =>
          new Date(item.dateTo) < new Date() ? true : false
        );
      case BookingStatus.CANCELLED:
        return data;
      default:
        return data;
    }
  }

  useEffect(() => {
    console.log("filter", filter);
    setFilteredData((prev) => filterBookings(iterator, filter));
  }, [filter]);

  return (
    <div className="w-full h-auto flex flex-col gap-2 ">
      {filteredData.map((item, index) => {
        return <BookingItem key={index} data={item} />;
      })}
    </div>
  );
};

const MyBookings = () => {
  // get the status query from url
  let location = useLocation();
  let searchParams = new URLSearchParams(location.search);
  let status = searchParams.get("status");

  const store: any = useStore(useAuthStore);
  const user = store.user;
  const key = user.data.key;
  const { accessToken } = user;
  const endpoint = `${BASE_URL}/holidaze/profiles/${user.name}/bookings`;

  const {
    mutate: getBookings,
    data,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: () => getUserBookings(user.name, accessToken, key),
    mutationKey: ["getUserBookings", user.name],
  });

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <div className="w-full h-auto flex flex-col items-center gap-4 pt-4 pb-4">
      <section className="w-full md:w-2/3 max-w-6xl  flex flex-col gap-3">
        <h1 className="text-2xl font-title">Your Bookings</h1>
        {!isPending && data && (
          <BookingList iterator={data.data} filter={status} />
        )}
      </section>
    </div>
  );
};

export default MyBookings;
