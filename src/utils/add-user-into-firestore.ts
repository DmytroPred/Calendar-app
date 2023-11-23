import { UserCredential } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const addUserIntoFirestore = async (
  result: UserCredential
): Promise<void> => {
  const user = result.user;

  await setDoc(doc(db, `users/${user.uid}`), {
    email: user.email,
    userId: user.uid,
  });
};

export default addUserIntoFirestore;