import { Icon } from "@iconify/react";
import { life, trimTitle } from "../lib/globals";
import axios from "axios";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../lib/vars";
export default () => {
  const [reviews, setReviews] = useState([]);
  const getReviews = async () => {
    await axios
      .get(`${BACKEND_URL}/get-reviews`)
      .then((res) => {
        console.log(res.data)
        setReviews(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    getReviews();
  }, []);
  return (
    <div
      className="p-5 lined-border m-auto rounded-xl text-white form-outer login 
      "
      style={{
        width: "80%",
        background:
          "linear-gradient(136deg, rgb(0 254 84 / 9%), rgb(255 0 236 / 10%), #0064ff17, rgb(196 255 167 / 14%))",
      }}
    >
      <h1 className="font-bold text-xl mb-4 uppercase">
        What Peoples Thinks about us
      </h1>
      <div className="overflow-x-scroll">
        <div
          className="
        flex align-center justify-center flex-nowrap w-max
      "
        >
          {reviews.map((item, i) => (
            <section
              key={i}
              className="bg-black bg-opacity-30 flex-col items-center justify-start m-1 p-3 w-64 border border-opacity-10 border-white mb-8 rounded-md flex  align-center"
            >
              <div className="block">
                <div className="bg-slate-800 rounded-full p-1 w-20 h-20 m-auto flex items-center justify-center border border-gray-400 border-opacity-20">
                  {item.user[0].avatar != "" ? (
                    <img className="object-cover w-full h-full rounded-full" src={BACKEND_URL + item.user[0].avatar} alt={item.user[0].username} />
                  ) : (
                    <Icon
                      icon="ph:user-light"
                      fontSize={44}
                      className="m-2 text-slate-200"
                    />
                  )}
                </div>
                <span className="text-center mt-2 block text-sm font-semibold text-slate-300">
                  @{item.user[0].username}
                </span>
                <span className="text-xs text-slate-300 text-center block font-bold">
                  {item.user[0].email} 
                </span>
              </div>
              <div className="block text-center mt-1 w-full pt-2 text-sm border-t border-slate-400 border-opacity-30">
                <span className="text-slate-300 block w-full h-32">
                 {trimTitle(item.review, 185, 20, '...')} 
                </span>
                <span className="block w-full mt-3 text-slate-300 text-right font-bold">
                  {life(item.createdAt).from()}
                </span>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};
