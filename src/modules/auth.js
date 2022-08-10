import { auth, db } from "../fbase";

export const signUp = async form => {
    const {email, password, name, url} = form;
    let uid;
    await auth.createUserWithEmailAndPassword(email, password)
    .then(result=> {
        console.log(result.user);
        result.user.updateProfile({displayName:name});
        result.user.updateProfile({photoURL:url});
        uid = result.user._delegate.uid;
    });

    await db.
    collection('user').
    add({
        name,
        email,
        uid
    })
}

export const signIn = form => {
    const {email, password} = form;
    return auth.signInWithEmailAndPassword(email, password);
}