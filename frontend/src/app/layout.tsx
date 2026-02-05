
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "LogHero",
  description: "A simple log management tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
              <div className="mr-4 hidden md:flex">
                <a className="mr-6 flex items-center space-x-2" href="/">
                  <span className="hidden font-bold sm:inline-block">LogHero</span>
                </a>
              </div>
              <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                <ModeToggle />
              </div>
            </div>
          </header>
          <main className="flex-1 p-8">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}

