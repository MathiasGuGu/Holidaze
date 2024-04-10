import { Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const navLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Venues",
    path: "/",
  },
  {
    name: "Bookings",
    path: "/",
  },
  {
    name: "Contact",
    path: "/",
  },
];

const Navbar = () => {
  const [screenWidth, setScreenWidth] = useState(0);

  // Language Selector State
  const [languageSelector, setLanguageSelector] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setScreenWidth(window.innerWidth);

    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setScreenWidth(window.innerWidth);
      });
    };
  }, []);

  if (screenWidth < 420) {
    return (
      <nav className="w-screen h-16 flex relative md:hidden items-center justify-between px-4 font-para">
        <div className="flex gap-3 items-center w-auto h-full justify-center">
          <button className="flex flex-col gap-1">
            <span className="w-5 h-[3px] bg-text flex rounded-full"></span>
            <span className="w-6 h-[3px] bg-text flex rounded-full"></span>
            <span className="w-4 h-[3px] bg-text flex rounded-full"></span>
          </button>
          <p className="font-title text-text text-2xl">Holidaze</p>
        </div>
        <ul className="flex items-center gap-2 relative">
          <button
            id="LanguageSelectorButton"
            onClick={() => setLanguageSelector(!languageSelector)}
            className={cn({
              "p-2 rounded-lg  flex items-center gap-2 duration-300 ": true,
              " text-text hover:bg-background": !languageSelector,
              "bg-text text-background": languageSelector,
            })}
          >
            <Globe size={20} strokeWidth={1} />
            {i18n.language}
          </button>
          {languageSelector && (
            <div className="w-24 h-auto bg-white shadow absolute top-12 -left-2 rounded-lg flex flex-col gap-2 p-2">
              <button
                onClick={() => {
                  i18n.changeLanguage("en");
                  setLanguageSelector(false);
                }}
                className="w-full h-10 hover:bg-background rounded"
              >
                En
              </button>
              <button
                onClick={() => {
                  i18n.changeLanguage("no");
                  setLanguageSelector(false);
                }}
                className="w-full h-10 hover:bg-background rounded"
              >
                No
              </button>
              <button
                onClick={() => {
                  i18n.changeLanguage("es");
                  setLanguageSelector(false);
                }}
                className="w-full h-10 hover:bg-background rounded"
              >
                Es
              </button>
            </div>
          )}
          <Link to="/" className=" bg-text text-background px-4 py-2 rounded">
            {t("Register")}
          </Link>
        </ul>
      </nav>
    );
  } else if (screenWidth < 1000) {
    return (
      <nav className="w-screen h-16 flex relative lg:hidden items-center justify-between px-4 font-para">
        <div className="flex gap-3 items-center w-auto h-full justify-center">
          <button className="flex flex-col gap-1">
            <span className="w-6 h-[3px] bg-text flex rounded-full"></span>
            <span className="w-7 h-[3px] bg-text flex rounded-full"></span>
            <span className="w-4 h-[3px] bg-text flex rounded-full"></span>
          </button>
          <p className="font-title text-text text-2xl">Holidaze</p>
        </div>
        <ul className="flex items-center gap-2 relative">
          <button
            id="LanguageSelectorButton"
            onClick={() => setLanguageSelector(!languageSelector)}
            className={cn({
              "p-2 rounded-lg  flex items-center gap-2 duration-300 ": true,
              " text-text hover:bg-background": !languageSelector,
              "bg-text text-background": languageSelector,
            })}
          >
            <Globe size={20} strokeWidth={1} />
            {i18n.language}
          </button>
          {languageSelector && (
            <div className="w-24 h-auto bg-white shadow absolute top-12 -left-2 rounded-lg flex flex-col gap-2 p-2">
              <button
                onClick={() => {
                  i18n.changeLanguage("en");
                  setLanguageSelector(false);
                }}
                className="w-full h-10 hover:bg-background rounded"
              >
                En
              </button>
              <button
                onClick={() => {
                  i18n.changeLanguage("no");
                  setLanguageSelector(false);
                }}
                className="w-full h-10 hover:bg-background rounded"
              >
                No
              </button>
              <button
                onClick={() => {
                  i18n.changeLanguage("es");
                  setLanguageSelector(false);
                }}
                className="w-full h-10 hover:bg-background rounded"
              >
                Es
              </button>
            </div>
          )}
          <Link to="/" className=" bg-text text-background px-4 py-2 rounded">
            {t("Register")}
          </Link>
        </ul>
      </nav>
    );
  } else if (screenWidth > 1000) {
    return (
      <nav className="w-screen h-16 hidden relative md:flex items-center justify-between px-12 font-para">
        <p className="font-title text-text text-2xl">Holidaze</p>

        <ul className="absolute w-auto h-full flex items-center justify-center gap-8 left-1/2 -translate-x-1/2">
          {navLinks.map((link, index) => (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              viewport={{
                once: true,
              }}
              className="w-auto h-auto"
            >
              <Link to={link.path} key={link.name} className="">
                {t(link.name)}
              </Link>
            </motion.div>
          ))}
        </ul>

        <ul className="flex items-center gap-4 relative">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{
              once: true,
            }}
            className="w-auto h-auto"
          >
            <button
              id="LanguageSelectorButton"
              onClick={() => setLanguageSelector(!languageSelector)}
              className={cn({
                "p-2 rounded-lg  flex items-center gap-2 duration-300 ": true,
                " text-text hover:bg-background": !languageSelector,
                "bg-text text-background": languageSelector,
              })}
            >
              <Globe size={20} strokeWidth={1} />
              {i18n.language}
            </button>
          </motion.div>
          {languageSelector && (
            <div className="w-24 h-auto bg-white shadow absolute top-12 -left-2 rounded-lg flex flex-col gap-2 p-2">
              <button
                onClick={() => {
                  i18n.changeLanguage("en");
                  setLanguageSelector(false);
                }}
                className="w-full h-10 hover:bg-background rounded"
              >
                En
              </button>
              <button
                onClick={() => {
                  i18n.changeLanguage("no");
                  setLanguageSelector(false);
                }}
                className="w-full h-10 hover:bg-background rounded"
              >
                No
              </button>
              <button
                onClick={() => {
                  i18n.changeLanguage("es");
                  setLanguageSelector(false);
                }}
                className="w-full h-10 hover:bg-background rounded"
              >
                Es
              </button>
            </div>
          )}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{
              once: true,
            }}
            className="w-auto h-auto"
          >
            <Link to="/" className="">
              {t("Login")}
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            viewport={{
              once: true,
            }}
            className="w-auto h-auto"
          >
            <Link to="/" className=" bg-text text-background px-8 py-2 rounded">
              {t("Register")}
            </Link>
          </motion.div>
        </ul>
      </nav>
    );
  }
};

export default Navbar;
