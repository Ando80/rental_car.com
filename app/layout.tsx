import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import NavBar from "@/components/layout/NavBar";

import Container from "@/components/Container";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ProTender",
  description: "manage the rental of construction equipment",
  icons: { icon: "/icon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <NavBar />
          <Providers>
            <main className="flex flex-col min-h-screen bg-secondary">
              <section className="flex-grow">
                <Container>{children}</Container>
              </section>
            </main>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
