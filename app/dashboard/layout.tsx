import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Lakbay Lucban",
  description: "Manage your destinations and content on the Lakbay Lucban dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
