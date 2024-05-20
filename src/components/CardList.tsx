import { motion } from "framer-motion";
const CardList = ({ children }: { children: any }) => {
  return (
    <div className="w-screen h-auto flex items-center justify-center">
      <motion.div className="grid  grid-cols-2 md:grid-cols-4 gap-2 w-[95%] md:w-[90%] md:gap-4 max-w-[1660px]">
        {children}
      </motion.div>
    </div>
  );
};

export default CardList;
