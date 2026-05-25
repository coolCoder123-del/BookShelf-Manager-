import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";
import backgroundImage from "../assets/library-bg.jpg";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    setLoading(true);

    axios
      .get("http://localhost:5555/books/get")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  // Search Filter
  const filteredBooks = books.filter((book) => {
    const title = String(book.title || "").toLowerCase();
    const author = String(book.author || "").toLowerCase();
    const search = searchTerm.trim().toLowerCase();

    return title.includes(search) || author.includes(search);
  });

  // Dashboard Counts
  const totalBooks = books.length;

  const readBooks = books.filter(
    (book) => book.status === "Read"
  ).length;

  const readingBooks = books.filter(
    (book) => book.status === "Reading"
  ).length;

  const unreadBooks = books.filter(
    (book) => book.status === "Unread"
  ).length;

  const favoriteBooks = books.filter(
    (book) => book.favorite === true
  ).length;

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* Dark Overlay */}
      <div className="bg-black/60 min-h-screen p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
            📚 BookShelf Manager
          </h1>

          <Link to="/create-book">
            <MdOutlineAddBox className="text-white text-5xl hover:text-sky-300 transition" />
          </Link>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 Search books by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="
              w-full
              p-3
              rounded-xl
              border
              border-white/30
              bg-white/80
              backdrop-blur-md
              shadow-lg
              focus:outline-none
              focus:ring-2
              focus:ring-sky-400
            "
          />
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">

          <div className="backdrop-blur-md bg-blue-500/40 border border-white/30 text-white rounded-xl p-5 shadow-xl">
            <h2 className="text-lg">Total Books</h2>
            <p className="text-4xl font-bold">{totalBooks}</p>
          </div>

          <div className="backdrop-blur-md bg-green-500/40 border border-white/30 text-white rounded-xl p-5 shadow-xl">
            <h2 className="text-lg">Read</h2>
            <p className="text-4xl font-bold">{readBooks}</p>
          </div>

          <div className="backdrop-blur-md bg-yellow-500/40 border border-white/30 text-white rounded-xl p-5 shadow-xl">
            <h2 className="text-lg">Reading</h2>
            <p className="text-4xl font-bold">{readingBooks}</p>
          </div>

          <div className="backdrop-blur-md bg-red-500/40 border border-white/30 text-white rounded-xl p-5 shadow-xl">
            <h2 className="text-lg">Unread</h2>
            <p className="text-4xl font-bold">{unreadBooks}</p>
          </div>

          <div className="backdrop-blur-md bg-pink-500/40 border border-white/30 text-white rounded-xl p-5 shadow-xl">
            <h2 className="text-lg">Favorites ❤️</h2>
            <p className="text-4xl font-bold">{favoriteBooks}</p>
          </div>

        </div>

        {/* View Toggle */}
        <div className="flex justify-center gap-4 mb-6">

          <button
            onClick={() => setShowType("table")}
            className={`
              px-5 py-2 rounded-xl font-semibold shadow-lg
              ${
                showType === "table"
                  ? "bg-sky-600 text-white"
                  : "bg-white/80 text-black"
              }
            `}
          >
            Table View
          </button>

          <button
            onClick={() => setShowType("card")}
            className={`
              px-5 py-2 rounded-xl font-semibold shadow-lg
              ${
                showType === "card"
                  ? "bg-sky-600 text-white"
                  : "bg-white/80 text-black"
              }
            `}
          >
            Card View
          </button>

        </div>

        {/* Results Count */}
        <div className="mb-4 text-white font-medium text-lg">
          Showing {filteredBooks.length} of {totalBooks} books
        </div>

        {/* Content */}
        {loading ? (
          <Spinner />
        ) : filteredBooks.length === 0 ? (
          <div className="text-center text-2xl text-white mt-10">
            📚 No books found
          </div>
        ) : showType === "table" ? (
          <BooksTable books={filteredBooks} />
        ) : (
          <BooksCard books={filteredBooks} />
        )}

      </div>
    </div>
  );
};

export default Home;