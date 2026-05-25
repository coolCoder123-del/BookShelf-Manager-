import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

const BooksTable = ({ books }) => {
  return (
    <table className="w-full border-separate border-spacing-2">
      <thead className="bg-gray-800 text-white">
        <tr className="h-12">
          <th className="border rounded-md">No.</th>
          <th className="border rounded-md">Cover</th>
          <th className="border rounded-md">Title</th>
          <th className="border rounded-md">Author</th>
          <th className="border rounded-md">Year</th>
          <th className="border rounded-md">Status</th>
          <th className="border rounded-md">Rating</th>
          <th className="border rounded-md">Favorite</th>
          <th className="border rounded-md">Operations</th>
        </tr>
      </thead>

      <tbody>
        {books.map((book, index) => (
          <tr
            key={book._id}
            className="bg-white hover:bg-gray-100 transition"
          >
            <td className="border text-center">
              {index + 1}
            </td>

            <td className="border text-center p-2">
              <img
                src={
                  book.image ||
                  "https://via.placeholder.com/60x80?text=Book"
                }
                alt={book.title}
                className="h-16 w-12 object-cover mx-auto rounded"
              />
            </td>

            <td className="border text-center">
              {book.title}
            </td>

            <td className="border text-center">
              {book.author}
            </td>

            <td className="border text-center">
              {book.publishYear}
            </td>

            <td className="border text-center">
              {book.status || "Unread"}
            </td>

            <td className="border text-center">
              {"⭐".repeat(book.rating || 0)}
            </td>

            <td className="border text-center">
              {book.favorite ? "❤️" : "—"}
            </td>

            <td className="border text-center">
              <div className="flex justify-center gap-4">
                <Link to={`/show-book/${book._id}`}>
                  <BsInfoCircle className="text-2xl text-green-700" />
                </Link>

                <Link to={`/update-book/${book._id}`}>
                  <AiOutlineEdit className="text-2xl text-yellow-600" />
                </Link>

                <Link to={`/delete-book/${book._id}`}>
                  <MdOutlineDelete className="text-2xl text-red-600" />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BooksTable;