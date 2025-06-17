// import { type ClassValue, clsx } from "clsx";
// import { twMerge } from "tailwind-merge";

// export const jwt = {
//   decode: (token: string | undefined) => {
//     if (!token) return;

//     return JSON.parse(Buffer.from(token.split(" ")[1], "base64").toString());
//   },
// };

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

// export function formatCurrency(amount: number): string {
//   return new Intl.NumberFormat("id-ID", {
//     style: "currency",
//     currency: "IDR",
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 0,
//   }).format(amount);
// }

// export function formatDate(date: string | Date): string {
//   const d = new Date(date);
//   return d.toLocaleDateString('id-ID', {
//     day: 'numeric',
//     month: 'long',
//     year: 'numeric'
//   });
// }