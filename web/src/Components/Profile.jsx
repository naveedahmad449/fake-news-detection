import { BACKEND_URL } from "../lib/vars";
import { Cookies } from "../lib/globals";

export default ({ User }) => {
  console.log(User)
  const handleLogout = () => {
    Cookies.delete('user')
    window.location.href = ''
  }
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
      >
        <h2 className="text-2xl font-bold mb-4">Welcome @{User.username}</h2>
        <div className="w-24 h-24 mt-2 overflow-hidden border rounded-full border-gray-700">
        <img className="w-full  h-full object-cover rounded-full" src={`${BACKEND_URL}${User.avatar}`} alt="avatar" />
        </div>

        <span className="text-sm text-slate-500 mb-2 mt-2">@{User.username} | {User.email}</span>
        <button
          type="button"
          onClick={handleLogout}
          className="py-2 px-12 mt-5 mb-3  rounded-md  bg-slate-800 text-white fonts uppercase text-sm hover:bg-slate-600 ease-in duration-300 block"
        >
            Sign Out
        </button>
        
      </form>
    </div>
  );
};
