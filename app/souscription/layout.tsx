import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import { cn } from "@/lib/utils";

const ubuntu = Ubuntu({
  subsets: [
    "cyrillic",
    "cyrillic-ext",
    "greek",
    "greek-ext",
    "latin",
    "latin-ext",
  ],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Inscription cobalt",
  description:
    "Rejoind Cobalt invest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
      </head>
      <body className={cn(ubuntu.className, "bg-c-neutral-magnolia")}>
        {children}
      </body>
    </html>
  );
}