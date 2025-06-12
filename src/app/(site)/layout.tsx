import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./../globals.css";
import Header from "../components/Header";
import { Toaster } from "react-hot-toast";
// import { session } from "@/libs/session";
import { getSessionEmailFromCookies } from "@/libs/getSessionEmail";

const noto = Noto_Sans({ subsets: ["latin"], weight: ["300", "400", "700"] });

export const metadata: Metadata = {
  title: "Calendly",
  description: "This is a clone of Calendly",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const email = await getSessionEmailFromCookies()
  return (
    <html lang="en">
      <body className={noto.className}>
        <main className="container">
          <Toaster />
          <Header email={email} />
          {children}
        </main>
      </body>
    </html>
  );
}
