import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/get/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-5">
      <div className="flex flex-row items-center">
        <BackButton />
        <h1 className="text-3xl my-5 ml-3 font-bold">Book Details</h1>
      </div>
      {loading ? (
        <div className='flex justify-center'>
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col w-fit p-5">
          {/* <div className="my-5">
            <span className="mr-5 text-gray">Id</span>
            <span>{book._id}</span>
          </div> */}
          <div className="my-2">
            <span className="mr-5 text-gray">Book Title:</span>
            <span className="bg-gray-500 text-white px-3 rounded-md py-1">
              {book.title}
            </span>
          </div>
          <div className="my-2">
            <span className="mr-5 text-gray">Author Name:</span>
            <span className="bg-gray-500 text-white px-3 rounded-md py-1">
              {book.author}
            </span>
          </div>
          <div className="my-2">
            <span className="mr-5 text-gray">Year of Publish:</span>
            <span className="bg-gray-500 text-white px-3 rounded-md py-1">
              {book.publishYear}
            </span>
          </div>
          <div className="my-2">
            <span className="mr-5 text-gray">Created At:</span>
            <span className="bg-gray-500 text-white px-3 rounded-md py-1">
              {new Date(book.createdAt).toString()}
            </span>
          </div>
          <div className="my-2">
            <span className="mr-5 text-gray">Last Updated At:</span>
            <span className="bg-gray-500 text-white px-3 rounded-md py-1">
              {new Date(book.updatedAt).toString()}
            </span>
          </div>
        </div>
      )}
    </div>
  )
};

export default ShowBook;