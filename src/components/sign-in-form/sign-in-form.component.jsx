import { useState } from "react";
import {
  createUserDocumentFromAuth,
  signInWithGooglePopUp,
  signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input-component";
import './sign-in-form.styles.scss';
import Button from "../button/button.component";


const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetForFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopUp();
    await createUserDocumentFromAuth(user);
  };


  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(email , password);
      console.log(response);
      resetForFields();
    } catch (error) {
      
      switch(error.code) {
        case 'auth/wrong-password':
          alert('incorrect credentials')
          break
        case 'auth/user-not-found':
          alert('no user with this email')
          break
        default:
          console.log(error)  
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
        <Button  type="submit">Sign In</Button>
        <Button buttonType="google" type="button" onClick={signInWithGoogle}>Google Sign In </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
