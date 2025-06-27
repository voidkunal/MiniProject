// import React from "react";
// import { useNavigate } from "react-router-dom";

// const LandingPage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
//       <h1 className="text-4xl font-bold mb-6">Welcome to VLMS</h1>
//       <p className="text-lg mb-10 text-gray-600">Your smart video & library management system.</p>
      
//       <div className="flex gap-6">
//         <button
//           className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
//           onClick={() => navigate("/login")}
//         >
//           Get Started
//         </button>
//         <button
//           className="bg-gray-200 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
//           onClick={() => navigate("/contact")}
//         >
//           Contact
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;


import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "../assets/hero.jpg"; // ✅ Import your local image

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-700 to-blue-700 flex items-center justify-center px-6 text-white">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl text-center max-w-5xl w-full flex flex-col md:flex-row items-center gap-10"
      >
        {/* Local Hero Image */}
        <img
          src={heroImage}
          alt="Hero Visual"
          className="w-full md:w-72 h-auto object-cover rounded-xl shadow-xl"
        />

        {/* Text and Buttons */}
        <div className="flex-1">
          <h1 className="text-5xl font-extrabold mb-4 text-white drop-shadow-sm">
            Welcome to <span className="text-yellow-300">Void Study Point</span>
          </h1>
          <p className="text-lg mb-8 text-gray-200">
            Your smart library management system base Application for Students.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <button
              onClick={() => navigate("/login")}
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-md"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-3 rounded-full border border-white/40 transition-all duration-300"
            >
              Contact
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
