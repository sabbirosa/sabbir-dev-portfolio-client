"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";
import Header from "./Header";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Don't show header/footer on admin pages
  const isAdminPage = pathname?.startsWith("/admin");

  if (isAdminPage) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="px-2 md:px-0">
        <Header />
      </div>
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
