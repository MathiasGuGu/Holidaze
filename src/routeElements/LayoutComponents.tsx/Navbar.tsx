import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import HolidazeButton from "@/components/ui/HolidazeButton";
import { useAuthStore } from "../../stores/authStore";
import { useStore } from "zustand";
import UserButton from "../../components/UserButton";
import LanguageSelector from "@/components/LanguageSelector";
import MobileNavDropdown from "@/components/MobileNavDropdown";
import NavSearchbar from "@/components/NavSearchbar";
import { bookingsLinks, venuesLinks } from "@/lib/linksData";
import { cn } from "@/lib/utils";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const store: any = useStore(useAuthStore);

  const isLoggedIn = store.isLoggedIn;

  // TODO: Import user profile type
  const user: any = store.user;

  const { t } = useTranslation();

  return (
    <nav className="w-screen h-16 z-50 bg-white  relative flex items-center justify-between px-3 md:px-12 font-para">
      <div className="flex gap-2 items-center">
        <MobileNavDropdown />
        <Link to={"/"} className="font-title text-text text-xl md:text-2xl">
          Holidaze
        </Link>
        <NavigationMenu className=" ml-4 hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {t(`Home`)}
                </NavigationMenuLink>
              </Link>
              <Link to="/discover?search=">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {t(`Discover`)}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            {isLoggedIn && (
              <NavigationMenuItem>
                <NavigationMenuTrigger> {t(`Bookings`)}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className=" w-[400px] gap-3 p-4 md:w-[500px] flex flex-col lg:w-[400px] ">
                    {bookingsLinks.children?.map((component) => (
                      <ListItem
                        key={component.name}
                        title={component.name}
                        href={component.path}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}
            {isLoggedIn && (
              <NavigationMenuItem>
                <NavigationMenuTrigger>{t(`Venues`)}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className=" w-[400px] gap-3 p-4 md:w-[500px] flex flex-col lg:w-[400px] ">
                    {venuesLinks.children?.map((component) => (
                      <ListItem
                        key={component.name}
                        title={component.name}
                        href={component.path}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex items-center gap-1 relative  ">
        <NavSearchbar />
        <LanguageSelector />
        {isLoggedIn ? (
          <UserButton imageSrc={user.avatar.url} />
        ) : (
          <>
            <motion.div className="w-auto h-auto hidden md:flex">
              <HolidazeButton
                variant="tertiary"
                size="sm"
                className="hover:bg-background"
              >
                <Link to="/sign-in" className="">
                  {t("Login")}
                </Link>
              </HolidazeButton>
            </motion.div>
            <motion.div className="w-auto h-auto">
              <HolidazeButton
                variant="primary"
                size="md"
                className="px-3 md:px-8 text-sm md:text-base"
              >
                <Link to="/sign-up" className=" ">
                  {t("Register")}
                </Link>
              </HolidazeButton>
            </motion.div>
          </>
        )}
      </div>
    </nav>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }) => {
  const { t } = useTranslation();

  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          // @ts-ignore
          to={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none font-title">
            {t(`${title}`)}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground text-zinc-500">
            {t(`${children}`)}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Navbar;
