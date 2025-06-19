"use client"

import axios from "@/lib/axios";
import { useSession } from "next-auth/react"

export const useRefreshToken = () => {
    const { data: session, update } = useSession();
    const refreshToken = async () => {
        const res = await axios.post("/auth/access-token", {
            refresh: session?.user?.refreshToken
        });

        if (res) {
            update()
        }
    }

    return refreshToken;
}