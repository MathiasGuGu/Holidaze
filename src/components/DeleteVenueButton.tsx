import { useMutation } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { deleteVenue } from "@/lib/api";
import { useTranslation } from "react-i18next";

const DeleteVenueButton = ({
  accessToken,
  apiKey,
  venueId,
}: {
  accessToken: string;
  apiKey: string;
  venueId: string;
}) => {
  const { t } = useTranslation();

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
        {t(`Delete Venue`)}
      </DialogTrigger>
      <DialogContent className=" w-[95%] md:w-1/3 ">
        <DialogTitle className="text-lg  font-bold font-title">
          {t(`Are you sure?`)}
        </DialogTitle>
        <p className="text-zinc-500 text-wrap flex flex-wrap ">
          {t("Are you sure you want to delete this venue?")}
          {" \n"}
          {t("This action cannot be undone.")}
        </p>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center h-auto">
          <DialogTrigger className="  h-12 w-full md:w-48 rounded-full bg-text text-background ">
            {t("No, take me back.")}
          </DialogTrigger>
          <button
            onClick={() => handleDelete()}
            className="w-full md:w-48 h-12 bg-red-200 text-red-600 rounded-full"
          >
            {t("Yes, delete this venue")}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteVenueButton;
