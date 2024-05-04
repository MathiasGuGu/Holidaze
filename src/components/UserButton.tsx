import { useStore } from "zustand";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/stores/authStore";
import { useTranslation } from "react-i18next";
const UserButton = ({ imageSrc }: { imageSrc: string }) => {
  const store: any = useStore(useAuthStore); // Get the store instance
  const { t } = useTranslation();

  const logout = store.logout; // Access specific state

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger id="user-info-button" className="mx-2">
          <Avatar>
            <AvatarImage src={imageSrc} />
            <AvatarFallback className="h-full w-full rounded-full bg-gradient-to-tr from-zinc-500 to-zinc-700 animate-pulse"></AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-72 mr-5 ">
          <DropdownMenuLabel> {t("My account")}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>{t("Profile")}</DropdownMenuItem>
          <DropdownMenuItem>{t("Bookings")}</DropdownMenuItem>
          <DropdownMenuItem>{t("Venues")}</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              logout();
            }}
            className="text-danger focus:text-danger focus:bg-danger/5"
          >
            {t("Sign out")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserButton;