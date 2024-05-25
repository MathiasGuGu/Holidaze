import { motion, useScroll, useTransform } from "framer-motion";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

const HeroShowcase = () => {
  const { scrollY } = useScroll();
  const { t } = useTranslation();

  const x = useTransform(scrollY, [0, 3000], [0, 500]);
  const y = useTransform(scrollY, [0, 3500], [0, -700]);
  const y2 = useTransform(scrollY, [0, 3500], [0, -400]);
  const opacity = useTransform(scrollY, [0, 1500], [0, 1]);
  const opacity2 = useTransform(scrollY, [1200, 1230], [0, 1]);
  const opacity3 = useTransform(scrollY, [1280, 1310], [0, 1]);

  return (
    <section className="w-full h-[200vh] relative flex flex-col isolate text-text">
      <div className="w-full h-[800px] flex flex-col md:flex-row  ">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className=" w-full md:w-1/2 h-[800px] left-0 overflow-hidden  bg-gradient-to-tr from-blue-200/30 to-blue-500/50 grid grid-cols-5 grid-rows-5 gap-2 p-2 relative"
        >
          <motion.img
            initial={{ x: 0, y: 10 }}
            animate={{ x: 0, y: "-50%" }}
            transition={{ duration: 1 }}
            style={{ x: x, y: "-50%" }}
            src="/apart3.jpeg"
            alt="apart1"
            className=" h-[95%] md:h-3/4  aspect-[10/16] object-cover absolute -left-[200px] top-1/2 -translate-y-1/2"
          />
          <motion.img
            initial={{ x: 0, y: 10 }}
            animate={{ x: 0, y: "-50%" }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{ x: x, y: "-50%" }}
            src="/apart5.jpeg"
            alt="apart1"
            className=" h-[95%] md:h-3/4 aspect-[10/16] object-cover absolute left-[100px] md:left-[200px] top-1/2 -translate-y-1/2"
          />
          <motion.img
            initial={{ x: 0, y: 10 }}
            animate={{ x: 0, y: "-50%" }}
            transition={{ duration: 1, delay: 0.4 }}
            style={{ x: x, y: "-50%" }}
            src="/apart4.jpeg"
            alt="apart1"
            className="  h-[95%] md:h-3/4 aspect-[10/16] object-cover absolute left-[400px] md:left-[600px] top-1/2 -translate-y-1/2"
          />
        </motion.div>
        <div className=" w-full md:w-1/2 h-full pt-12 px-2 md:px-8 flex flex-col items-center justify-center text-center text-balance gap-5 bg-background/40">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className=" text-2xl md:text-3xl font-title"
          >
            {t("Discover the best venues for your next event")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-zinc-500"
          >
            {t(
              "Our venues are located all over the world. You can find the perfect venue for your next vacation or event. The venues are luxurious and offer the best experience you can get. Always secure and reliable."
            )}
          </motion.p>
        </div>
      </div>
      <div className="w-full h-[800px] flex flex-col-reverse md:flex-row">
        <div className=" w-full md:w-1/2 h-full pt-12 px-2 md:px-8 flex flex-col items-center justify-center text-center text-balance gap-5 bg-background/40">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-title"
          >
            {t("Become a venue manager and list your venue")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-zinc-500"
          >
            {t(
              "As a venue manager, you can list your venue on our website. We offer a secure and reliable platform for you to manage your venue. You can reach a global audience and increase your revenue."
            )}
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className=" w-full md:w-1/2 h-[800px] left-0 bg-gradient-to-tr from-purple-300 to-purple-500 relative overflow-hidden "
        >
          <div className=" h-full md:h-3/4 aspect-[11/16] object-cover absolute -left-10 md:-left-[50px] top-[500px] md:top-[550px] ">
            <div className="w-full h-full relative">
              <motion.img
                style={{ y: y, opacity: opacity }}
                src="/apart3.jpeg"
                alt="apart1"
                className="w-full h-full object-cover  "
              ></motion.img>
              <motion.div
                style={{ y: y, opacity: opacity3 }}
                className="w-16 h-16 rounded-full flex items-center justify-center -top-[20px] -right-[20px] z-20 bg-white absolute"
              >
                <Plus size={30} strokeWidth={1} className="text-text" />
              </motion.div>
            </div>
          </div>
          <div className=" h-full md:h-3/4 aspect-[11/16] object-cover absolute -right-32 md:left-[400px] top-[200px] ">
            <div className="w-full h-full relative">
              <motion.img
                style={{ y: y2, opacity: opacity }}
                src="/apart7.jpeg"
                alt="apart1"
                className="w-full h-full object-cover z-10"
              ></motion.img>
              <motion.div
                style={{ y: y2, opacity: opacity2 }}
                className="w-16 h-16 rounded-full flex items-center justify-center -top-[20px] -left-[20px] z-20 bg-white absolute"
              >
                <Plus size={30} strokeWidth={1} className="text-text" />
              </motion.div>
              <motion.div
                style={{ y: y2, opacity: opacity2 }}
                className=" flex items-center justify-center -top-[2px] -left-[240px] z-20  absolute text-purple-100 font-title text-xl"
              >
                <p>Add your own venue</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroShowcase;
