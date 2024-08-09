import React, { useEffect, useState } from "react";
import bg from "../assets/bg.jpg";
import { life, trimTitle } from "../lib/globals";
import { BACKEND_URL } from "../lib/vars";
import axios from "axios";
export default () => {
  const [items, setItems] = useState([]);
  const getNewsData = async (limit = 10, skip = 0) => {
    await axios
      .get(`${BACKEND_URL}/get-news-res/${limit}/${skip}`)
      .then((res) => {
        res = res.data;
        setItems(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const checkTextVariant = (text) => {
    const range = /[\u0600-\u06FF]/;
    return range.test(text);
  };
  useEffect(() => {
    getNewsData();
  }, []);
  return (
    <div
      className="p-5 lined-border text-black rounded-xl  m-auto relative z-10 w-full  login 
      "
      style={{}}
    >
      <h1 className="font-bold text-xl mb-4 uppercase text-black backdrop-blur-md w-max py-2 px-4 rounded-lg">
        OUR history
      </h1>
      <div className="">
        <div className="flex items-start justify-center flex-wrap w-full">
          {items.map((item, i) => {
            let isEnglish = checkTextVariant(item.text);
            return (
              <React.Fragment key={i}>
                <section
                  className="bg-white bg-opacity-40 flex-col backdrop-blur-md shadow p-3 rounded-md flex m-2  align-center"
                  style={{ width: "280px" }}
                >
                  <div className="text-left my-2 ml-1 flex items-center">
                    <span className="flex items-center justify-center text-xs font-bold text-gray-700">
                      {item.user[0].avatar != "" ? (
                        <img
                          src={BACKEND_URL + item.user[0].avatar}
                          alt="test"
                          className="mr-1 h-7 w-7 object-cover rounded-full"
                        />
                      ) : (
                        <img
                          src={bg}
                          alt="test"
                          className="mr-1 h-7 w-7 object-cover rounded-full"
                        />
                      )}
                      {item.user[0].username}
                    </span>
                    <span className="text-xl mb-1 ml-2 mr-2 text-gray-700">
                      &bull;
                    </span>
                    <span className="text-xs text-gray-700 font-bold">
                      {life(item.createdAt).format("DD/m/YYYY")}
                    </span>
                  </div>
                  <p className={`my-3 ${isEnglish ? "fonts-urdu" : "fonts"}`}>
                    {trimTitle(item.text, 300, 30, ".............")}
                  </p>
                  {item.status ? (
                    <p className="text-right block text-green-600 text-sm mt-4 font-bold">
                      Real News ✅
                    </p>
                  ) : (
                    <p className="text-right block text-orange-600 text-sm mt-4 font-bold">
                      Fake News ❌
                    </p>
                  )}
                </section>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
