"use client";

import { useAuth, useUser } from 'reactfire';
import { GoogleAuthProvider, signInWithPopup, signOut, Auth } from 'firebase/auth';

export default function Login() {
    const auth = useAuth() as Auth;
    const { data: user } = useUser();

    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <div>
            {user ? (
                <>
                    <p>Welcome, {user.displayName}</p>
                    <button onClick={handleSignOut}>Sign out</button>
                </>
            ) : (
                <button onClick={googleSignIn}>Sign in with Google</button>
            )}
        </div>
    );
}
