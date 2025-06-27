// Store Code for error 

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getUser } from "./store/slice/authSlice";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import ForgotPassword from "./pages/ForgotPassword";
// import OTP from "./pages/OTP";
// import ResetPassword from "./pages/ResetPassword";
// import Contact from "./pages/Contact";
// import LandingPage from "./pages/LandingPage";

// import SideBar from "./layout/SideBar";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Components
// import AdminDashboard from "./components/AdminDashboard";
// import UserDashboard from "./components/UserDashboard";
// import Books from "./components/BookManagement";
// import Catalog from "./components/Catalog";
// import Users from "./components/Users";
// import MyBorrowedBooks from "./components/MyBorrowedBooks";

// const App = () => {
//   const dispatch = useDispatch();
//   const { isAuthenticated, user } = useSelector((state) => state.auth);
//   const [initializing, setInitializing] = useState(true);
//   const [selectedComponent, setSelectedComponent] = useState(null);

//   // ✅ Don't call /me unless token is present in cookies
//   useEffect(() => {
//     const hasCookieToken = document.cookie.includes("token");
//     if (hasCookieToken) {
//       dispatch(getUser()).finally(() => setInitializing(false));
//     } else {
//       setInitializing(false); // skip fetch
//     }
//   }, [dispatch]);

//   useEffect(() => {
//     if (user?.role === "Admin") {
//       setSelectedComponent("AdminDashboard");
//     } else if (user?.role === "user") {
//       setSelectedComponent("UserDashboard");
//     }
//   }, [user]);

//   if (initializing || (isAuthenticated && selectedComponent === null)) {
//     return (
//       <div className="flex justify-center items-center min-h-screen text-lg font-medium">
//         Loading...
//       </div>
//     );
//   }

//   const renderComponent = () => {
//     if (user?.role === "Admin") {
//       switch (selectedComponent) {
//         case "AdminDashboard": return <AdminDashboard />;
//         case "Books": return <Books />;
//         case "Catalog": return <Catalog />;
//         case "Users": return <Users />;
//         default: return <AdminDashboard />;
//       }
//     } else {
//       switch (selectedComponent) {
//         case "UserDashboard": return <UserDashboard />;
//         case "Books": return <Books />;
//         case "My Borrowed Books": return <MyBorrowedBooks />;
//         default: return <UserDashboard />;
//       }
//     }
//   };

//   return (
//     <Router>
//       <ToastContainer theme="colored" />
//       <Routes>
//         <Route path="/" element={!isAuthenticated ? <LandingPage /> : <Navigate to="*" />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/password/forgot" element={<ForgotPassword />} />
//         <Route path="/otp-verification/:email" element={<OTP />} />
//         <Route path="/password/reset/:token" element={<ResetPassword />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route
//           path="*"
//           element={
//             isAuthenticated ? (
//               <div className="flex">
//                 <SideBar
//                   setSelectedComponent={setSelectedComponent}
//                   isSideBarOpen={true}
//                   setIsSideBarOpen={() => {}}
//                 />
//                 <main className="flex-1 ml-64 p-6">{renderComponent()}</main>
//               </div>
//             ) : (
//               <Navigate to="/" />
//             )
//           }
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


//  Running Code
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getUser } from "./store/slice/authSlice";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import ForgotPassword from "./pages/ForgotPassword";
// import OTP from "./pages/OTP";
// import ResetPassword from "./pages/ResetPassword";
// import Contact from "./pages/Contact";
// import LandingPage from "./pages/LandingPage";

// import SideBar from "./layout/SideBar";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Components
// import AdminDashboard from "./components/AdminDashboard";
// import UserDashboard from "./components/UserDashboard";
// import Books from "./components/BookManagement";
// import Catalog from "./components/Catalog";
// import Users from "./components/Users";
// import MyBorrowedBooks from "./components/MyBorrowedBooks";

// const App = () => {
//   const dispatch = useDispatch();
//   const { isAuthenticated, user } = useSelector((state) => state.auth);

//   const [initializing, setInitializing] = useState(true);
//   const [selectedComponent, setSelectedComponent] = useState(null);

//   useEffect(() => {
//     const hasCookieToken = document.cookie.includes("token");
//     const hasLocalToken = localStorage.getItem("token");

//     if (hasCookieToken || hasLocalToken) {
//       dispatch(getUser()).finally(() => setInitializing(false));
//     } else {
//       setInitializing(false);
//     }
//   }, [dispatch]);

//   useEffect(() => {
//     if (user?.role === "Admin") {
//       setSelectedComponent("AdminDashboard");
//     } else if (user?.role === "user") {
//       setSelectedComponent("UserDashboard");
//     }
//   }, [user]);

