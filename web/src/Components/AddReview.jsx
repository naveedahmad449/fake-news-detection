import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../lib/vars";

export default (props) => {
  const [reviewText, setReviewText] = useState("");
  const [message, setMessage] = useState(false);
  useEffect(() => {
    if (message)
      setTimeout(() => {
        setMessage(false);
      }, 5000);
  }, [message]);
  const handleReview = async () => {
    if (reviewText === "") {
      setMessage({
        message: "Please enter your review text.",
        variant: "danger",
      });
      return 0;
    }
    if (!props.User || !props.User._id) {
      setMessage({ message: "Please login first.", variant: "danger" });
      return 0;
    }
    const form = new FormData()
    form.append('review', reviewText)
    form.append('user_id', props.User._id)
    await axios.post(`${BACKEND_URL}/post-review`, form)
    .then(res => {
      res  = res.data
      setMessage({message: "Review successfully added.", variant: 'success'})
      setReviewText('')
    })
    .catch(err => {
      console.error(err)
      setMessage({message: err.message, variant: 'danger'})
    })
  };
  return (
    <div
      className="p-5 text-white lined-border ml-20 rounded-xl form-outer login shadow-xl"
      style={{
        width: "500px",
        background:
          "linear-gradient(136deg, rgba(51, 4, 4, 0.32), rgb(21 2 35 / 53%), rgb(255 0 194 / 9%), rgb(22 1 28 / 47%))",
      }}
    >
      
      <h1 className="font-bold text-xl mb-4 uppercase">
        Add your review about us
      </h1>
      <div className="w-full">
        <div className="w-full">
          <label htmlFor="review" className="mb-1 block">
            Enter your review
          </label>
          <textarea
            name=""
            id=""
            onChange={(e) => setReviewText(e.target.value)}
            value={reviewText}
            className="bg-transparent border-b border-b-slate-500 outline-none h-28 w-full block  p-2"
            placeholder="Enter your review here"
          ></textarea>
          <button
            onClick={handleReview}
            type="submit"
            className="py-2 px-12 mt-5  rounded-md  bg-slate-800 text-white fonts uppercase text-sm hover:bg-slate-600 ease-in duration-300 block"
          >
            Save Review
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
              style={{ top: "94%" }}
            >
              {message.message}
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
