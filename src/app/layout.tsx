import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Motion from "@/components/Motion";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: ".Js — Learn JavaScript from Hello World", template: "%s · .Js" },
  description: "A free JavaScript course for complete beginners: 21 short lessons you read, run and check in your browser.",
};

// Runs before paint: restores the saved theme and marks that script is on.
const boot = `try{var t=localStorage.getItem("theme");if(t)document.documentElement.dataset.theme=t}catch(e){}document.documentElement.classList.add("js")`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body className={`${geist.variable} ${geistMono.variable}`}>
        {children}
        <Motion />
      </body>
    </html>
  );
}
