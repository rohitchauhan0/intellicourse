import localFont from "next/font/local";
import "./globals.css";
import {Outfit} from "next/font/google"
import NextAuthProvider from "./_components/Nextauth";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const outfit = Outfit({ subsets: ["latin"] })
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={outfit.className}
      >
        <NextAuthProvider>

        {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
