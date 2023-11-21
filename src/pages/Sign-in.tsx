import FormTitle from '../components/ui/FormTitle';
import AuthForm from '../components/ui/AuthForm';

const SignIn = () => {
  return (
    <div className='form-container'>
      <FormTitle title='Sign in'></FormTitle>
      <AuthForm isSignUp={false} />
    </div>
  );
};

export default SignIn;
