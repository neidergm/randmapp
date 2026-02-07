import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import MainHeader from "@/components/MainHeader/MainHeader";
import MainFooter from "@/components/MainFooter/MainFooter";

import "@/styles/globals.scss";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rick and Morty App",
  description: "A simple app to explore characters from the Rick and Morty TV show.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.variable}>
        <main>
          <MainHeader />
          <div>
            {children}
          </div>
          <MainFooter />
        </main>
      </body>
    </html>
  );
}
