import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

// commented for react calendar
// import 'primereact/resources/themes/lara-light-blue/theme.css';  // Choose your theme
// import 'primereact/resources/primereact.min.css';  
// import 'primeicons/primeicons.css';  
// import 'primeflex/primeflex.css';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SMS",
  description: "Next.js School Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    </ClerkProvider>
  );
}
