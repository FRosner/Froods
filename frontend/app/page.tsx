"use client";

import {useUser} from "reactfire";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {Button} from "@mantine/core";
import {Header} from "@/app/components/Header";

export default function Home() {
  const { status, data: user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user && status !== 'loading') {
      router.push('/login'); // Redirect to login page if not authenticated
    }
  }, [user, router, status]);
  
  return (
      <div>
        <Header/>
        {user?.displayName}
        <Button>Hello Mantine</Button>
      </div>
  );
}
