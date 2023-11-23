import { Facebook, Home, Instagram, Linkedin, Twitter } from "lucide-react";
import { Button } from "../ui/button";
import { FOOTER } from "@/constants";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-20 pt-20 pb-10 bg-secondary">
      <div className="flex layout flex-col lg:flex-row gap-x-20 gap-y-10">
        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Home size={26} absoluteStrokeWidth />
              <span className="font-bold text-lg">Properties Of Sale</span>
            </div>

            <div className="gap-3 flex">
              <Button size={"icon"} className="rounded-full">
                <Facebook className="fill-white" size={15} />
              </Button>
              <Button size={"icon"} className="rounded-full">
                <Linkedin className="fill-white" size={15} />
              </Button>
              <Button size={"icon"} className="rounded-full">
                <Twitter className="fill-white" size={15} />
              </Button>
              <Button size={"icon"} className="rounded-full">
                <Instagram absoluteStrokeWidth size={15} />
              </Button>
            </div>

            <p className="text-xs font-light">
              Copyright © 2023. All rights reserved.
            </p>
          </div>
        </div>

        <div className="flex-[2] w-full flex-wrap gap-10 flex items-start justify-center">
          {FOOTER.map(({ title, links }, index) => (
            <div key={index} className="flex-1">
              <h1 className="font-semibold text-xl">{title}</h1>

              <ul className="mt-4 flex flex-col gap-2 capitalize">
                {links.map(({ href, title }, index) => (
                  <li key={index}>
                    <Link href={href}>{title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
