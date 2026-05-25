import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

// eslint-disable-next-line react/prop-types
const BackButton = ({ destinationURL = '/' }) => {
  return (
    <div className='flex'>
        <Link to={destinationURL}
        className='text-blue-800 px-4 py-1 w-fit'>
            <BsArrowLeft className='text-2xl' />
        </Link>
    </div>
  )
};

export default BackButton;