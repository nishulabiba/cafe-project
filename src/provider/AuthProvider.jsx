/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { Children, useEffect, useState } from "react"
import { createContext } from "react";
import { FacebookAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth"
import { app } from "../firebase/firebase.config";
import axios from "axios";
import { data } from "autoprefixer";


export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {



    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const auth = getAuth(app)

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }
    const updateUser = (name, photoURL) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL
        });
    }
    // google signIn

    const gProvider = new GoogleAuthProvider();
    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, gProvider)
    }
    const fProvider = new FacebookAuthProvider()
    const facebookSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, fProvider)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            console.log('current User:', currentUser)
            //get and set token
            if (currentUser) {
                axios.post('https://cafe-server-wmpu.vercel.app/jwt', { email: currentUser.email })
                    .then(data => {
                        localStorage.setItem('access_token', data.data.token)

                    })
                setLoading(false)

            }
            else {
                localStorage.removeItem('access_token')
                setLoading(false)

            }



        });


        return () => {
            return unsubscribe;

        }
    }
        , [auth])

    const authInfo = {

        user, loading, createUser, signIn, logOut, updateUser, googleSignIn, facebookSignIn

    }
    return (
        <AuthContext.Provider value={authInfo}>

            {children}

        </AuthContext.Provider>
    );
};

export default AuthProvider;