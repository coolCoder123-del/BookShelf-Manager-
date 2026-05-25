import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";

import {
  BsInfoCircle,
  BsStarFill,
} from "react-icons/bs";

import BookModal from "./BookModal";

const SingleBookCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  const renderStars = (rating = 0) => {
    return [...Array(rating)].map((_, index) => (
      <BsStarFill
        key={index}
        className="text-yellow-500"
      />
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Read":
        return "bg-green-500";
      case "Reading":
        return "bg-yellow-500";
      default:
        return "bg-red-500";
    }
  };

  return (
    <div
      className="
      border-2
      border-gray-200
      rounded-xl
      px-4
      py-4
      m-4
      relative
      hover:shadow-2xl
      hover:scale-105
      transition-all
      duration-300
      bg-white
      "
    >
      {book.favorite && (
        <div className="absolute top-2 right-2 bg-pink-500 text-white px-2 py-1 rounded-full text-xs">
          ❤️ Favorite
        </div>
      )}

      <div className="flex justify-center mb-4">
        <img
          src={
            book.image ||
            "https://via.placeholder.com/200x280?text=Book"
          }
          alt={book.title}
          className="h-64 w-full object-cover rounded-lg"
        />
      </div>

      <h2 className="text-xl font-bold text-center mb-2">
        {book.title}
      </h2>

      <p className="text-center text-gray-600">
        {book.author}
      </p>

      <p className="text-center text-gray-500 mb-3">
        {book.publishYear}
      </p>

      <div className="flex justify-center gap-1 mb-3">
        {renderStars(book.rating)}
      </div>

      <div className="flex justify-center mb-4">
        <span
          className={`${getStatusColor(
            book.status
          )} text-white px-3 py-1 rounded-full text-sm`}
        >
          {book.status || "Unread"}
        </span>
      </div>

      <div className="flex justify-between items-center mt-4">

        <BsInfoCircle
          className="
          text-2xl
          text-green-800
          cursor-pointer
          hover:text-black
          "
          onClick={() => setShowModal(true)}
        />

        <Link to={`/show-book/${book._id}`}>
        <BsInfoCircle className="text-2xl text-blue-800" />
        </Link>

        <Link to={`/update-book/${book._id}`}>
        <AiOutlineEdit className="text-2xl text-yellow-600" />
        </Link>

        <Link to={`/delete-book/${book._id}`}>
        <AiOutlineDelete className="text-2xl text-red-600" />
        </Link>
      </div>

      {showModal && (
        <BookModal
          book={book}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default SingleBookCard;