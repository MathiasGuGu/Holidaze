import { motion } from "framer-motion";

const VenueCard = () => {
  return (
    <motion.div
      animate={{ x: -1000 }}
      transition={{ duration: 30, repeat: Infinity, repeatType: "reverse" }}
      className="min-w-64 min-h-80 bg-gradient-to-tr from-blue-400 to-blue-600 rounded-2xl shadow-sm relative"
    >
      <h2 className="text-background  font-light font-title text-xl left-6 absolute bottom-8">
        Bahamas
      </h2>
      <h2 className="text-background  font-light font-para text-base left-6 absolute bottom-4">
        Travel here today
      </h2>
    </motion.div>
  );
};

const HeroVenueShowcase = () => {
  return (
    <div className="w-screen flex gap-6 overflow-hidden mt-48">
      {Array(10)
        .fill(0)
        .map((_, index) => {
          return <VenueCard key={index} />;
        })}
    </div>
  );
};

export default HeroVenueShowcase;
