import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const UpdateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");

  const [image, setImage] = useState("");
  const [status, setStatus] = useState("Unread");
  const [rating, setRating] = useState(0);
  const [favorite, setFavorite] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);

    axios
      .get(`http://localhost:5555/books/get/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);

        setImage(response.data.image || "");
        setStatus(response.data.status || "Unread");
        setRating(response.data.rating || 0);
        setFavorite(response.data.favorite || false);

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleEditBook = () => {
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
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        alert("Something went wrong");
      });
  };

  return (
    <div className="p-4">
      <BackButton />

      <h1 className="text-3xl my-4 font-bold text-center">
        Edit Book
      </h1>

      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-full max-w-2xl p-6 mx-auto gap-4 shadow-lg">

          <input
            type="text"
            placeholder="Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Author Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            placeholder="Publish Year"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Book Cover Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="border p-3 rounded-lg"
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

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={favorite}
              onChange={(e) => setFavorite(e.target.checked)}
            />
            Favorite Book ❤️
          </label>

          <button
            onClick={handleEditBook}
            className="p-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          >
            Update Book
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateBook;