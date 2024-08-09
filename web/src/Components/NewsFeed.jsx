import React from "react";
import { Icon } from "@iconify/react";
import bg from "../assets/bg.jpg";
import { life } from "../lib/globals";
export default () => {
  return (
    <div
      className="p-5 lined-border rounded-xl m-auto relative z-10 w-full  login 
      "
    >
      <h1 className="font-bold text-xl mb-4 uppercase text-white backdrop-blur-md w-max py-2 px-4 rounded-lg">LATEST NEWS FEED</h1>
      <div className="overflow-x-scroll">
        <div
          className="
        flex align-center justify-center flex-nowrap w-max
      "
        >
          {new Array(5).fill(0).map((e, i) => (
            <React.Fragment key={i}>
              <section
                className="bg-white bg-opacity-40 flex-col backdrop-blur-xl shadow p-3 rounded-md flex mb-5 align-center"
                style={{ width: "900px" }}
              >
                <div className="text-left my-2 ml-1 flex items-center">
                  <span className="text-xs text-gray-700 font-bold">
                    {life(1000000000000).from()}
                  </span>
                  <span className="text-xl ml-3 mr-3 text-gray-700">
                    &bull;
                  </span>
                  <span className="text-xs font-bold text-gray-700">
                    BBC NEWS
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  Hello world the ultimate boing 747
                </h2>
                <img
                  src={bg}
                  alt="test"
                  className="h-72 w-full object-cover rounded-md"
                />
                <p className="my-3">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Veniam, veritatis? Voluptate sit molestias quaerat natus nam
                  facilis rem, voluptates molestiae iusto sapiente ratione,
                  velit maiores nemo expedita at? Ipsam, eaque. Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Ipsum, autem
                  assumenda excepturi labore tempora odio totam voluptas
                  voluptates praesentium explicabo accusantium consectetur enim
                  libero aut ex cum omnis voluptatem odit! Lorem ipsum dolor sit
                  amet consectetur adipisicing elit. Voluptas reprehenderit,
                  enim ratione non iure asperiores ad neque maxime, temporibus
                  iusto quo nostrum perferendis beatae explicabo, earum est quod
                  optio odit.
                </p>
                <p className="text-right block text-slate-800 text-sm mt-4 font-bold">
                  {life().format("D/mm/YYYY")}
                </p>
              </section>
              <div
                className=" line line-x line-xa line-xb m-auto"
                style={{ height: 2, width: "4rem", marginLeft: "-2px" }}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
