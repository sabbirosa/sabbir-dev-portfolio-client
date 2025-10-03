"use client";

import { menuItems } from "@/data/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [currmode, setCurrmode] = useState("dark");

  useEffect(() => {
    if (typeof document !== "undefined") {
      if (currmode === "dark") {
        document.body.classList.add("dark");
        document.body.classList.remove("light");
      } else {
        document.body.classList.add("light");
        document.body.classList.remove("dark");
      }
    }
  }, [currmode]);

  const handleToggleTheme = () => {
    setCurrmode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <>
      {/* Desktop Header */}
      <nav className="nav max-w-screen-sm backdrop-blur-md pointer-events-auto sticky top-1 flex items-center justify-between gap-6 rounded-full py-2 mx-auto transition-colors z-50 px-6">
        <Link className="font-medium text-2xl sm:text-xl" href="/">
          Sabbir<span className="text-[#7C3AED]">.</span>
        </Link>
        <ul className="max-md:hidden gap-6 text-sm flex">
          {menuItems.map((item) => (
            <li className="group relative" key={item.path}>
              <Link href={item.path}>
                <span className="relative inline-flex overflow-hidden">
                  <div className="nav-items translate-y-0 skew-y-0 transform-gpu transition-transform duration-500 group-hover:-translate-y-[110%] group-hover:skew-y-12">
                    {item.name}
                  </div>
                  <div className="absolute translate-y-[110%] skew-y-12 transform-gpu text-text-primary transition-transform duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
                    {item.name}
                  </div>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleToggleTheme}
            className="togglebtn inline-flex cursor-pointer items-center justify-center whitespace-nowrap text-sm font-semibold h-11 w-11 relative rounded-full shadow backdrop-blur-md transition-all active:scale-90 sm:h-10 sm:w-10 border-none sm:bg-transparent"
            aria-label="Toggle theme"
          >
            <div className="svgsun absolute inset-0 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
              </svg>
            </div>
            <div className="svgmoon absolute inset-0 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </svg>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="mobile-nav fixed bottom-0 left-0 right-0 z-50 w-full md:hidden backdrop-blur-md border-t rounded-t-3xl">
        <ul className="flex w-full justify-evenly rounded-t-3xl border-t shadow backdrop-blur-md">
          {menuItems.map((item) => (
            <li className="p-4" key={item.path}>
              <Link
                href={item.path}
                className={`flex flex-col items-center justify-center gap-1 ${
                  pathname === item.path ? "text-[#7C3AED]" : ""
                }`}
              >
                {/* Simple icons for mobile */}
                <span className="text-xs">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
