import { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigateURL = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBookFunc = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/delete/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("The book is deleted.", { variant: 'danger' });
        navigateURL('/');
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar('An error occured while deleting the book. Check thr console.', { variant: 'error' });
        console.log(err);
      })
  };

  const handleDonotDeleteButtonFunc = () => {
    navigateURL('/');
  };

  return (
    <div className="p-5">
      <div className="flex flex-row items-center">
        <BackButton />
        <h1 className="text-3xl my-5 ml-3 font-bold">Delete a Book</h1>
      </div>
      {loading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : ''}
      <div className="flex flex-col items-center border-2 border-gray-300 bg-gray-300 rounded-md w-full max-w-[600px] p-8 mx-auto">
        <h3 className="text-xl">Are you sure you want to delete this book?</h3>
        <div className="flex justify-center">
          <button
            className="px-5 py-2 rounded-md bg-red-600 text-white m-5 w-half hover:shadow-md"
            onClick={handleDeleteBookFunc}
          >
            Yes
          </button>
          <button
            className="px-5 py-2 rounded-md bg-green-600 text-white m-5 w-half hover:shadow-md"
            onClick={handleDonotDeleteButtonFunc}
          >
            No
          </button>
        </div>
      </div>
    </div>
  )
};

export default DeleteBook;