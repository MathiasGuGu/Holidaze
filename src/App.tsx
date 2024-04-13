import "./App.css";
import Button from "./components/ui/Button";

function App() {
  return (
    <div className="w-screen h-auto  flex flex-col gap-8 p-12 font-para">
      <div className="flex gap-4 items-center">
        <Button variant="primary" size="md">
          Primary
        </Button>
        <Button variant="secondary" size="md">
          Secondary
        </Button>
        <Button variant="tertiary" size="md">
          Tertiary
        </Button>
      </div>
      <div className="flex gap-4 items-center">
        <Button variant="primary" size="lg">
          Primary
        </Button>
        <Button variant="secondary" size="lg">
          Secondary
        </Button>
        <Button variant="tertiary" size="lg">
          Tertiary
        </Button>
      </div>
      <div className="flex gap-4 items-center">
        <Button variant="primary" size="sm">
          Primary
        </Button>
        <Button variant="secondary" size="sm">
          Secondary
        </Button>
        <Button variant="tertiary" size="sm">
          Tertiary
        </Button>
      </div>
    </div>
  );
}

export default App;
