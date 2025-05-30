import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/providers/ThemeProvider";
import "./globals.css";
import { Header } from "@/components/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CriptoBoard - Dashboard de Criptomoedas",
  description: "Monitore suas criptomoedas favoritas em tempo real",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased bg-background text-foreground`}>
        <ThemeProvider>
          <Header />
          <main className="pt-20">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
