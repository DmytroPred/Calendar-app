import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className='material-icons bg-rounded-gray-hover'
      onClick={() => navigate(-1)}
    >
      arrow_back
    </button>
  );
};

export default BackButton;
