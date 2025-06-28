import React, { useState, useEffect } from "react";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { Navigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { otpVerification, resetAuthSlice } from "../store/slice/authSlice";
import { toast } from "react-toastify";

const OTP = () => {
  const { email } = useParams();
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();

  const { loading, error, message, isAuthenticated } = useSelector((state) => state.auth);

  const handleOtpVerification = (e) => {
    e.preventDefault();
    dispatch(otpVerification(email, otp));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
       dispatch(resetAuthSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, isAuthenticated, error, loading, message]);

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
    <div className="flex flex-col md:flex-row h-screen">
      {/* LEFT SIDE */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative">
        <Link to={"/register"} className="border-2 border-black rounded-3xl font-bold w-52 py-2 px-4 fixed top-10 -left-28 hover:bg-yellow-500 hover:text-white transition duration-300 text-end">
        Back
        </Link>
        <div className="max-w-sm w-full">
          <div className="flex flex-col items-center mb-12">
            <div className="rounded-full flex items-center justify-center mb-4">
              <img src={logo} alt="logo" className="h-24 w-auto" />
            </div>
            <h1 className="text-4xl font-medium text-center mb-4 overflow-hidden">
              Check your MailBox
            </h1>
            <p className="text-gray-800 text-center mb-4">
              Please enter the otp to proceed
            </p>
          </div>
          <form onSubmit={handleOtpVerification}>
            <div className="mb-4">
             {/* <input
                    type="number"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value())}
                    placeholder="OTP"
                    className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
            /> */}
            <input
  type="text"
  inputMode="numeric"
  pattern="[0-9]*"
  maxLength={6} // or whatever your OTP length is
  value={otp}
  onChange={(e) => setOtp(e.target.value.replace(/\D/, ""))}
  placeholder="OTP"
  className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
/>
            </div>
            <button
              type="submit"
              className="border-2 mt-5 border-black w-full font-semibold bg-yellow-500 text-white py-2 rounded-lg hover:bg-white hover:text-yellow-300 transition"
            >
              VERIFY
            </button>
          </form>
        </div>
      </div>
      {/* RIGHT SIDE */}
      <div className="hidden md:flex w-1/2 bg-yellow-500 text-white flex-col items-center justify-center p-8 rounded-tl-[80px] rounded-bl-[80px]">
        <div className="text-center h-[400px] flex flex-col justify-center">
          <div className="flex justify-center mb-12">
            <img src={logo_with_title} alt="logo_with_title" className="mb-12 h-44 w-auto" />
          </div>
          <p className="text-gray-800 mb-12">New to our Platform? Sign up now.</p>
          <Link
            to={"/register"}
            className="border-2 mt-5 border-white w-full font-semibold bg-yellow-500 text-white px-8 py-2 rounded-lg hover:bg-white hover:text-yellow-300 transition"
          >
            SIGN UP
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default OTP;