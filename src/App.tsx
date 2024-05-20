import "./App.css";
import VenueDiscoveryCard from "./components/VenueDiscoveryCard";
// import HeroVenueShowcase from "./components/HeroVenueShowcase";
import HolidazeButton from "./components/ui/HolidazeButton";
import { useFetch } from "./hooks/useFetch";
import { BASE_URL } from "./lib/api";
import HeroShowcase from "./pages/subpages/HeroShowcase";
import { motion } from "framer-motion";
function App() {
  const { data: posts, error } = useFetch(
    `${BASE_URL}/holidaze/venues?limit=9`
  );

  return (
    <div className="w-screen h-auto flex flex-col relative items-center justify-center">
      <div className="w-screen h-[600px]  flex flex-col items-center justify-center gap-8 font-title">
        <h1 className="text-7xl max-w-4xl text-balance text-center  text-text">
          Find a Venue for your next event
        </h1>
        <HolidazeButton>Explore</HolidazeButton>
      </div>
      <div className="w-screen  h-auto mt-12 ">
        <HeroShowcase />
      </div>
      <div className="w-2/3 h-full pt-12 px-8 mb-20 flex flex-col items-center justify-center text-center text-balance gap-5">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl font-title"
        >
          Start now by checking out our venues or becoming a venue manager
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-zinc-500"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac
          eros nec nunc ultricies vehicula. Nullam ac nisl nec libero efficitur
          iaculis
        </motion.p>
      </div>
      <section className="w-full h-full pt-12 px-20 mb-20 grid grid-cols-3 gap-5">
        {posts &&
          !error &&
          posts.data.map((post: any, index: number) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="w-auto h-auto"
            >
              <VenueDiscoveryCard index={index} key={post.id} post={post} />
            </motion.div>
          ))}
      </section>
    </div>
  );
}

export default App;
