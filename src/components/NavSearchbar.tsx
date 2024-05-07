import { Search } from "lucide-react";
import HolidazeButton from "@/components/ui/HolidazeButton";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchQueryStore } from "@/stores/searchQueryStore";
import { useStore } from "zustand";

const Searchbar = () => {
  // TODO:
  // Redirect to search page with the search query on submit
  //

  const store: any = useStore(useSearchQueryStore);

  const recentSearches = store.recentSearches;
  const saveData = store.saveData;

  // TODO: Import user profile type
  const user: any = store.user;

  const [isSearching, setIsSearching] = useState<boolean>(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const searchRef = useRef(null);

  const handleClickOutside = (event: any) => {
    // ts-ignore
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmitSearch = (e: any) => {
    e.preventDefault();

    // Get the search query from the input field
    let query = e.target[0].value;

    // Close the search dropdown
    setIsSearching(false);

    // Blur the input field
    e.target[0].blur();

    // Save the search query to the store
    saveData(query);

    // Create a URLSearchParams object and append the search query
    let searchQuery = new URLSearchParams();

    // Append the search query to the URLSearchParams object
    searchQuery.append("search", query);

    // Redirect to the search page with the search query
    navigate("/discover" + "?" + searchQuery.toString());
  };

  return (
    <form
      ref={searchRef}
      className="w-auto h-16 relative grid place-items-center ml-8 isolate  lg:ml-2"
      onSubmit={(e) => {
        handleSubmitSearch(e);
      }}
    >
      <input
        onFocus={() => setIsSearching(true)}
        placeholder={t("Search") + "..."}
        className="h-10 w-64 focus:outline-1 hidden lg:flex outline-text z-20 px-4 bg-background placeholder:text-sm rounded-full"
      />
      <HolidazeButton
        variant="tertiary"
        type="submit"
        size="md"
        className="absolute right-2 top-0 h-full  px-2 z-30"
      >
        <Search size={22} strokeWidth={1.5} className="" />
      </HolidazeButton>
      <AnimatePresence>
        {isSearching && (
          <motion.div
            initial={{ height: 16 }}
            animate={{ height: 200 }}
            exit={{ opacity: 0, height: 16 }}
            transition={{ duration: 0.3 }}
            className="absolute top-4 bg-white/80 w-full h-6 rounded-t-xl rounded-b-lg shadow px-3 pt-12 overflow-scroll"
          >
            {recentSearches.map((search: any, index: number) => {
              return (
                <Link
                  onClick={() => setIsSearching(false)}
                  to={`/discover?search=${search}`}
                  key={index}
                  className="block py-2 px-3 hover:bg-gray-100"
                >
                  {search}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};

const SearchButton = () => {
  // TODO:
  // Redirect to search page on click
  //
  return (
    <Link to="/discover">
      <HolidazeButton
        variant="tertiary"
        type="submit"
        size="md"
        className="px-2"
      >
        <Search size={25} strokeWidth={1.5} className="" />
      </HolidazeButton>
    </Link>
  );
};

const NavSearchbar = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Handles all the resizing of the window
  useEffect(() => {
    //
    // Function to handle the resize event
    //
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    //
    // Add the event listener
    //
    window.addEventListener("resize", handleResize);

    //
    // Cleanup the event listener on page change or component unmount
    //
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenWidth > 1024 ? <Searchbar /> : <SearchButton />;
};

export default NavSearchbar;
