import { Ghost } from "lucide-react";
import Navbar from "./LayoutComponents.tsx/Navbar";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col h-screen justify-center items-center gap-4">
        <Ghost size={100} strokeWidth={1} />
        <h1 className="text-4xl font-light">
          Could not find the page you were looking for
        </h1>
        <Link to={"/"}>Go back and try again</Link>
      </div>
    </div>
  );
};

export default PageNotFound;
