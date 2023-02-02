import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { generateOTP, verifyOTP } from "../helpers/helper";
import Classes from "../styles/Username.module.css";

function Recovery() {
  const userName = useSelector((state) => state.userDetailsSclice.userName);
  const navigate = useNavigate();
  const [OTP, setTOP] = useState();
  useEffect(() => {
    generateOTP(userName).then((OTP) => {
      if (OTP) return toast.success("OTP has been send to your email!");
      return toast.error("Problem while genarating OTP!");
    });
  }, [userName]);
  async function onSubmit(e) {
    e.preventDefault();
    try {
      const { status } = await verifyOTP({ userName, OTP });
      if (status === 201) {
        const clear = setTimeout(() => {
          cancel();
          return navigate("/reset");
        }, 1400);
        const cancel = () => {
          clearTimeout(clear);
        };
        return toast.success("Verify Successfull.");
      }
      return toast.error("Invalid OTP!");
    } catch (err) {
      return toast.error("Invalid OTP!");
    }
  }
  /***_______   Resend OTP handler  ________**/
  function resendOtp() {
    const resendOtpPromise = generateOTP(userName);
    toast.promise(resendOtpPromise, {
      loading: "Sending...",
      success: <b>OTP has been send to your email</b>,
      error: <b>Could not send OTP</b>,
    });
  }

  return (
    <div className="container mx-auto">
      <Toaster
        position="top-center"
        toastOptions={{
          // Define default options
          className: "",
          duration: 1000,
        }}
        reverseOrder={false}
      ></Toaster>
      <div className=" flex justify-center items-center h-screen">
        <div className={`${Classes.glass} dark:bg-gray-600 dark:text-gray-50`}>
          <div className="title flex flex-col items-center">
            <h4 className=" text-5xl font-bold">Recovery</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500 dark:text-gray-300">
              Enter OTP to recover password.
            </span>
          </div>
          <form className="pt-8" onSubmit={onSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <div className="flex flex-col text-center">
                <span className="py-4 text-sm text-left text-gray-5000 dark:text-gray-400">
                  Enter 6 digit OTP send to your email address.
                </span>
                <input
                  className="px-4 focus:outline-none rounded-md focus:ring-2 focus:ring-green-300 py-2"
                  type="text"
                  placeholder="OTP"
                  onChange={(e) => {
                    setTOP(e.target.value);
                  }}
                />
              </div>
              <button className={`${Classes.btn} bg-blue-500`} type="submit">
                Recover
              </button>
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500 dark:text-gray-100 ">
                Can't get{" "}
                <button
                  type="button"
                  className="text-red-500 font-semibold ml-2"
                  onClick={resendOtp}
                >
                  Resend Now
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Recovery;
