import axios from "axios";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../lib/vars";
import { Cookies } from "../lib/globals";

export default ({ setIsLogin, updateUser }) => {
  const [message, setMessage] = useState(false);
  useEffect(() => {
    if (message)
      setTimeout(() => {
        setMessage(false);
      }, 5000);
  }, [message]);
  const SignUp = async (user) => {
    const form = new FormData();
    for (let key in user) form.append(key, user[key]);
    await axios
      .post(`${BACKEND_URL}/sign-up`, form)
      .then((res) => {
        res = res.data;
        if (res.success === 0)
          setMessage({ message: res.message, variant: "danger" });
        else {
          setMessage({ message: res.message, variant: "success" });
          delete user.password;
          delete user.repassword;
          const u = { ...user, _id: res._id, avatar: res.avatar };
          updateUser(u);
          Cookies.set("user", u, { expires: 356 });
        }
      })
      .catch((err) => {
        console.error(err);
        setMessage({ message: err.message, variant: "danger" });
      });
  };
  const handleForm = async (form) => {
    form.preventDefault();
    const username = form.target["username"].value;
    const email = form.target["email"].value;
    const password = form.target["password"].value;
    const repassword = form.target["repassword"].value;
    let avatar = form.target["avatar"].files;
    if (avatar.length > 0) avatar = avatar[0];
    else avatar = null;
    let m = null;
    console.log(
      "u: ",
      username,
      "email: ",
      email,
      "pass: ",
      password,
      "repas: ",
      repassword,
      "avatar: ",
      avatar
    );
    if (username === "") m = "Please enter username.";
    else if (email === "") m = "Please enter your email address";
    else if (password === "") m = "Please enter new password.";
    else if (password.length < 8)
      m = "Please enter password more than 8 chars.";
    else if (password !== repassword) m = "password is not matched.";
    if (m) setMessage({ message: m, variant: "alert" });
    else SignUp({ username, email, password, repassword, avatar });
  };
  return (
    <div
      className="flex lined-border justify-start text-white p-4  ml-14 rounded-xl form-outer login shadow-xl"
      style={{
        width: "450px",
        background:
          "linear-gradient(60deg, rgb(29 34 172 / 30%), rgb(3 40 79 / 27%), rgb(16 50 83 / 49%), rgb(27 101 71 / 30%))",
      }}
    >
      <form className="m-auto" autoComplete="off" onSubmit={handleForm}>
        <h2 className="text-2xl font-bold mb-4 text-center block">SIGN UP</h2>
        <div className="mb-2">
          <label htmlFor="username" className="fonts block text-sm">
            Profile image
          </label>
          <input type="file" name="avatar" id="avatar" accept="image/*" />
        </div>
        <div className="flex flex-nowrap">
          <div>
            <label htmlFor="username" className="fonts block text-sm">
              Enter your username
            </label>
            <input
              type="text"
              className="outline-none w-40 mr-4 mt-2 text-sm  block bg-none bg-transparent   border-slate-400 p-1 pl-2"
              placeholder="E.g. JohnDoe"
              style={{ borderBottomWidth: "1px" }}
              name="username"
              id="username"
            />
          </div>
          <div>
            <label htmlFor="email" className="fonts block text-sm">
              Enter your email address
            </label>
            <input
              type="text"
              className="outline-none w-40 mt-2 text-sm  block bg-none bg-transparent   border-slate-400 p-1 pl-2"
              placeholder="E.g. JohnDoe"
              style={{ borderBottomWidth: "1px" }}
              name="email"
              id="email"
            />
          </div>
        </div>
        <div className="mt-3">
          <label htmlFor="password" className="fonts block text-sm">
            Enter password
          </label>
          <input
            type="password"
            className="outline-none w-full mr-4 mt-2 text-sm  block bg-none bg-transparent   border-slate-400 p-1 pl-2"
            placeholder="password"
            style={{ borderBottomWidth: "1px" }}
            name="password"
            id="password"
          />
        </div>
        <div className="mt-3">
          <label htmlFor="password" className="fonts block text-sm">
            Enter password again
          </label>
          <input
            type="password"
            className="outline-none w-full mt-2 text-sm  block bg-none bg-transparent   border-slate-400 p-1 pl-2"
            placeholder="re-password"
            style={{ borderBottomWidth: "1px" }}
            name="repassword"
            id="repassword"
          />
        </div>
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
            style={{ top: "94%" }}
          >
            {message.message}
          </span>
        ) : (
          ""
        )}
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

        <button
          type="submit"
          className="py-2 w-full mt-5  rounded-sm  bg-white text-black fonts uppercase text-sm hover:bg-slate-600 hover:text-white font-bold ease-in duration-300 block"
        >
          Sign Up
        </button>
        <span className="mt-4 block text-sm font-semibold text-slate-300">
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
