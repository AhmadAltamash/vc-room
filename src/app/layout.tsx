import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster"
import "@stream-io/video-react-sdk/dist/css/styles.css";
import 'react-datepicker/dist/react-datepicker.css'

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
  title: "VC-Room",
  description: "A Video Conference Web Based Application",
  keywords: "Video Conference, Web Based Application",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/icons/logo.svg" sizes="any" />
      <ClerkProvider
      appearance={{
        layout:{
          logoImageUrl: '/icons/logo.svg'
        },
        variables:{
          colorText: '#fff',
          colorPrimary: '#0E78F9',
          colorBackground: '#1C1F2E',
          colorInputBackground:'#252A41',
          colorInputText: '#FFF',
        },
      }}
    >
      <body className={`${geistSans.variable} bg-dark-2 ${geistMono.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
      </ClerkProvider>
    </html>
  );
}
