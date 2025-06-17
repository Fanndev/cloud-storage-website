'use client'

import { useSession } from "next-auth/react"
import { useEffect } from "react";
import { useRefreshToken } from "./refreshToken";
import { axiosAuth } from "@/lib/axios";

const useAxiosAuth = () => {
    const { data: session } = useSession();
    useEffect(() => {
        if (!session?.user?.token) return;
        
        const requestIntercept = axiosAuth.interceptors.request.use(async (config) => {
            if (!config.headers['Authorization']) {
                config.headers['Authorization'] = `jwt ${session?.user?.token}`
            }
            return config;
        },
            (error) => Promise.reject(error)
        );
        const responseIntercept = axiosAuth.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error.config;
                if (error.response.status === 401 && !prevRequest.sent) {
                    prevRequest.sent = true;
                    // await refreshToken();
                    prevRequest.headers["Authorization"] = `jwt ${session?.user?.token}`;
                    return axiosAuth(prevRequest)
                }
                return Promise.reject(error)
            }
        )

        return () => {
            axiosAuth.interceptors.request.eject(requestIntercept)
            axiosAuth.interceptors.response.eject(responseIntercept)
        }
    }, [session?.user?.token])
    return axiosAuth;
}

export default useAxiosAuth;