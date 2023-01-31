import React from "react";
import { Toaster } from "react-hot-toast";
import Classes from "../styles/Username.module.css";

function Recovery() {
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
        <div className={`${Classes.glass}`}>
          <div className="title flex flex-col items-center">
            <h4 className=" text-5xl font-bold">Recovery</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter OTP to recover password.
            </span>
          </div>
          <form className="pt-8" onSubmit={(e)=>e.preventDefault()}>
            <div className="textbox flex flex-col items-center gap-6">
              <div className="flex flex-col text-center">
                <span className="py-4 text-sm text-left text-gray-5000">
                  Enter 6 digit OTP send to your email address.
                </span>
                <input
                  className="px-4 focus:outline-none rounded-md focus:ring-2 focus:ring-green-300 py-2"
                  type="text"
                  placeholder="OTP"
                />
              </div>
              <button className={`${Classes.btn} bg-blue-500`} type="submit">
                Recover
              </button>
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500">
                Can't get {" "}
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => console.log("reset call")}
                >
                  Reset Now
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
