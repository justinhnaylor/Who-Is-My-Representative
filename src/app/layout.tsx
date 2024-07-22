import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GlobalStateContextProvider from "./context/GlobalStateContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Who's My Representative",
  description: "Created by Justin Nayloe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={inter.className}>
        <GlobalStateContextProvider>{children}</GlobalStateContextProvider>
      </body>
    </html>
  );
}
