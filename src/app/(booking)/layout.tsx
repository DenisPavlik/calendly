import { Toaster } from "react-hot-toast";
import "./../globals.css";
import { Noto_Sans } from "next/font/google";

export const metadata = {
  title: "Calendly",
  description: "This is a clone of Calendly",
};

const noto = Noto_Sans({ subsets: ["latin"], weight: ["300", "400", "600", "700"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={noto.className}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
