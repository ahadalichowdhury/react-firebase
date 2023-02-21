import { auth, googleProvider } from "../config/firebase";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(auth?.currentUser?.photoURL);
  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };
  const googleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    signOut(auth);
  };
  return (
    <div>
      <input
        placeholder="Email...."
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password...."
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn}>Sign In</button>
      <button onClick={googleSignIn}>Sign In with Google</button>

      <button onClick={logOut}>LogOut</button>
    </div>
  );
};
