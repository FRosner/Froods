"use client";

import { useUser } from 'reactfire';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedPage() {
    const { data: user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login'); // Redirect to login page if not authenticated
        }
    }, [user, router]);

    if (!user) {
        return <p>Loading...</p>;
    }

    return <div>Protected Content</div>;
}
