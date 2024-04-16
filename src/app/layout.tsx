import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Link from "next/link"


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokedex",
  description: "Pokedex built with NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
        >
          <main className="flex min-h-screen flex-col items-center p-24">
            <div className="">
              <Link href="/"><h1 className="text-3xl font-bold mb-4 text-center">Pokédex</h1></Link>
            </div>
            {/* <h1 className="text-3xl font-bold mb-4 text-center">Pokédex</h1> */}

            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