//   if (initializing) {
//     return (
//       <div className="flex justify-center items-center min-h-screen text-lg font-medium">
//         Loading...
//       </div>
//     );
//   }

//   const renderComponent = () => {
//     if (!user?.role) {
//       return (
//         <div className="text-center mt-10 text-red-600 font-medium">
//           Unable to load user role. Please try refreshing the page.
//         </div>
//       );
//     }

//     if (user.role === "Admin") {
//       switch (selectedComponent) {
//         case "AdminDashboard":
//           return <AdminDashboard />;
//         case "Books":
//           return <Books />;
//         case "Catalog":
//           return <Catalog />;
//         case "Users":
//           return <Users />;
//         default:
//           return <AdminDashboard />;
//       }
//     } else {
//       switch (selectedComponent) {
//         case "UserDashboard":
//           return <UserDashboard />;
//         case "Books":
//           return <Books />;
//         case "My Borrowed Books":
//           return <MyBorrowedBooks />;
//         default:
//           return <UserDashboard />;
//       }
//     }
//   };

//   return (
//     <Router>
//       <ToastContainer theme="colored" />
//       <Routes>
//         <Route
//           path="/"
//           element={!isAuthenticated ? <LandingPage /> : <Navigate to="*" />}
//         />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/password/forgot" element={<ForgotPassword />} />
//         <Route path="/otp-verification/:email" element={<OTP />} />
//         <Route path="/password/reset/:token" element={<ResetPassword />} />
//         <Route path="/contact" element={<Contact />} />

//         <Route
//           path="*"
//           element={
//             isAuthenticated ? (
//               <div className="flex">
//                 <SideBar
//                   setSelectedComponent={setSelectedComponent}
//                   isSideBarOpen={true}
//                   setIsSideBarOpen={() => {}}
//                 />
//                 <main className="flex-1 ml-64 p-6">{renderComponent()}</main>
//               </div>
//             ) : (
//               <Navigate to="/" />
//             )
//           }
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


//2nd running code 
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/slice/authSlice";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import OTP from "./pages/OTP";
import ResetPassword from "./pages/ResetPassword";
import Contact from "./pages/Contact";
import LandingPage from "./pages/LandingPage";

import SideBar from "./layout/SideBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import Books from "./components/BookManagement";
import Catalog from "./components/Catalog";
import Users from "./components/Users";
import MyBorrowedBooks from "./components/MyBorrowedBooks";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [initializing, setInitializing] = useState(true);
  const [selectedComponent, setSelectedComponent] = useState(null);

  // Get user on load only if token exists
  useEffect(() => {
    const hasToken = document.cookie.includes("token");
    if (hasToken) {
      dispatch(getUser())
        .catch((error) => {
          console.error("getUser failed:", error);
        })
        .finally(() => setInitializing(false));
    } else {
      setInitializing(false);
    }
  }, [dispatch]);

  // Set default component based on role
  useEffect(() => {
    if (user?.role === "Admin") {
      setSelectedComponent("AdminDashboard");
    } else if (user?.role === "user") {
      setSelectedComponent("UserDashboard");
    }
  }, [user]);

  // Final fallback for component if selectedComponent is not set
  const renderComponent = () => {
    if (user?.role === "Admin") {
      switch (selectedComponent || "AdminDashboard") {
        case "AdminDashboard":
          return <AdminDashboard />;
        case "Books":
          return <Books />;
        case "Catalog":
          return <Catalog />;
        case "Users":
          return <Users />;
        default:
          return <AdminDashboard />;
      }
    } else if (user?.role === "user") {
      switch (selectedComponent || "UserDashboard") {
        case "UserDashboard":
          return <UserDashboard />;
        case "Books":
          return <Books />;
        case "My Borrowed Books":
          return <MyBorrowedBooks />;
        default:
          return <UserDashboard />;
      }
    } else {
      return <div className="text-red-600 font-bold p-4">Unauthorized role</div>;
    }
  };

  // Show loading spinner only while fetching user
  if (initializing) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-medium">
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <ToastContainer theme="colored" />
      <Routes>
        <Route path="/" element={!isAuthenticated ? <LandingPage /> : <Navigate to="*" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/otp-verification/:email" element={<OTP />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/contact" element={<Contact />} />

        <Route
          path="*"
          element={
            isAuthenticated ? (
              <div className="flex">
                <SideBar
                  setSelectedComponent={setSelectedComponent}
                  isSideBarOpen={true}
                  setIsSideBarOpen={() => {}}
                />
                <main className="flex-1 ml-64 p-6">{renderComponent()}</main>
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
