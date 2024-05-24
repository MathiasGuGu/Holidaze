import { useMutation } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { deleteVenue } from "@/lib/api";

const DeleteVenueButton = ({
  accessToken,
  apiKey,
  venueId,
}: {
  accessToken: string;
  apiKey: string;
  venueId: string;
}) => {
  const { mutate: deleteVenueMutation } = useMutation({
    mutationFn: ({ accessToken, apiKey, venueId }: any) =>
      deleteVenue({ accessToken, apiKey, venueId }),
  });

  const handleDelete = async () => {
    try {
      deleteVenueMutation({ accessToken, apiKey, venueId });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className=" mt-4  h-12 w-32 rounded-full bg-red-200 text-red-700">
        Delete Venue
      </DialogTrigger>
      <DialogContent className=" w-1/3 ">
        <DialogTitle className="text-lg  font-bold font-title">
          Are you sure?
        </DialogTitle>
        <p className="text-zinc-500 ">
          Are you sure you want to delete this venue? This action cannot be
          undone.
        </p>
        <div className="flex gap-4 items-center justify-center h-16">
          <DialogTrigger className="  h-12 w-48 rounded-full bg-text text-background ">
            No, take me back.
          </DialogTrigger>
          <button
            onClick={() => handleDelete()}
            className="w-48 h-12 bg-red-200 text-red-600 rounded-full"
          >
            Yes, delete this venue
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteVenueButton;
