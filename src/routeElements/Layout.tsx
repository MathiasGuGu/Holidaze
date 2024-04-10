import { Outlet } from "react-router-dom";
import Navbar from "./LayoutComponents.tsx/Navbar";
import Footer from "./LayoutComponents.tsx/Footer";

const Layout = () => {
  return (
    <main className="flex flex-col items-center w-screen h-auto min-h-screen justify-between ">
      <div>
        <Navbar />
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default Layout;
