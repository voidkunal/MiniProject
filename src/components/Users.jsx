// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Header from "../layout/Header";

// const Users = () => { 
//   const {users} = useSelector((state) => state.user);

//   const formatDate = (timeStamp) => { 
//   const date = new Date(timeStamp);
//   const formattedDate = `${String(date.getDate()).padStart(2, 0)}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getFullYear())}`;
//   const formattedTime = `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
//   const result = `${formattedDate} ${formattedTime}`;
//   return result;
// };

//   return<>
//   <main className="relative flex-1 p-6 pt-28">

//     <Header />

//     {/* SUB HEADER  */}
    
//     <header className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
//       <h2 className="text-xl font-medium md:text-2xl md:font-semibold">Registered Users</h2>
//     </header>

//     {/* TABLE  */}
    
//     {
//       users && users.filter(user => user.role !== "Admin").length > 0 ? (
//          <div className="mt-6 overflow-auto bg-white rounded-md shadow-lg">
//           <table className="min-w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="px-4 py-2 text-left">ID</th>
//               <th className="px-4 py-2 text-left">Name</th>
//               <th className="px-4 py-2 text-left">Email</th>
//               <th className="px-4 py-2 text-left">Role</th>
//               <th className="px-4 py-2 text-center">No. of Books</th>
//               <th className="px-4 py-2 text-center">Created At</th>
//             </tr>
//           </thead>

//           <tbody>

//           {
//             users.filter(user => user.role !== "Admin").map((user, index) => (
//               <tr key={user._id} className={(index +1)%2 === 0 ? "bg-gray-200" : ""}>


//               <td className="px-4 py-2">{index +1}</td>
//               <td className="px-4 py-2">{user.name}</td>
//               <td className="px-4 py-2">{user.email}</td>
//               <td className="px-4 py-2">{user.role}</td>
              
//               <td className="px-4 py-2">{user?.borrowedBooks.length}</td>
//               <td className="px-4 py-2">{formatDate(user.createdAt)}</td>

              
//               </tr>
//             ))
//           }

//           </tbody>
//           </table>
//          </div>
//       ) : <h3 className="text-3xl mt-5 font-medium">No registered users found in library.</h3>
//     }

//   </main>
  
//   </>;
// };

// export default Users;


import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../layout/Header";
import { fetchAllUsers } from "../store/slice/userSlice"; // ✅ Corrected path

const Users = () => {
  const dispatch = useDispatch();

  // Extracting state from Redux
  const { users, loading, error } = useSelector((state) => state.user);

  // Fetch users on component mount
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6">Registered Users</h2>

        {/* Show loading */}
        {loading && <p className="text-gray-600">Loading users...</p>}

        {/* Show error */}
        {error && <p className="text-red-600">Error: {error}</p>}

        {/* Show users */}
        {!loading && !error && users.length === 0 && (
          <p className="text-lg text-gray-800">
            No registered users found in library.
          </p>
        )}

        {!loading && !error && users.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-white p-4 rounded shadow hover:shadow-md transition"
              >
                <h3 className="font-semibold text-lg">{user.name}</h3>
                <p className="text-gray-700">{user.email}</p>
                <p className="text-sm text-gray-500">Role: {user.role}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Users;
