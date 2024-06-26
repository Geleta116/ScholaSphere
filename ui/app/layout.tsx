import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Pacifico } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "@/components/NavBar/NavBar";


const inter = Inter({ subsets: ["latin"] });
const pacifico = Pacifico({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} h-screen w-screen bg-gradient-to-l from-blue-950 via-gray-950 to-gray-950`}
      >
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
