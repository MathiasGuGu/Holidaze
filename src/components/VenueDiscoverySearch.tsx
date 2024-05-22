import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const VenueDiscoverySearch = ({
  page,
  searchParam,
  mutation,
}: {
  page: number;
  searchParam: string;
  mutation: any;
}) => {
  const [search, setSearch] = useState<string>("");
  const [searchEmpty, setSearchEmpty] = useState<boolean>(true);
  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleSearchSubmit = () => {
    // redirect user to discovery?search=searchparam
    navigate(`/discover?search=${search}`);
  };

  return (
    <div className="w-screen h-64 bg-gradient-to-r from-pink-200 to-rose-200  flex flex-col mb-24 items-center justify-center gap-2 relative">
      <h1 className="text-2xl md:text-5xl  font-title text-balance text-text  text-center ">
        {t("discover-search-title")}
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearchSubmit();
        }}
        className=" absolute left-1/2 max-w-[1660px] -translate-x-1/2 w-[95%] md:w-[80%] h-20  rounded-lg -bottom-12 bg-background-accent shadow flex md:items-center md:backdrop:justify-center justify-evenly"
      >
        <input
          onChange={(e) => {
            setSearchEmpty(false);
            setSearch(e.target.value);
          }}
          type="text"
          placeholder={searchParam ? searchParam : "Summer Villa in Bali"}
          className=" w-4/6 md:w-5/6 h-full rounded-lg bg-background-accent border-none px-4 border"
        />
        <button className="w-1/6 h-full bg-primary rounded-lg text-text font-title">
          Search
        </button>
      </form>
    </div>
  );
};

export default VenueDiscoverySearch;
