import "./globals.css";
import SmoothScroller from "@/components/SmoothScroller";
import { Major_Mono_Display, Exo_2 } from "next/font/google";

// Self-hosted via next/font — no @import needed, zero layout shift
const majorMono = Major_Mono_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-major-mono",
  display: "swap",
});

const exo2 = Exo_2({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-exo2",
  display: "swap",
});

export const metadata = {
  title: "Project01",
  description: "my gsap project",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${majorMono.variable} ${exo2.variable}`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroller>
          {children}
        </SmoothScroller>
      </body>
    </html>
  );
}


