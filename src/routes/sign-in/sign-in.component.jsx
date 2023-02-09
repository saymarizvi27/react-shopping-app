import { signInWithGooglePopUp, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";


const SignIn = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopUp();
        const userDocRef = await createUserDocumentFromAuth(user);
        console.log(userDocRef + "hi");
    }


    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign In to Google</button>
        </div>
    )
};

export default SignIn;