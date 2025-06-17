// import { auth } from "@/auth";
// import { axiosAuth } from "@/lib/axios";
// import { cookies } from "next/headers";

// const authAxios = axiosAuth
// authAxios.interceptors.request.use((config) => {
//     if (!config.headers['Authorization']) {

//         config.headers['Authorization'] = `jwt ${cookies().get('authjs.session-token')}`
//     }
//     return config;
// },
//     (error) => Promise.reject(error)
// );

// authAxios.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const prevRequest = error.config;
//         if (error.response.status === 401 && !prevRequest.sent) {
//             prevRequest.sent = true;
//             const ses = await auth();
//             prevRequest.headers["Authorization"] = `jwt ${ses?.user?.token}`;
//             return axiosAuth(prevRequest)
//         }
//         return Promise.reject(error)
//     }
// )
// export default authAxios;