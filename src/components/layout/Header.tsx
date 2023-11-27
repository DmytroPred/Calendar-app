import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import LogoutButton from '../ui/LogoutButton';
import { ReactNode, useCallback } from 'react';

const Header = () => {
  const authState = useSelector((state: RootState) => state.authReducer.user);
  const navigate = useNavigate();

  const loggedInTemplate = useCallback((): ReactNode => {
    return (
      <>
        <div className='flex gap-8 items-center'>
          <LogoutButton />
        </div>
      </>
    );
  }, []);

  return (
    <header className='shadow-lg bg-black px-4 py-4 sm:px-8 text-white flex justify-between items-center'>
      <div className='flex sm:gap-10 gap-3'>
        <img
          className='w-12 cursor-pointer'
          src='/icons/schedule.svg'
          alt='schedule'
          onClick={() => navigate('/')}
        />

        <button onClick={() => navigate('/')}>Calendar</button>
      </div>
      <div>
        {authState ? (
          loggedInTemplate()
        ) : (
          <>
            <button
              className='sm:mr-8 mr-4'
              onClick={() => navigate('/sign-in')}
            >
              Sign in
            </button>
            <button onClick={() => navigate('/sign-up')}>Sign up</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
