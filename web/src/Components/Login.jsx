import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../lib/vars";
import { Cookies } from "../lib/globals";

export default ({ setIsLogin, updateUser }) => {
  const [message, setMessage] = useState(false);
  useEffect(() => {
    if(message) setTimeout(() => {
     setMessage(false) 
    }, 5000);
  }, [message])
  const handleForm = async (form) => {
    form.preventDefault();
    const user = form.target["user"].value;
    const password = form.target["password"].value;
    if (user === "") {
      setMessage({
        message: "Please enter username or email address.",
        variant: "danger",
      });
      return 0;
    }
    if (password === "") {
      setMessage({ message: "Please enter your password!", variant: "danger" });
      return 0;
    }
    const f = new FormData();
    f.append("user", user);
    f.append("password", password);
    await axios
      .post(`${BACKEND_URL}/login`, f)
      .then((res) => {
        res = res.data;
        if (res.success === 0) {
          setMessage({ message: res.message, variant: "danger" });
        } else {
          setMessage({ message: res.message, variant: "success" });
          delete res.user.password;
          updateUser(res.user)
          Cookies.set("user", res.user, { expires: 365 });
        }
      })
      .catch((err) => {
        console.error(err);
        setMessage({ message: err.message, variant: "danger" });
      });
  };
  return (
    <div
      className="flex lined-border justify-start text-white p-4  ml-14 rounded-xl form-outer login shadow-xl"
      style={{
        width: "450px",
        background:
          "linear-gradient(228deg, rgb(29 34 172 / 30%), rgb(3 40 79 / 27%), rgb(16 50 83 / 49%), rgb(27 101 71 / 30%))",
      }}
    >
      <form
        className="m-auto flex flex-col justify-center items-center"
        autoComplete="off"
        onSubmit={handleForm}
      >
        <h2 className="text-2xl font-bold mb-4">SIGN IN</h2>
        <label htmlFor="username" className="fonts block text-sm">
          Enter your username or email address
        </label>
        <input
          type="text"
          className="outline-none w-72 mt-2 text-sm  block bg-none bg-transparent   border-slate-400 p-1 pl-2"
          placeholder="E.g. JohnDoe"
          style={{ borderBottomWidth: "1px" }}
          name="user"
          id="username"
        />

        <label htmlFor="password" className="fonts block text-sm mt-3">
          Enter your password
        </label>
        <input
          type="password"
          className="outline-none w-72 mt-2 text-sm  block bg-none bg-transparent border-b-2 border-slate-400 p-1 pl-2 text-black"
          placeholder="Password"
          name="password"
          style={{ borderBottomWidth: "1px" }}
          id="password"
        />

        <button
          type="submit"
          className="py-2 px-12 mt-5  rounded-md  bg-slate-800 text-white fonts uppercase text-sm hover:bg-slate-600 ease-in duration-300 block"
        >
          Login
        </button>
        {message ? (
          <span
          onClick={() => setMessage(false)}
            className={` ${
              message.variant === "alert"
                ? "bg-orange-200"
                : message.variant === "danger"
                ? "bg-red-300"
                : "bg-green-300"
            } my-2 fixed animate-pulse z-20 left-0 right-0  m-auto font-semibold text-lg block w-max text-black px-2 rounded-sm border border-opacity-50`}
          style={{top: '94%'}}>
            {message.message}
          </span>
        ) : (
          ""
        )}
        <span className="mt-2 text-sm font-semibold text-slate-600">
          Don't have an account then{" "}
          <button
            onClick={() => setIsLogin((state) => !state)}
            className="text-blue-500 font-bold underline"
          >
            sign up
          </button>
        </span>
      </form>
    </div>
  );
};
