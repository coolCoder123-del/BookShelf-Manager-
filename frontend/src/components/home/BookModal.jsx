import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';

const BookModal = ({ book, onClose }) => {
    return (
        <div
            className='fixed bg-black bg-opacity-60 top-0 right-0 bottom-0 left-0 z-50 flex justify-center items-center'
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className='w-[600px] max-w-full h-[400px] bg-white rounded-xl p-3 flex flex-col relative'
            >
                <AiOutlineClose
                    className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer'
                    onClick={onClose}
                />
                <h2 className="w-fit px-5 py-3 bg-red-400 rounded-lg">
                    {book.publishYear}
                </h2>
                <h4 className="my-2 text-gray-500">{book._id}</h4>
                <div className="flex justify-start items-center gap-x-2">
                    <PiBookOpenTextLight className="text-red-300 text-2xl" />
                    <h2 className="my-1">{book.title}</h2>
                </div>
                <div className="flex justify-start items-center gap-x-2">
                    <BiUserCircle className="text-red-300 text-2xl" />
                    <h2 className="my-1">{book.author}</h2>
                </div>
                <p className='mt-4'>Dummy text to show for a while</p>
                <p className='my-2'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quia
                    voluptatum sint. Nisi impedit libero eveniet cum vitae qui expedita
                    necessitatibus assumenda laboriosam, facilis iste cumque a pariatur
                    nesciunt cupiditate voluptas?
                </p>
            </div>
        </div>
    )
};

export default BookModal;