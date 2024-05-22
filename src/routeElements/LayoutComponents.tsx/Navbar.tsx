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
import { bookingsLinks, navLinks, venuesLinks } from "@/lib/linksData";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { t } from "i18next";

const NavbarLink = ({ link, index }: any) => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.6 }}
      viewport={{
        once: true,
      }}
      onMouseEnter={() => {
        setIsOpen(true);
      }}
      onMouseLeave={() => {
        setIsOpen(false);
      }}
      className={cn({
        ["w-auto h-auto ml-4 relative hover:cursor-pointer"]: true,
        ["hidden"]: link.onlyMobile,
        [" hidden md:flex"]: !link.onlyMobile,
      })}
    >
      <Link
        id={"nav-" + link.name}
        to={link.path}
        key={link.name}
        className={cn({
          ["text-base group"]: true,
          ["hover:cursor-pointer"]: link.children,
        })}
      >
        {t(`${link.name}`)}
        {link.children && (
          <ChevronDown size={16} className="inline-block ml-1" />
        )}
      </Link>
      {link.children && isOpen && (
        <motion.div
          className={cn({
            [" absolute top-0  flex flex-col gap-2 pt-8"]: true,
          })}
        >
          <div className="bg-white shadow py-6 px-8 w-80 flex flex-col gap-4 rounded-lg">
            {link.children.map((child: any, index: number) => {
              return (
                <div key={index} className="flex flex-col">
                  <Link
                    to={child.path}
                    className="text-base group font-semibold"
                  >
                    {child.name}
                    <p className="text-sm text-zinc-600 font-normal">
                      {child.description}
                    </p>
                  </Link>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

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
        <p className="font-title text-text text-xl md:text-2xl">Holidaze</p>
        <NavigationMenu className=" ml-4 hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {t(`Home`)}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
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
          </NavigationMenuList>
        </NavigationMenu>

        {/* {navLinks.map((link, index) => (
            <NavbarLink link={link} index={index} key={index} />
          ))} */}
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
>(({ className, title, children, href, ...props }, ref) => {
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
