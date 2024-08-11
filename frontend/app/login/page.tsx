"use client";

import Login from '../components/Login';
import {AuthenticationForm} from "@/app/components/AuthenticationForm";
import {Center, Loader} from "@mantine/core";
import {useEffect} from "react";
import {useUser} from "reactfire";
import {useRouter} from "next/navigation";

export default function LoginPage() {
    const { status, data: user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (user && status !== 'loading') {
            router.push('/'); // Redirect to home page if authenticated
        }
    }, [user, router, status]);

    if (status === 'loading') {
        return <Loader/>;
    }

    return (
        <Center style={{ height: '100vh' }}>
            <AuthenticationForm/>
        </Center>
    );
}
