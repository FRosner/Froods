"use client";

import { useUser } from 'reactfire';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedPage() {
    const { status, data: user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!user && status !== 'loading') {
            router.push('/login'); // Redirect to login page if not authenticated
        }
    }, [user, router, status]);

    if (status === 'loading') {
        return <span>Loading...</span>;
    }

    return <div>{user?.displayName}</div>;
}
