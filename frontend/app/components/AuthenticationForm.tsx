"use client";

import { useToggle, upperFirst } from '@mantine/hooks';
import {
    Text,
    Paper,
    Group,
    PaperProps,
} from '@mantine/core';
import { GoogleButton } from './GoogleButton';
import {useAuth, useUser} from "reactfire";
import {Auth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";

export function AuthenticationForm(props: PaperProps) {
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

    return (
        <Paper radius="md" p="xl" withBorder {...props}>
            <Text size="lg" fw={500}>
                Welcome to Froods!
            </Text>

            <Group grow mb="md" mt="md">
                <GoogleButton radius="xl" onClick={googleSignIn}>Login with Google</GoogleButton>
            </Group>
        </Paper>
    );
}