import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import LogoutButton from '../ui/LogoutButton';

const Header = () => {
  const authState = useSelector((state: RootState) => state.authReducer.user);
  const navigate = useNavigate();

  const loggedInTemplate = (
    <>
      <div className='flex gap-8 items-center'>
        <LogoutButton />
      </div>
    </>
  );

  return (
    <div className='shadow-lg bg-black py-4 px-8 text-white flex justify-between items-center'>
      <div className='flex gap-10'>
        <img
          className='w-12 cursor-pointer'
          src='./icons/schedule.png'
          alt='schedule'
          onClick={() => navigate('/')}
        />

        <button onClick={() => navigate('/')}>Home</button>
      </div>
      <div>
        {authState ? (
          loggedInTemplate
        ) : (
          <>
            <button className='mr-8' onClick={() => navigate('/sign-in')}>
              Sign in
            </button>
            <button onClick={() => navigate('/sign-up')}>Sign up</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
