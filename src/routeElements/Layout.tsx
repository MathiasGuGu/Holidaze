import { Outlet } from "react-router-dom";
import Navbar from "./LayoutComponents.tsx/Navbar";
import Footer from "./LayoutComponents.tsx/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { motion } from "framer-motion";

const queryClient = new QueryClient();

const Layout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex flex-col items-center w-screen h-auto min-h-screen justify-between ">
        <div>
          <Navbar />
          <Outlet />
        </div>
        <Footer />
      </main>
    </QueryClientProvider>
  );
};

export default Layout;
