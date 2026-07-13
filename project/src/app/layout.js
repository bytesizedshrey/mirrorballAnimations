import "./globals.css";
import SmoothScroller from "@/components/SmoothScroller";

export const metadata = {
  title: "Project01",
  description: "my gsap project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <SmoothScroller>
          {children}
        </SmoothScroller>
      </body>
    </html>
  );
}

