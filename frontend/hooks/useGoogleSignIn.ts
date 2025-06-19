"use client"
import { useRouter } from "next/navigation"

export function useGoogleSignIn() {
  const router = useRouter();

  const handleGoogleSignIn = () => {
    window.location.href = "http://localhost:5000/api/auth/google/redirect";
  };

  // Fungsi untuk simpan access token setelah login (misal di halaman callback/dashboard)
  const saveAccessToken = (accessToken: string) => {
    localStorage.setItem("access_token", accessToken);
  };

  return { handleGoogleSignIn, saveAccessToken };
} 