import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database";
import { app } from "./firebase";

const ye = app;
const db = getDatabase(ye);

const auth = getAuth();

export const signUp = async (email, password, username) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await set(ref(db, `users/${user.uid}`), {
            uid: user.uid,
            email: user.email,
            favorites: [],
            username: username,
            bio: 'No bio yet...'
        });
        window.localStorage.setItem('notAToken', JSON.stringify(user.accessToken));
        window.localStorage.setItem('user', JSON.stringify(user));
        return user;
    } catch (error) {
        console.error(error);
    }
}

export const signIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        window.localStorage.setItem('notAToken', JSON.stringify(user.accessToken));
        window.localStorage.setItem('user', JSON.stringify(user));
        // console.log('fireauth 35: ', user);
        return user;
    } catch (error) {
        console.error(error);
    }
};

export const signOut = async () => {
    try {
        await auth.signOut();
        window.localStorage.removeItem('notAToken');
        window.localStorage.removeItem('user');
    } catch (error) {
        console.error(error);
    }
}