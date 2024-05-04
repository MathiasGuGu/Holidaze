import Navbar from "./LayoutComponents.tsx/Navbar";

const PageNotFound = () => {
  return (
    <div>
      <Navbar />
      <div className="flex h-screen justify-center items-center">
        <h1 className="text-4xl">This page does not exist yet dood</h1>
      </div>
    </div>
  );
};

export default PageNotFound;
