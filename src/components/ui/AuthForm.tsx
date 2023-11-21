import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { auth } from '../../config/firebase';
import { addUserIntoFirestore } from '../../utils/add-user-into-firestore';

interface Inputs {
  email: string;
  password: string;
}

const AuthForm = ({ isSignUp }: { isSignUp: boolean }) => {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    try {
      if (isSignUp) {
        createUser(data);
      } else {
        await signInWithEmailAndPassword(auth, data.email, data.password);
      }
    } catch (err) {
      console.error(err);
    }
  };

  async function createUser(data: Inputs): Promise<void> {
    await createUserWithEmailAndPassword(auth, data.email, data.password).then(
      (result) => addUserIntoFirestore(result)
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='form'>
      <input
        className='text-input'
        type='email'
        placeholder='Email...'
        autoComplete='email'
        {...register('email', { required: true })}
      />
      <input
        className='text-input'
        type='password'
        placeholder='Password...'
        autoComplete={isSignUp ? 'new-password' : 'current-password'}
        {...register('password', { required: true })}
      />
      <input type='submit' className='submit-button' />
    </form>
  );
};

export default AuthForm;
