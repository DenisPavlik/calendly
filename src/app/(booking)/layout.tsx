import "./../globals.css";

export const metadata = {
  title: "Calendly",
  description: "This is a clone of Calendly",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
