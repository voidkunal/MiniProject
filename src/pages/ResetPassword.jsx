import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { useDispatch, useSelector } from "react-redux";
import { resetAuthSlice, resetPassword } from "../store/slice/authSlice";
import { toast } from "react-toastify";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const { token } = useParams();

    const dispatch = useDispatch();
    const { loading, error, message, user, isAuthenticated } = useSelector((state) => state.auth);

    const handelResetPassword = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("password", password);
    formData.append("confirmPassword", confirmpassword); // <-- FIXED
    dispatch(resetPassword(formData, token));
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
    }, [dispatch, message, error, loading]);

    if (isAuthenticated) {
        return <Navigate to={"/"} />
    }

    return <>
        <div className="flex flex-col justify-center md:flex-row h-screen">
            {/* LEFT SECTION  */}
            <div className="hidden w-full md:w-1/2 bg-yellow-500 text-white md:flex flex-col items-center justify-center p-8 rounded-tr[80px] rounded-br-[80px]">
                <div className="hidden w-full md:w-1/2 bg-yellow-500 text-white md:flex flex-col items-center justify-center p-8 rounded-tr-[80px] rounded-br-[80px]">
                    <div className="text-center h-[450px]">
                        <div className="flex justify-center mb-12">
                            <img src={logo_with_title} alt="logo_with_title" className="mb-12 h-44 w-auto" />
                        </div>
                        <h3 className="text-gray-800 mb-12 max-w-[320px] mx-auto text-2xl font-medium leading-10">"Your own digital bibliothecas for borrowing and watching Videos"</h3>
                    </div>
                </div>
            </div>
            {/* RIGHT SECTION  */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative">
                <Link to={"/password/forgot"} className="border-2 border-black rounded-3xl font-bold w-52 py-2 px-4 fixed top-10 -left-28 hover:bg-yellow-500 hover:text-white transition duration-300 text-end">
                    Back
                </Link>
                <div className="w-full max-w-sm">
                    <div className="flex justify-center mb-12">
                        <div className="rounded-full flex items-center justify-center">
                            <img src={logo} alt="logo" className="h-24 w-auto" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-medium text-center mb-5 overflow-hidden">Reset Password</h1>
                    <p className="text-gray-800 text-center mb-12">Please enter your new password</p>
                    <form onSubmit={handelResetPassword}>
                        <div className="mb-4">
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                required
                                value={confirmpassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="confirmpassword"
                                className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
                            />
                        </div>
                        <button
                            type="submit"
                            className="border-2 mt-5 border-black w-full font-semibold bg-yellow-500 text-white py-2 rounded-lg hover:bg-white hover:text-yellow-300 transition"
                            disabled={loading ? true : false}
                        >
                            RESET PASSWORD
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </>;
};

export default ResetPassword;