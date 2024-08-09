import Header from "./Components/Header";
import Footer from "./Components/Footer";
import vid1 from "./assets/vid1.mp4";
import "./styles/output.css";
import "./styles/fonts.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import Login from "./Components/Login";
import NewsInput from "./Components/NewsInput";
import NewsFeed from "./Components/NewsFeed";
import CheckHistory from "./Components/CheckHistory";
import UserReviews from "./Components/UserReviews";
import AddReview from "./Components/AddReview";
import bg1 from "./assets/bg1.jpg";
import bg2 from "./assets/bg2.jpg";
import SignUp from "./Components/SignUp";
import { useEffect, useState } from "react";
import { Cookies } from "./lib/globals";
import Profile from "./Components/Profile";
const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [User, setUser] = useState(false);
  const updateUser = (user) => setUser(user)
  useEffect(() => {
    const user = Cookies.get("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);
  // npx tailwindcss -i ./src/styles/main.css -o ./src/styles/output.css --watch
  return (
    <div className="app-container" style={{ background: "#141022" }}>
      <Header />
      <main>
        <div
          className="fixed w-full bottom-0 top-0 left-0 right-0 h-full bg-blue-500"
          style={{
            background: "linear-gradient(84deg, #012433, #01110d, #1d0537)",
            backgroundSize: "130%",
          }}
        >
          hello world
        </div>
        <div className="bg-view w-full overflow-hidden absolute h-screen">
          <div className="absolute top-0 left-0 right-0 bg-black h-screen -mt opacity-40"></div>
          <video autoPlay={false} muted loop className="object-cover w-full">
            <source src={vid1} />
          </video>
        </div>

        <div className="relative">
          <div className="m-auto px-10 h-screen overflow-hidden">
            <div className="relative z-10 ">
              <h3
                className="mt-72 w-full -ml-16 text-center text-xl font-semibold"
                style={{ color: "white" }}
              >
                WELCOME TO WORLD OF FACTS
              </h3>
              <div className="m-auto mt-2 flex align-center justify-center text-black font-bold">
                <Icon
                  icon="akar-icons:shield"
                  fontSize={68}
                  className="-mt-2 mr-4 animate-pulse"
                  color="#fff"
                />
                <h1 className="anim-head text-6xl ">FACT-SHIELD</h1>
              </div>
            </div>
            <div className="text-center mt-36 animate-bounce">
              <Icon
                icon="hugeicons:mouse-scroll-01"
                className="m-auto"
                color="#ff4500"
                fontSize={40}
              />
            </div>
          </div>
          <div className="max-width">
            <div className="relative">
              <div
                className="line line-y line-xa"
                style={{ height: "2.5rem", marginLeft: "266px" }}
              />
            </div>
            {isLogin ? (
              <>
                {User ? (
                  <Profile User={User} setIsLogin={setIsLogin} />
                ) : (
                  <Login setIsLogin={setIsLogin} updateUser={updateUser} />
                )}

                <div
                  className="line line-x line-xa line-xb"
                  style={{
                    width: "20.95rem",
                    marginTop: "-140px",
                    marginLeft: "504px",
                  }}
                />
                <div
                  className="line line-y line-xa line-xb"
                  style={{
                    height: "16rem",
                    marginTop: "-191px",
                    marginLeft: "839px",
                  }}
                />
              </>
            ) : (
              <>
                <SignUp setIsLogin={setIsLogin}  updateUser={updateUser} />
                <div
                  className="line line-x line-xb line-xa"
                  style={{
                    width: "20.95rem",
                    marginTop: "-200px",
                    marginLeft: "504px",
                  }}
                />
                <div
                  className="line line-y line-xa line-xb"
                  style={{
                    height: "23rem",
                    marginTop: "-266px",
                    marginLeft: "839px",
                  }}
                />
              </>
            )}
            <NewsInput User={User} />
            <div
              className=" line line-x -mt-36 line-xb"
              style={{
                height: 1,
                width: "17.95rem",
                marginTop: "-140px",
                marginLeft: "263px",
              }}
            />
            <div
              className="h-32 line line-y line-xb"
              style={{ width: 1, height: "13rem", marginLeft: "263px" }}
            />
            <div className="relative rounded-xl overflow-hidden">
              <img
                src={bg1}
                alt=""
                className="absolute w-full h-full object-cover"
              />
              <NewsFeed />
            </div>
            <div
              className="line line-y line-xa"
              style={{
                height: "2rem",
                marginTop: "0px",
                marginLeft: "880px",
              }}
            />
            <div
              className=" bg-white opacity-60 m-auto"
              style={{ height: 1, width: "28rem", marginLeft: "433px" }}
            />
            <div
              className="line line-y line-xb"
              style={{
                width: 1,
                height: "2rem",
                marginTop: "0px",
                marginLeft: "433px",
              }}
            />
            <AddReview User={User}/>
            <div
              className="line line-y line-xa line-xb"
              style={{
                width: 1,
                height: "5rem",
                marginTop: "-2px",
                marginLeft: "339px",
              }}
            />
            <UserReviews />
            <div
              className="line line-y line-xa line-xb"
              style={{
                width: 1,
                height: "5rem",
                marginTop: "-2px",
                marginLeft: "339px",
              }}
            />
            <div
              className="relative rounded-xl overflow-hidden"
              style={{ border: "1px solid #00000021" }}
            >
              <img
                src={bg2}
                alt=""
                className="absolute w-full h-full object-cover"
              />
              <CheckHistory />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
