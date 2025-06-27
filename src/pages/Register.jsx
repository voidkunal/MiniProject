import React from "react";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { register } from "../store/slice/authSlice";
import { toast } from "react-toastify";
import { resetAuthSlice } from "../store/slice/authSlice";
import { Navigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const { loading,error,message,user,isAuthenticated } = useSelector((state) => state.auth);

    const navigateTo = useNavigate();

    const handleRegister = (e)=>{
        e.preventDefault();
        const data = new FormData();
        data.append("name", name)
        data.append("email", email)
        data.append("password", password)
        dispatch(register(data));
    };

    useEffect(()=>{
        if(message){
            navigateTo(`/otp-verification/${email}`);
        }
        if(error){
            toast.error(error);
            dispatch(resetAuthSlice());
        }
    },[dispatch, isAuthenticated, error, loading]);

    if(isAuthenticated){
        return <Navigate to={"/"} />
    }


  return <>
  
  <div className="flex flex-col justify-center md:flex-row h-screen">
        {/* LEFT SIDE */}
        <div className="hidden w-full md:w-1/2 bg-yellow-500 text-white md:flex flex-col items-center justify-center p-8 rounded-tr-[80px] rounded-br-[80px]">
            <div className="text-center h-[376px]">
                <div className="flex justify-center mb-12">
                    <img src={logo_with_title} alt="logo_with_title" className="mb-12 h-44 w-auto"/>
                </div>
                <p className="text-gray-300 mb-12">Already have Account? sign in now.</p>
                <Link to={"/login"} className="border-2 rounded-lg font-semibold border-white py-2 px-8 hover:bg-white hover:text-yellow-300 transition">
                SIGN IN
                </Link>
            </div>
        </div>
        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
            <div className="w-full max-w-sm">
                <div className="flex justify-center mb-12">
                    <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-5">
                        <h3 className="font-medium text-4xl overflow-hidden">
                            Sign Up</h3>
                        <img src={logo} alt="logo" className="h-auto w-24  object-cover" />
                    </div>
                </div>
                <p className="text-gray-800 text-center mb-12">
                    Please provide your information for sign up.
                </p>
                <form onSubmit={handleRegister}>
                    <div className="mb-2">
                        <input 
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)} 
                        placeholder="Void Kunal"
                        className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
                        />
                    </div>
                    <div className="mb-2">
                        <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="voidtech@gmail.com"
                        className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
                        />
                    </div>
                    <div className="mb-2">
                        <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="e.g: void@1 "
                        className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
                        />
                    </div>
                    <div className="block md:hidden font-semibold mt-5">
                        <p>
                            Allready have Account?
                        <Link to="/login" className="text-sm text-gray-800 hover:underline">
                            Sign In
                        </Link>
                            
                         </p>
                    </div>
                    <button type="submit" className="border-2 mt-5 border-black w-full font-semibold bg-yellow-500 text-white py-2 rounded-lg hover:bg-white hover:text-yellow-300 transition">SIGN UP</button>
                </form>
            </div>
        </div>
  </div>
  
  
  </>;
};

export default Register;