import "@/styles/globals.css";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>DEVSOC&apos;24 | Admin</title>
        <meta title="DEVSOC'24 | Admin"></meta>
        <meta name="description" content={"Judgement time!"} />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon.ico"
        ></link>

        {/* Open Graph tags */}
        <meta property="og:title" content={"DEVSOC'24 | Admin"} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={"/thumbnail.png"} />
        <meta property="og:url" content={""} />
        <meta property="og:site_name" content={"DEVSOC'24 | Admin"} />
      </head>
      <body className={`font-sans ${inter.variable}`}>{children}</body>
    </html>
  );
}
