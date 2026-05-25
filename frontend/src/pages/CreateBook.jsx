import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import backgroundImage from "../assets/library-bg.jpg";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");

  const [image, setImage] = useState("");
  const [status, setStatus] = useState("Unread");
  const [rating, setRating] = useState(0);
  const [favorite, setFavorite] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
      image,
      status,
      rating,
      favorite,
    };

    setLoading(true);

    axios
      .post("http://localhost:5555/books/save", data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        alert("Something went wrong");
      });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* CONTENT */}
      <div className="relative w-full max-w-3xl p-6">

        {/* BACK BUTTON */}
        <BackButton />

        {/* TITLE */}
        <h1 className="text-4xl font-bold text-white text-center mb-6">
          📚 Add New Book
        </h1>

        {loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 gap-4 shadow-2xl">

            <input
              type="text"
              placeholder="Book Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-3 rounded-lg outline-none"
            />

            <input
              type="text"
              placeholder="Author Name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border p-3 rounded-lg outline-none"
            />

            <input
              type="number"
              placeholder="Publish Year"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className="border p-3 rounded-lg outline-none"
            />

            <input
              type="text"
              placeholder="Book Cover Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="border p-3 rounded-lg outline-none"
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border p-3 rounded-lg"
            >
              <option value="Unread">Unread</option>
              <option value="Reading">Reading</option>
              <option value="Read">Read</option>
            </select>

            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="border p-3 rounded-lg"
            >
              <option value="0">0 Stars</option>
              <option value="1">1 Star</option>
              <option value="2">2 Stars</option>
              <option value="3">3 Stars</option>
              <option value="4">4 Stars</option>
              <option value="5">5 Stars</option>
            </select>

            <label className="flex items-center gap-3 text-white">
              <input
                type="checkbox"
                checked={favorite}
                onChange={(e) => setFavorite(e.target.checked)}
              />
              Favorite Book ❤️
            </label>

            <button
              className="p-3 bg-sky-500 text-white rounded-lg hover:bg-sky-700 font-bold"
              onClick={handleSaveBook}
            >
              Save Book
            </button>

          </div>
        )}
      </div>
    </div>
  );
};

export default CreateBook;