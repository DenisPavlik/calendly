import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./../globals.css";
import Header from "../components/Header";
import { Toaster } from "react-hot-toast";

const noto = Noto_Sans({ subsets: ["latin"], weight: ["300", "400", "700"] });

export const metadata: Metadata = {
  title: "Calendly",
  description: "This is a clone of Calendly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={noto.className}>
        <main className="container">
          <Toaster />
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
