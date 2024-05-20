import { navLinks } from "@/lib/linksData";
import { Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <div className=" w-screen h-72 bg-background-accent flex items-center justify-center pt-12 md:py-12">
      <div className="w-full max-w-6xl h-full  flex flex-col gap-20 md:gap-4">
        <div className="w-full h-16 flex flex-col md:flex-row items-center gap-6 md:gap-0 justify-evenly">
          <h4 className="text-4xl font-title font-bold ">Holidaze</h4>

          <div className="flex items-center justify-center gap-4 md:gap-12">
            {navLinks.map((link, index) => {
              return (
                <a key={index} href={link.path} className="text-primary">
                  {link.name}
                </a>
              );
            })}
          </div>
          <div className="flex items-center justify-center gap-6 ">
            <Instagram size={24} />
            <Facebook size={24} />
            <Linkedin size={24} />
          </div>
        </div>
        <div className="w-full h-16 flex items-center justify-center">
          <p className="text-text">© 2021 Holidaze. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
