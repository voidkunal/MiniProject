import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Pie } from "react-chartjs-2";
import Header from "../layout/Header";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";

import bookIcon from "../assets/book-square.png";
import browseIcon from "../assets/pointing.png";
import logoWithTitle from "../assets/logo-with-title.png";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);

const UserDashboard = () => {
  const { userBorrowedBooks } = useSelector((state) => state.borrow);
  const [readBooksCount, setReadBooksCount] = useState(0);

  useEffect(() => {
    setReadBooksCount(userBorrowedBooks.length);
  }, [userBorrowedBooks]);

  const pieData = {
    labels: ["Read Books"],
    datasets: [
      {
        data: [readBooksCount],
        backgroundColor: ["#facc15"],
        hoverOffset: 6,
      },
    ],
  };

  return (
    <main className="relative flex-1 p-6 pt-28 bg-gray-50 min-h-screen">
      <Header />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-10">
        {/* Read Books Card */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
          <div className="flex items-center gap-4">
            <img src={bookIcon} alt="book" className="w-10 h-10" />
            <div>
              <h3 className="text-xl font-semibold">Read Books</h3>
              <p className="text-gray-600 text-sm">{readBooksCount} books you've read</p>
            </div>
          </div>
        </div>

        {/* Book Library Card */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
          <div className="flex items-center gap-4">
            <img src={browseIcon} alt="browse" className="w-10 h-10" />
            <div>
              <h3 className="text-xl font-semibold">Book Library</h3>
              <p className="text-gray-600 text-sm">Explore available books</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        {/* Pie Chart */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold mb-4">Reading Summary</h2>
          <div className="w-full max-w-sm">
            <Pie data={pieData} options={{ responsive: true }} />
          </div>
          <div className="mt-6 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#facc15] rounded-full" /> Read Books
            </div>
          </div>
        </div>

        {/* Quote & Branding */}
        <div className="bg-white rounded-2xl shadow p-8 flex flex-col justify-between">
          <blockquote className="text-xl xl:text-2xl font-medium text-gray-800 leading-relaxed mb-4">
            “A reader lives a thousand lives before he dies... The man who never reads lives only one.”
          </blockquote>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>~ Void Tech Team</span>
            <img src={logoWithTitle} alt="logo" className="w-auto h-10" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserDashboard;
