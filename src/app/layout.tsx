import "@/styles/globals.css";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "DEVSOC'24 | Admin",
  description: "Judgement time!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "DEVSOC'24 | Admin",
    type: "website",
    image: "/thumbnail.png",
    url: "",
    site_name: "DEVSOC'24 | Admin",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>{children}</body>
    </html>
  );
}
