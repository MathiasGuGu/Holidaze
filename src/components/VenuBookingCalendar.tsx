import HolidazeButton from "./ui/HolidazeButton";
import { Calendar } from "./ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { addDays, set } from "date-fns";
import { DateRange } from "react-day-picker";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/lib/api";
import { useStore } from "zustand";
import { useAuthStore } from "@/stores/authStore";
import { Loader2 } from "lucide-react";

const VenuBookingCalendar = ({
  name,
  bookings,
  maxGuests,
  venueId,
  accessToken,
  apiKey,
}: {
  name: string;
  maxGuests: number;
  bookings: any;
  venueId: string;
  accessToken: string;
  apiKey: string;
}) => {
  const initialRange: DateRange = {
    from: new Date(),
    to: addDays(new Date(), 4),
  };

  enum BookingStatus {
    Pending = "pending",
    Confirmed = "confirmed",
    Idle = "idle",
    Failed = "failed",
  }

  const [bookingSuccess, setBookingSuccess] = useState<string>(
    BookingStatus.Idle
  );
  const [range, setRange] = useState<DateRange | undefined>(initialRange);
  const [guestNumber, setGuestNumber] = useState<number>(1);
  const [rangeError, setRangeError] = useState<string | undefined>(undefined);

  function getAllDatesFromRange(start: Date, end: Date) {
    const dates = [];
    let currentDate = new Date(start);

    while (currentDate <= end) {
      dates.push(new Date(currentDate).toDateString());
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }

  const busyDates = bookings.map((booking: any) => {
    const startDate = new Date(booking.dateFrom);
    const endDate = new Date(booking.dateTo);
    return getAllDatesFromRange(startDate, endDate);
  });

  const handleBookingSubmit = async () => {
    if (!range) {
      setRangeError("Please select a date range");
      return;
    }
    if (!guestNumber || guestNumber > maxGuests) {
      setRangeError("Please select a permitted number of guests");
      return;
    }

    console.log("Booking submitted!");

    try {
      setBookingSuccess(BookingStatus.Pending);
      let booking = await fetch(BASE_URL + "/holidaze/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": apiKey,
        },
        body: JSON.stringify({
          dateFrom: range.from,
          dateTo: range.to,
          guests: guestNumber,
          venueId: venueId,
        }),
      });
      console.log(booking);
      console.log("booking submitted!");
      setBookingSuccess(BookingStatus.Confirmed);
    } catch (error) {
      console.log(error);
      setBookingSuccess(BookingStatus.Failed);
    }
  };

  useEffect(() => {
    setRangeError(undefined);
    // If any day in the range is busy, set the range to undefined
    if (range !== undefined) {
      const dates = getAllDatesFromRange(range.from!, range.to!);
      if (dates.some((date) => busyDates.flat().includes(date))) {
        setRange(undefined);
      }
    }
  }, [range]);

  return (
    <Dialog>
      <DialogTrigger className="w-full mt-4">
        <HolidazeButton variant="primary" className="w-full">
          Book this venue
        </HolidazeButton>
      </DialogTrigger>
      <DialogContent className="w-screen h-[80vh] ">
        <DialogTitle className="text-lg">{name}</DialogTitle>
        <div className="w-full h-full flex flex-col relative  text-zinc-500 text-sm ">
          <Calendar
            mode="range"
            selected={range}
            className=" h-1/2 items-center justify-center"
            busy={busyDates.flat()}
            onSelect={setRange}
          />
          <div className="w-full flex flex-col items-start  h-12 mt-32 gap-3">
            <div className="w-full flex gap-6 border-t pt-5">
              <div className="h-full w-auto flex flex-col ">
                <p>From:</p>
                <p className="text-lg text-text">
                  {range !== undefined ? range.from?.toDateString() : null}
                </p>
              </div>
              <div className="h-full w-auto flex flex-col ">
                <p>To:</p>
                <p className="text-lg text-text">
                  {range !== undefined ? range.to?.toDateString() : null}
                </p>
              </div>
            </div>
            <div className="h-full w-auto flex flex-col gap-2 ">
              <p>Number of guests:</p>
              <input
                className="border h-10 w-auto border-text rounded-lg p-3"
                defaultValue={1}
                min={1}
                onChange={(e) => setGuestNumber(parseInt(e.target.value))}
                max={maxGuests}
                type="number"
                name=""
                id=""
              />
              <p>{maxGuests} guests max</p>
            </div>
          </div>
          <HolidazeButton
            variant="primary"
            className=" mt-4 absolute w-fit right-6 bottom-0"
            onClick={() => handleBookingSubmit()}
          >
            {bookingSuccess === BookingStatus.Pending ? (
              <Loader2 className="animate-spin" strokeWidth={1.5} size={22} />
            ) : bookingSuccess === BookingStatus.Confirmed ? (
              "Booking confirmed!"
            ) : bookingSuccess === BookingStatus.Failed ? (
              "Booking failed!"
            ) : (
              "Book now"
            )}
          </HolidazeButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VenuBookingCalendar;
