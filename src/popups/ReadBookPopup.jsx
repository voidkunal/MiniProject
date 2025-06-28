// // // import React from "react";
// // import { useDispatch } from "react-redux";
// // import { closePopup } from "../store/slice/popupSlice";

// // const ReadBookPopup = ({ book }) => {
// //   const dispatch = useDispatch();

// //   const handleClose = () => {
// //     dispatch(closePopup("readBookPopup"));
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //       <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl w-full relative overflow-y-auto max-h-[90vh]">
// //         {/* Close Button */}
// //         <button
// //           onClick={handleClose}
// //           className="absolute top-2 right-3 text-xl text-gray-600 hover:text-red-500"
// //         >
// //           ×
// //         </button>

// //         <h3 className="text-lg font-semibold mb-2">{book?.title}</h3>
// //         <p className="text-gray-700 mb-2">
// //           <strong>Author:</strong> {book?.author}
// //         </p>

// //         {/* ✅ File Preview Section */}
// //         {book?.bookFile ? (
// //           <div className="mt-4">
// //             <h4 className="font-semibold mb-2">Preview:</h4>

// //             {book.bookFile.endsWith(".pdf") ? (
// //               <iframe
// //                 src={`http://localhost:4000/uploads/${book.bookFile}`}
// //                 title="Book File"
// //                 className="w-full h-[500px] border"
// //               />
// //             ) : (
// //               <img
// //                 src={`http://localhost:4000/uploads/${book.bookFile}`}
// //                 alt="Uploaded Book"
// //                 className="w-full max-h-[500px] object-contain border"
// //               />
// //             )}
// //           </div>
// //         ) : (
// //           <p className="mt-4 text-red-500">No file uploaded for this book.</p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ReadBookPopup;


// import React from "react";
// import { useDispatch } from "react-redux";
// import { closePopup } from "../store/slice/popupSlice";

// const ReadBookPopup = ({ book }) => {
//   const dispatch = useDispatch();

//   const handleClose = () => {
//     dispatch(closePopup("readBookPopup"));
//   };

//   // ✅ Corrected file path key
//   const fileUrl = book?.filePath ? `http://localhost:4000/${book.filePath}` : null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl w-full relative overflow-y-auto max-h-[90vh]">
//         {/* Close Button */}
//         <button
//           onClick={handleClose}
//           className="absolute top-2 right-3 text-xl text-gray-600 hover:text-red-500"
//         >
//           ×
//         </button>

//         {/* File Preview */}
//         {fileUrl ? (
//           fileUrl.endsWith(".pdf") ? (
//             <iframe
//               src={fileUrl}
//               title="PDF Preview"
//               className="w-full h-[600px] border rounded"
//             ></iframe>
//           ) : (
//             <img
//               src={fileUrl}
//               alt="Book File"
//               className="w-full max-h-[600px] object-contain rounded border"
//             />
//           )
//         ) : (
//           <p className="text-red-500">⚠️ Book file is missing.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ReadBookPopup;


import React from "react";
import { useDispatch } from "react-redux";
import { closePopup } from "../store/slice/popupSlice";

const ReadBookPopup = ({ book }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closePopup("readBookPopup"));
  };

  const fileUrl = book?.bookFile
    ? `http://localhost:4000/uploads/${book.bookFile}`
    : book?.filePath
    ? `http://localhost:4000/${book.filePath}`
    : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl w-full relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={handleClose}
          className="absolute top-2 right-3 text-xl text-gray-600 hover:text-red-500"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold mb-1">{book?.title}</h2>
        <p className="text-gray-600 mb-3"><strong>Author:</strong> {book?.author}</p>

        {fileUrl ? (
          fileUrl.endsWith(".pdf") ? (
            <iframe
              src={fileUrl}
              title="PDF Preview"
              className="w-full h-[600px] border rounded"
            ></iframe>
          ) : (
            <img
              src={fileUrl}
              alt="Book Preview"
              className="w-full max-h-[600px] object-contain rounded border"
            />
          )
        ) : (
          <p className="text-red-500">⚠️ No book file uploaded.</p>
        )}
      </div>
    </div>
  );
};

export default ReadBookPopup;
