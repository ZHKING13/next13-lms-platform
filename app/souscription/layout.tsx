import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import { cn } from "@/lib/utils";
import Head from "next/head";

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
          <Head>
              <script src="https://www.paiementpro.net/webservice/onlinepayment/js/paiementpro.v1.0.2.js"></script>
          </Head>
          <head>
              <link rel="icon" href="/favicon.png" sizes="any" />
          </head>
          <body className={cn(ubuntu.className, "bg-[#01051e] mx-auto ")}>
              {children}
          </body>
      </html>
  );
}