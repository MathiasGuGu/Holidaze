import { useAuthStore } from "@/stores/authStore";
import { useScroll, useTransform, motion } from "framer-motion";
import { useStore } from "zustand";

const Profile = () => {
  const store: any = useStore(useAuthStore);
  const isLoggedIn = store.isLoggedIn;

  const alle = store.user;

  console.log(alle);

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

  const isVenueManager = user.venueManager;

  return (
    <div className="w-screen h-auto flex flex-col relative isolate ">
      <motion.section className="w-full h-64 relative  ">
        <img
          src={user.banner.url}
          alt="profile"
          className=" w-full h-full   object-cover"
        />
        <img
          src={user.avatar.url}
          className="w-32 h-32 absolute left-32 -bottom-16 rounded-full"
        ></img>
      </motion.section>
      <section className="w-full h-screen mt-20">
        {!isVenueManager ? <div>Become a venue manager!</div> : null}
      </section>
    </div>
  );
};

export default Profile;
