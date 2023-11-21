import FormTitle from '../components/ui/FormTitle';
import AuthForm from '../components/ui/AuthForm';

const SignUp = () => {
  return (
    <div className='form-container'>
      <FormTitle title='Sign up'></FormTitle>
      <AuthForm isSignUp={true} />
    </div>
  );
};

export default SignUp;
