import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: number;
            userName: string;
            email: string;
            role: string;
            token: string,
            refreshToken: string,
            role_display: string,
            profile: {
                id: number | null;
                kampus: number | null;
                kampus_data: Record<any, string>;
                fakultas: number | null;
                fakultas_data: Record<any, string>;
                program_studi: number | null;
                program_studi_data: Record<any, string>;
            }
        }
    }
}