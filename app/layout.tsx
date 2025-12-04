import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import ProvidersRoot from "@/components/ProvidersRoot";
import ThemeProviderClient from "@/components/ThemeProviderClient";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "LumenUI",
  description:
    "A modern component library for building Modern Web Apps developed with Next.js, Shadcn Components, Tailwind CSS and Framer Motion.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} antialiased`} suppressHydrationWarning>
        <ThemeProviderClient>
          <ProvidersRoot>{children}</ProvidersRoot>
        </ThemeProviderClient>
      </body>
    </html>
  );
}
