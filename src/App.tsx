import { useTranslation } from "react-i18next";
import "./App.css";
import VenueDiscoveryCard from "./components/VenueDiscoveryCard";
// import HeroVenueShowcase from "./components/HeroVenueShowcase";
import { useFetch } from "./hooks/useFetch";
import { BASE_URL } from "./lib/api";
import HeroShowcase from "./pages/subpages/HeroShowcase";
import { motion } from "framer-motion";
function App() {
  const { t } = useTranslation();

  const { data: posts, error } = useFetch(
    `${BASE_URL}/holidaze/venues?limit=9`
  );

  return (
    <div className="w-screen h-auto flex flex-col relative items-center justify-center">
      <div className="w-screen h-[500px]  flex flex-col items-center justify-center gap-4 font-title">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className=" text-4xl font-semibold md:text-6xl max-w-4xl text-balance text-center  text-text uppercase"
        >
          {t("Venues all over the world, Always.")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.5,
          }}
          className="max-w-xl text-balance text-center text-zinc-500"
        >
          {t(
            "Travel to the most beautiful places in the world and stay in the most luxurious hotels. We offer you the best experience you can get."
          )}
        </motion.p>
      </div>
      <div className="w-screen  h-auto mt-12 ">
        <HeroShowcase />
      </div>
      <div className=" w-full md:w-2/3 h-full pt-12 px-8 mb-20 flex flex-col items-center justify-center text-center text-balance gap-5">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl font-title"
        >
          {t(
            "Start now by checking out our venues or becoming a venue manager."
          )}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-zinc-500"
        >
          {t(
            "Our venues are located all over the world. You can find the perfect venue for your next vacation or event. If you are a venue owner, you can become a venue manager and list your venue on our website."
          )}
        </motion.p>
      </div>
      <section className="w-full h-full pt-12 px-2 md:px-20 mb-20 grid grid-cols-1 md:grid-cols-3 gap-5">
        {posts &&
          !error &&
          posts.data.map((post: any, index: number) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.2) }}
              viewport={{ once: true }}
              className="w-auto h-auto"
            >
              <VenueDiscoveryCard key={post.id} post={post} />
            </motion.div>
          ))}
      </section>
    </div>
  );
}

export default App;
