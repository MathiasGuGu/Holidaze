import { useState } from "react";
import Button from "./ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/linksData";
import { Link } from "react-router-dom";

const MobileNavDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="h-8 flex md:hidden">
        <Button
          onClick={() => {
            handleDropdown();
          }}
          type="button"
          variant="tertiary"
          className="h-full aspect-square flex flex-col gap-1 items-start justify-center px-0 "
        >
          <span className="w-full h-[2px] bg-text rounded-full"></span>
          <span className="w-6 h-[2px] bg-text rounded-full"></span>
          <span className="w-7 h-[2px] bg-text rounded-full"></span>
        </Button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto", transition: { duration: 0.3 } }}
            exit={{ height: 0, transition: { duration: 0.3 } }}
            className="w-screen absolute z-50 top-16  bg-white left-0 text-text px-8 flex flex-col gap-4 overflow-hidden md:hidden"
          >
            {navLinks.map((link, index) => {
              return (
                <motion.div
                  initial={{ x: -20 }}
                  animate={{
                    x: 0,
                    transition: { delay: 0.05 * index, duration: 0.2 },
                  }}
                  exit={{
                    x: -20,
                    transition: { delay: (navLinks.length - index) * 0.03 },
                  }}
                  key={index}
                  className={cn({
                    ["text-lg space-y-2"]: true,
                    ["mt-8"]: index === 0,
                    ["mb-8"]: index === navLinks.length - 1,
                  })}
                >
                  <Link to={link.path} className="font-semibold">
                    {link.name}
                  </Link>
                  {link.children && (
                    <div className="flex flex-col border-l py-4 gap-4">
                      {link.children.map((child, index) => {
                        return (
                          <Link
                            to={child.path}
                            key={index}
                            className={cn({
                              ["ml-6 text-text flex flex-col gap-0"]: true,
                            })}
                          >
                            <p className="text-md">{child.name}</p>
                            <p className="text-sm text-zinc-600">
                              {child.description}
                            </p>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNavDropdown;
