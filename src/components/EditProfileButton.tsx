import { useForm } from "react-hook-form";
import HolidazeButton from "./ui/HolidazeButton";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "@/lib/api";
import { useStore } from "zustand";
import { useAuthStore } from "@/stores/authStore";

const editProfileSchema = z.object({
  avatar: z.string().optional(),
  avatarAlt: z.string().optional(),
  banner: z.string().optional(),
  bannerAlt: z.string().optional(),
  bio: z.string().optional(),
  venueManager: z.boolean().optional(),
});

const EditProfileButton = ({
  accessToken,
  apiKey,
  name,
}: {
  accessToken: string;
  apiKey: string;
  name: string;
}) => {
  const store: any = useStore(useAuthStore);
  const user = store.user;

  console.log(user);

  const { register, handleSubmit } = useForm<any>({
    resolver: zodResolver(editProfileSchema),
  });

  const {
    mutate: editProfileMutation,
    isError,
    isPending,
  } = useMutation({
    mutationFn: async (data: any) => {
      updateProfile(data, accessToken, apiKey, name);
    },
  });

  const editProfileHandler = async (data: any) => {
    const avatarData = { url: data.avatar, alt: data.avatarAlt };
    const bannerData = { url: data.banner, alt: data.bannerAlt };

    data.avatar = avatarData;
    data.banner = bannerData;

    const newData = {
      avatar: avatarData,
      banner: bannerData,
      bio: data.bio,
      venueManager: data.venueManager,
    };

    editProfileMutation(newData);

    store.revalidate(name, accessToken, apiKey);
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger className=" mt-4 text-white h-12 w-32 rounded-full bg-text">
        Edit Profile
      </DialogTrigger>
      <DialogContent className="w-[98vw] max-w-lg flex flex-col items-center justify-center md:pb-8 h-[95vh] md:h-[90vh] ">
        <DialogTitle className="text-lg">
          {isPending ? "Updating..." : "Edit Profile" || isError ? "Error" : ""}
        </DialogTitle>
        <form
          onSubmit={handleSubmit(editProfileHandler)}
          className="grid grid-rows-1  w-full gap-5 text-zinc-500"
        >
          <div className="w-full h-32 bg-gradient-to-tr from-blue-200 text-3xl font-title text-blue-300 font-bold to-blue-50 rounded-lg grid place-items-center">
            Edit Profile
          </div>
          <div className="w-full ">
            <p>Enter a new avatar url</p>
            <input
              {...register("avatar")}
              id="avatar"
              name="avatar"
              className=" h-10 w-full bg-background rounded-lg "
              type="text"
              placeholder="avatar"
            />
          </div>
          <div className="w-full ">
            <p>Enter a new avatar alt</p>
            <input
              {...register("avatarAlt")}
              id="avatarAlt"
              name="avatarAlt"
              className=" h-10 w-full bg-background rounded-lg "
              type="text"
              placeholder="avatar alt"
            />
          </div>
          <div className="w-full ">
            <p>Enter a new banner url</p>
            <input
              {...register("banner")}
              id="banner"
              name="banner"
              className=" h-10 w-full bg-background rounded-lg "
              type="text"
              placeholder="banner"
            />
          </div>
          <div className="w-full ">
            <p>Enter a new banner alt</p>
            <input
              {...register("bannerAlt")}
              id="bannerAlt"
              name="bannerAlt"
              className=" h-10 w-full bg-background rounded-lg "
              type="text"
              placeholder="banner alt"
            />
          </div>
          <div className="w-full ">
            <p>Enter a new bio</p>
            <input
              {...register("bio")}
              name="bio"
              id="bio"
              className=" h-10 w-full bg-background rounded-lg "
              type="text"
              placeholder="bio"
            />
          </div>
          <div className="flex gap-4">
            <p>Do you want to manage venues?</p>
            <input
              {...register("venueManager")}
              type="checkbox"
              className="w-6 h-6"
              placeholder=""
            />
            <p>(checked = yes)</p>
          </div>
          <HolidazeButton variant="primary" className="w-fit h-12">
            Update Profile
          </HolidazeButton>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileButton;
