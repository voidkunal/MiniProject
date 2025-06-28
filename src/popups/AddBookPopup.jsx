// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { closePopup } from "../store/slice/popupSlice";
// import { toast } from "react-toastify";
// import { addBook } from "../store/slice/bookSlice";

// const AddBookPopup = () => {
//   const dispatch = useDispatch();
//   const [bookData, setBookData] = useState({
//     title: "",
//     author: "",
//     file: null,
//     quantity: "",
//     price: "",
//   });

//   const { loading, error, message } = useSelector((state) => state.book);

//   const handleClose = () => {
//     dispatch(closePopup("addBookPopup"));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("title", bookData.title);
//     formData.append("author", bookData.author);
//     formData.append("quantity", bookData.quantity);
//     formData.append("price", bookData.price);
//     if (bookData.file) {
//       formData.append("bookFile", bookData.file);
//     }

//     dispatch(addBook(formData));
//   };

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//     }

//     if (message) {
//       toast.success(message);
//       dispatch(closePopup("addBookPopup"));
//     }
//   }, [error, message, dispatch]);

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
//         {/* ❌ Close Button */}
//         <button
//           className="absolute top-3 right-3 text-gray-600 text-2xl font-bold hover:text-red-500"
//           onClick={handleClose}
//         >
//           ×
//         </button>

//         <h2 className="text-xl font-semibold mb-4">Add New Book</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block mb-1 font-medium">Title</label>
//             <input
//               type="text"
//               className="w-full border border-gray-300 p-2 rounded"
//               value={bookData.title}
//               onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
//               required
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-medium">Author</label>
//             <input
//               type="text"
//               className="w-full border border-gray-300 p-2 rounded"
//               value={bookData.author}
//               onChange={(e) => setBookData({ ...bookData, author: e.target.value })}
//               required
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-medium">Quantity</label>
//             <input
//               type="number"
//               min="1"
//               className="w-full border border-gray-300 p-2 rounded"
//               value={bookData.quantity}
//               onChange={(e) => setBookData({ ...bookData, quantity: e.target.value })}
//               required
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-medium">Price (₹)</label>
//             <input
//               type="number"
//               min="0"
//               step="0.01"
//               className="w-full border border-gray-300 p-2 rounded"
//               value={bookData.price}
//               onChange={(e) => setBookData({ ...bookData, price: e.target.value })}
//               required
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-medium">Upload File</label>
//             <input
//               type="file"
//               className="w-full border border-gray-300 p-2 rounded"
//               accept=".pdf,.epub"
//               onChange={(e) => setBookData({ ...bookData, file: e.target.files[0] })}
//             />
//           </div>

//           <div className="flex justify-end space-x-4 pt-4">
//             <button
//               type="button"
//               onClick={handleClose}
//               className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
//             >
//               {loading ? "Uploading..." : "Add Book"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddBookPopup;


import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closePopup } from "../store/slice/popupSlice";
import { addBook, resetBookSlice } from "../store/slice/bookSlice";

const AddBookPopup = () => {
  const dispatch = useDispatch();

  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    description: "",
    quantity: "",
    price: "",
    file: null,
  });

  const { loading, message } = useSelector((state) => state.book);

  // Close popup and reset book slice
  useEffect(() => {
    if (message) {
      dispatch(closePopup("addBookPopup"));
      dispatch(resetBookSlice()); // Clear message/error after closing
    }
  }, [message, dispatch]);

  const handleClose = () => {
    dispatch(closePopup("addBookPopup"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", bookData.title);
    formData.append("author", bookData.author);
    formData.append("description", bookData.description); // ✅ Make sure it's included
    formData.append("quantity", bookData.quantity);
    formData.append("price", bookData.price);
    if (bookData.file) {
      formData.append("file", bookData.file); // ✅ Name should match backend: "file"
    }

    dispatch(addBook(formData));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        {/* ❌ Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-600 text-2xl font-bold hover:text-red-500"
          onClick={handleClose}
        >
          ×
        </button>

        <h2 className="text-xl font-semibold mb-4">Add New Book</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded"
              value={bookData.title}
              onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Author</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded"
              value={bookData.author}
              onChange={(e) => setBookData({ ...bookData, author: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              className="w-full border border-gray-300 p-2 rounded"
              rows="3"
              value={bookData.description}
              onChange={(e) => setBookData({ ...bookData, description: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Quantity</label>
            <input
              type="number"
              min="1"
              className="w-full border border-gray-300 p-2 rounded"
              value={bookData.quantity}
              onChange={(e) => setBookData({ ...bookData, quantity: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Price (₹)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              className="w-full border border-gray-300 p-2 rounded"
              value={bookData.price}
              onChange={(e) => setBookData({ ...bookData, price: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Upload File</label>
            <input
              type="file"
              className="w-full border border-gray-300 p-2 rounded"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => setBookData({ ...bookData, file: e.target.files[0] })}
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
            >
              {loading ? "Uploading..." : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookPopup;
