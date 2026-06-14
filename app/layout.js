import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const roboto = localFont({
  src: [
    {
      path: "../public/fonts/Roboto-Light.ttf",
      weight: "300",
      style: "normal",
    },
    // asdjksl
    {
      path: "../public/fonts/Roboto-VariableFont_wdth,wght.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../public/fonts/Roboto-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Roboto-Italic-VariableFont_wdth,wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-roboto",
});

const shareTech = localFont({
  src: "../public/fonts/ShareTech-Regular.ttf",
  weight: "400",
  style: "normal",
  variable: "--font-share-tech",
});

export const metadata = {
  title: "DevAgile - Scale , Build , Grow",
  description: "Created by Adarsh Tiwari",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${roboto.variable} ${shareTech.variable}`}>
        {children}
      </body>
    </html>
  );
}
