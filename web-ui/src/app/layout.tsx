import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeRegistry from "./_theme/ThemeRegistry";
import { NextAuthProvider } from "./_services/auth/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Calories calc",
  description: "Calories calc application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body className={inter.className}>
        <NextAuthProvider>
          <ThemeRegistry options={{ key: "mui" }}>{children}</ThemeRegistry>
        </NextAuthProvider>
      </body>
    </html>
  );
}
