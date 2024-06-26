import { Search } from "lucide-react";
import HolidazeButton from "@/components/ui/HolidazeButton";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSearchQueryStore } from "@/stores/searchQueryStore";
import { useStore } from "zustand";

const Searchbar = () => {
  // TODO:
  // Redirect to search page with the search query on submit
  //

  const store: any = useStore(useSearchQueryStore);

  const saveData = store.saveData;

  // TODO: Import user profile type

  const { t } = useTranslation();
  const navigate = useNavigate();

  const searchRef = useRef(null);

  const handleSubmitSearch = (e: any) => {
    e.preventDefault();

    // Get the search query from the input field
    let query = e.target[0].value;

    // Close the search dropdown

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
