'use client';

import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

import { FirebaseAppProvider, DatabaseProvider, AuthProvider, useFirebaseApp } from 'reactfire';
import {firebaseConfig} from "@/lib/firebase";

function FirebaseComponents({ children }:any) {
    const app = useFirebaseApp(); // a parent component contains a `FirebaseAppProvider`

    // initialize Database and Auth with the normal Firebase SDK functions
    const database = getDatabase(app);
    const auth = getAuth(app);

    // any child components will be able to use `useUser`, `useDatabaseObjectData`, etc
    return (
        <AuthProvider sdk={auth}>
            <DatabaseProvider sdk={database}>
                {children}
            </DatabaseProvider>
        </AuthProvider>
    );
}

export function Providers({children}: { children: React.ReactNode }) {
    return (
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
            <FirebaseComponents>
                {children}
            </FirebaseComponents>
        </FirebaseAppProvider>
    )
}

