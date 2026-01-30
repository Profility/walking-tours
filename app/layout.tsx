import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/navBar";
import { retrieveData } from "@/lib/supabase";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lakbay Lucban - Tourism Guide",
  description: "Discover the rich culture, heritage, and natural beauty of Lucban, Quezon. Your guide to exploring the Pahiyas Festival, local destinations, delicacies, and more.",
  keywords: ["Lucban", "Quezon", "tourism", "Philippines", "Pahiyas Festival"],
  authors: [{ name: "Lakbay Lucban" }],
  icons: {
    icon: "/logo.ico",
  },
  openGraph: {
    title: "Lakbay Lucban - Tourism Guide",
    description: "Discover the rich culture, heritage, and natural beauty of Lucban, Quezon.",
    type: "website",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const destinations = (await retrieveData("destinations")) ?? [];
  const food = (await retrieveData("food")) ?? [];

  const items = [
    ...destinations.map((d) => ({
      name: d.name,
      path: `/destinations/${d.slug}`,
    })),
    ...food.map((f) => ({
      name: f.name,
      path: `/food#${f.slug}`,
    })),
  ];

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Navbar items={items} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
