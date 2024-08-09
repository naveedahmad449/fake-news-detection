import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../lib/vars";

export default ({User}) => {
  const [message, setMessage] = useState(false);
  const sendNews = async (text) => {
    const form = new FormData();
    if(!User && !User.username){
      setMessage({message: "Please login first.", variant: 'danger'})
      return 0
    }
    form.append("text", text);
    form.append('user_id', User._id)
    await axios
      .post(`${BACKEND_URL}/check`, form)
      .then((res) => {
        res = res.data;
        if (res === "real")
          setMessage({ message: "NEWS is REAL ✅", variant: "success" });
        else if (res === "fake")
          setMessage({ message: "NEWS is FAKE ❌", variant: "danger" });
        else if (res === "EmptyRequest")
          setMessage({ message: "NEWS text is empty.", variant: "alert" });
        else
          setMessage({
            message: "Something happening please try again later.",
            variant: "alert",
          });
      })
      .catch((err) => {
        console.error(err);
        setMessage({ message: err.message, variant: "danger" });
      });
  };

  const handleNews = async (form) => {
    form.preventDefault();
    let news = form.target["news"];
    if (news.value !== "") {
      console.log(news.value);
      await sendNews(news.value);
    } else {
      setMessage({ message: "Please enter NEWS text...", variant: "danger" });
    }
  };
  return (
    <div
      className="p-5 text-white lined-border rounded-xl form-outer login shadow-xl"
      style={{
        background:
          "linear-gradient(114deg, rgb(20 1 32 / 58%), #062f4557, rgb(4 24 40), rgb(3 24 67 / 68%))",
        marginLeft: "550px",
        width: 600,
      }}
    >
      <form className="" autoComplete="off" onSubmit={handleNews}>
        <h2 className="text-2xl text-center font-bold mb-4">
          ENTER NEWS TO DETECT
        </h2>
        <label htmlFor="news" className="fonts block text-sm">
          Enter your NEWS text to check its fake or not.
        </label>
        <textarea
          className="w-full bg-transparent outline-none p-4 fonts rounded-md border-opacity-20 border-white mt-3 border h-28 text-sm "
          name="news"
          id="news"
          placeholder="Enter text here..."
        ></textarea>
        {message ? (
          <span
            className={` ${
              message.variant === "alert"
                ? "bg-orange-200"
                : message.variant === "danger"
                ? "bg-red-300"
                : "bg-green-300"
            } my-1 font-semibold text-sm block w-max text-black px-2 rounded-sm border border-opacity-50`}
          >
            {message.message}
          </span>
        ) : (
          ""
        )}
        <div className="flex">
          <button className="bg-slate-50 text-black font-bold text-sm w-44 h-10 mt-1 rounded-md block hover:bg-slate-700 hover:text-white duration-300 ease-in fonts">
            CHECK ✔️
          </button>
          <button
            className="ml-2 bg-slate-700 text-white font-bold text-sm w-44 h-10 mt-1 rounded-md block hover:bg-slate-700 hover:text-white duration-300 ease-in fonts"
            type="reset"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};
