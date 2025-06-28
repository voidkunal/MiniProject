import React from "react";
import { BookA } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleReadBookPopup } from "../store/slice/popupSlice";
import { useState } from "react";
import Header from "../layout/Header";
import ReadBookPopup from "../popups/ReadBookPopup";

const MyBorrowedBooks = () => {
  const dispatch = useDispatch();

  const { books } = useSelector((state) => state.book);
  const { userBorrowedBooks } = useSelector((state) => state.borrow);

  const { readBookPopup } = useSelector((state) => state.popup);

  const [readBook, setReadBook ] = useState({});
  // const openReadPopup = (id) => {
  //   const book = book.find((book) => book._id === id);
  //   setReadBook(book);
  //   dispatch(toggleReadBookPopup());
  // };

  const openReadPopup = (id) => {
  const selectedBook = books.find((book) => book._id === id);
  setReadBook(selectedBook);
  dispatch(toggleReadBookPopup());
};

  const formatDate = (timeStamp) => { 
  const date = new Date(timeStamp);
  const formattedDate = `${String(date.getDate()).padStart(2, 0)}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getFullYear())}`;
  const formattedTime = `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
  const result = `${formattedDate} ${formattedTime}`;
  return result;
};


const [filter, setFilter] = useState("returned");

const returnedBooks = userBorrowedBooks?.filter(book=> {
  return book.returned === true;
});

const nonReturnedBooks = userBorrowedBooks?.filter(book=> {
  return book.returned === false;
});

const BooksToDisplay = filter === "returned" ? returnedBooks : nonReturnedBooks;


  return <>
  
  <main className="relative flex-1 p-6 pt-28">

    <Header />
    {/* SUB HEADER  */}
    <header className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
      <h2 className="text-xl font-medium md:text-2xl md:font-semibold">Borrowed Book</h2>
    </header>

    <header className="flex flex-col gap-3 sm:flex-row md:items-center">
     <button
            className={`relative rounded sm:rounded-tl-none sm:rounded-bl-none sm:rounded-tr-lg sm:rounded-br-lg text-center border-2 font-semibold py-2 w-full sm:w-72 transition-colors duration-200
              ${filter === "returned"
                ? "bg-black text-white border-black"
                : "text-black border-gray-800 hover:bg-black hover:text-white hover:border-black"
              }`}
            onClick={() => setFilter("returned")}
          >
            Returned Books
          </button>

          <button
            className={`relative rounded sm:rounded-tl-none sm:rounded-bl-none sm:rounded-tr-lg sm:rounded-br-lg text-center border-2 font-semibold py-2 w-full sm:w-72 transition-colors duration-200
              ${filter === "nonReturned"
                ? "bg-black text-white border-black"
                : "text-black border-gray-500 hover:bg-black hover:text-white hover:border-black"
              }`}
            onClick={() => setFilter("nonReturned")}
          >
            Non-Returned Book
          </button>
     
    </header>
     {
      BooksToDisplay && BooksToDisplay.length > 0 ? (
        <div className="mt-6 over-flow-auto bg-white rounded-md shadow-lg">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Book Title</th>
                <th className="px-4 py-2 text-left">Date & Time</th>
                <th className="px-4 py-2 text-left">Due Date</th>
                <th className="px-4 py-2 text-center">Returned</th>
                <th className="px-4 py-2 text-center">View</th>
              </tr>
            </thead>

            <tbody>
              {
                BooksToDisplay.map((book, index) => (
                  <tr key={index} className={(index + 1) % 2 === 0 ? "bg-gray-200" : ""}>
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{book.bookTitle}</td>
                    <td className="px-4 py-2">{formatDate(book.borrowedDate)}</td>
                    <td className="px-4 py-2">{formatDate(book.dueDate)}</td>
                    <td className="px-4 py-2 text-center">
                      {book.returned ? "Yes" : "No"}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {/* <button onClick={() => openReadPopup(book._id)} className="text-blue-500 hover:underline"> */}
                        <BookA onClick={() => openReadPopup(book._id)} />
                      {/* </button> */}
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      ) : filter === "returned" ?  (
        <h3 className="text-3xl mt-5 font-medium">No returned books found!</h3>
      ) : (
        <h3 className="text-3xl mt-5 font-medium">No non-Returned books found!</h3>
      )
    }

  </main>

  {readBookPopup && <ReadBookPopup book={readBook} />}
  
  </>
};

export default MyBorrowedBooks;

