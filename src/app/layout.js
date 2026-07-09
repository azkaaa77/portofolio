import { Plus_Jakarta_Sans, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Muhamad Azka Firmansyah - Systems Information & Creative Developer",
  description:
    "Portfolio of Muhamad Azka Firmansyah - Full-Stack Developer & Cybersecurity-minded engineer crafting high-performance web applications.",
  keywords: [
    "Muhamad Azka Firmansyah",
    "Full-Stack Developer",
    "Cybersecurity",
    "React",
    "Laravel",
    "Next.js",
    "Systems Information",
  ],
  authors: [{ name: "Muhamad Azka Firmansyah" }],
  openGraph: {
    title: "Muhamad Azka Firmansyah - Creative Developer",
    description:
      "Crafting high-performance full-stack web applications with a cybersecurity mindset.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`dark ${plusJakartaSans.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-zinc-950 text-zinc-50 antialiased overflow-x-hidden">
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
