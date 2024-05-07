import "./App.css";
// import HeroVenueShowcase from "./components/HeroVenueShowcase";
import HolidazeButton from "./components/ui/HolidazeButton";
function App() {
  return (
    <div className="w-screen h-auto flex flex-col relative items-center justify-center">
      <div className="w-screen h-96  flex flex-col items-center justify-center gap-8">
        <p>Holidaze</p>
        <h1 className="text-6xl max-w-4xl text-balance text-center font-title text-text">
          Find a Venue for your next event
        </h1>
        <HolidazeButton>Explore</HolidazeButton>
      </div>
      <div className="w-auto h-auto mt-12">{/* <HeroVenueShowcase /> */}</div>
      <div className="h-screen w-screen"></div>
    </div>
  );
}

export default App;
