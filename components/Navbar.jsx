"use client"
import React, { useEffect, useState } from "react";
import { BiSolidSun, BiPhoneCall, BiSolidMoon } from "react-icons/bi";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import { FaCaretDown } from "react-icons/fa";
import ResponsiveMenu from "./ResponsiveMenu";
const Navbar = () => {
   const [theme, setTheme] = useState(
   "dark"
  );
  const [showMenu, setShowMenu] = useState(false);



  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

    useEffect(() => {
        const element = document.documentElement;
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
      console.log("dark theme");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
      console.log("light theme");
    }
  }, [theme]);


  return (
     <>
      <header
        data-aos="fade"
        data-aos-duration="300"
        className="relative z-[99] border-b-[1px]  border-primary/50  text-white shadow-lg bg-primary"
      >
        <nav className="container  flex h-[70px] items-center justify-between py-2 ">
          <div className="text-2xl text-white md:text-3xl ">
            <a href="/#home" className="">
              COZ
              <span className="inline-block font-bold text-primary">WEB</span>
            </a>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <ul className="flex items-center gap-10">
              <li className="group relative cursor-pointer">
                <a
                  href="/#home"
                  className="flex h-[72px] items-center gap-[2px]"
                >
                  Home{" "}
                  <span>
                    <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                  </span>
                </a>
                <div className="absolute -left-9 z-[9999] hidden w-[150px] rounded-md bg-white p-2 text-black group-hover:block  ">
                  <ul className="space-y-3">
                    <li className="p-2 hover:bg-violet-200">Services</li>
                    <li className="p-2 hover:bg-violet-200">About us</li>
                    <li className="p-2 hover:bg-violet-200">Privacy policy</li>
                  </ul>
                </div>
              </li>
              <li className="cursor pointer group">
                <a
                  href="/#home"
                  className="flex h-[72px] items-center gap-[2px]"
                >
                  Services{" "}
                  <span>
                    <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                  </span>
                </a>
                <div className="absolute left-0 z-[9999] hidden w-full rounded-b-3xl bg-white p-2 text-black group-hover:block  ">
                  <div className="grid grid-cols-3 gap-5 ">
                    <div className="d-200 overflow-hidden">
                      <img
                        className="max-h-[300px] w-full rounded-b-3xl object-fill"
                        src="https://picsum.photos/200"
                        alt="pics"
                      />
                    </div>
                    <div className="col-span-2">
                      <h1 className="pb-3 text-xl font-semibold">
                        Best Selling
                      </h1>
                      <p className="text-sm text-slate-600">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Aspernatur exercitationem delectus iusto animi
                        aperiam deleniti reprehenderit doloribus, numquam
                        corporis quae.
                      </p>
                      <div className="grid grid-cols-3 ">
                        <ul className="mt-3 flex flex-col gap-2">
                          <h1 className="pb-1 text-xl font-semibold">
                            Development
                          </h1>
                          <li className="cursor-pointer text-black/80 hover:text-primary">
                            Web development
                          </li>
                          <li className="cursor-pointer text-black/80 hover:text-primary">
                            IOS App Development
                          </li>
                          <li className="cursor-pointer text-black/80 hover:text-primary">
                            App Development
                          </li>
                        </ul>
                        <ul className="mt-3 flex flex-col gap-2">
                          <h1 className="pb-1 text-xl font-semibold">
                            Other Services
                          </h1>
                          <li className="cursor-pointer text-black/80 hover:text-primary">
                            Cloud Services
                          </li>
                          <li className="cursor-pointer text-black/80 hover:text-primary">
                            Mobile App
                          </li>
                          <li className="cursor-pointer text-black/80 hover:text-primary">
                            App Development
                          </li>
                        </ul>
                        <div>
                          <img src="https://picsum.photos/180" alt="no image" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="cursor pointer">
                <a href="/#contact">About us</a>
              </li>
              {/* Phone number section */}
              <div className="flex items-center gap-4">
                
                <li>
                  <div>
                    <button className="rounded-md border-2 border-primary bg-primary px-4 py-2 text-sm text-white transition-colors duration-300 hover:bg-primary/80">
               Nous rejoindre
              </button>
                  </div>
                </li>
              </div>
              {/* Light and dark mode switcher */}
              {theme === "dark" ? (
                <BiSolidSun
                  onClick={() => setTheme("light")}
                  className="text-2xl"
                />
              ) : (
                <BiSolidMoon
                  onClick={() => setTheme("dark")}
                  className="text-2xl"
                />
              )}
            </ul>
          </div>

          {/* Mobile view  */}
          <div className="flex items-center gap-4 md:hidden ">
            {theme === "dark" ? (
              <BiSolidSun
                onClick={() => setTheme("light")}
                className="text-2xl"
              />
            ) : (
              <BiSolidMoon
                onClick={() => setTheme("dark")}
                className="text-2xl"
              />
            )}
            {showMenu ? (
              <HiMenuAlt1
                onClick={toggleMenu}
                className=" cursor-pointer transition-all"
                size={30}
              />
            ) : (
              <HiMenuAlt3
                onClick={toggleMenu}
                className="cursor-pointer transition-all"
                size={30}
              />
            )}
          </div>
        </nav>
      </header>
      <ResponsiveMenu showMenu={showMenu} />
    </>
  );
};

export default Navbar;
