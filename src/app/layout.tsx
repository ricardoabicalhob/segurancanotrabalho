import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SystemProvider } from "@/lib/context/SystemContext";
import { DataProvider } from "@/lib/datacontext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Relatório de Inspeção de Segurança do Trabalho",
  description: "Gerado e Criado por Ricardo Bicalho",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <DataProvider>
          <SystemProvider>
            {children}
          </SystemProvider>
        </DataProvider>
      </body>
    </html>
  );
}
