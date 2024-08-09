import { Icon } from "@iconify/react";
import { useEffect } from "react";

export default () => {
  let svgSize = 24;
  useEffect(() => {
    const header = document.getElementById("header");
    document.addEventListener("scroll", (e) => {
      if (window.scrollY > 100) {
        header.classList.add("backdrop-blur-xl");
        header.classList.add("active");
        header.classList.remove("p-10");
        header.classList.add("p-1");
        // header.classList.remove("text-white");
        svgSize = 50;
      }
      if (window.scrollY <= 100) {
        header.classList.remove("backdrop-blur-xl");
        header.classList.remove("active");
        header.classList.add("p-10");
        header.classList.remove("p-1");
        // header.classList.add("text-white");
      }
    });
  }, []);
  return (
    <header
      className="fixed w-full transition-all text-white duration-500 ease-in top-0 p-10 z-20"
      id="header"
    >
      <nav className="relative flex justify-between items-center w-full">
        <ul className="flex">
          <li className="ml-10">
            <Icon className="logo animate-pulse" icon="akar-icons:shield" fontSize={38} />
          </li>
        </ul>
        <ul className="flex yel1">
          <li className="mr-4">
            <a href="#" className="font-semibold">
              HOME
            </a>
            <Icon icon="ph:home-light" fontSize={24} />
          </li>
          <li className="flex align-center items-center">
            <a href="#">
              <Icon icon="ph:user-light" fontSize={24} />
            </a>
          </li>
        </ul>
        <ul className="flex items-center yel1">
          <li>
            <a href="#" className="block p-2">
              <Icon fontSize={24} icon="entypo-social:twitter" />
            </a>
          </li>
          <li className="ml-3">
            <a href="#" className="block p-2">
              <Icon fontSize={24} icon="fa:facebook" />
            </a>
          </li>
          <li className="ml-3 mr-8">
            <a href="#" className="block p-2">
              <Icon icon="entypo-social:youtube" fontSize={24} />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
