import { auth } from "../fbase";

export const signUp = async form => {
    const {email, password, name} = form
     return auth.createUserWithEmailAndPassword(email, password)
    .then(result=> result.user.updateProfile({displayName:name}));
}

export const signIn = form => {
    const {email, password} = form;
    return auth.signInWithEmailAndPassword(email, password);
}