import type { Metadata } from "next";
import Link from "next/link";
import { ClerkProvider, Show, UserButton } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "Two Pixels Short | AI Software Studio",
  description: "AI-assisted software studio building internal tools, prototypes, automation, and full-stack web apps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full bg-zinc-950 text-zinc-100">
        <ClerkProvider>
          <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/85 backdrop-blur">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
              <Link href="/" className="flex items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/2ps logo.png"
                  alt="Two Pixels Short"
                  className="h-9 w-auto sm:h-10"
                />
              </Link>
              <div className="flex items-center gap-4 text-sm text-zinc-300">
                <Link href="/projects" className="hover:text-white">Work</Link>
                <Link href="/about" className="hover:text-white">About</Link>
                <Link href="/contact" className="hover:text-white">Contact</Link>
                <Show when="signed-in">
                  <Link href="/admin" className="hover:text-white">Admin</Link>
                  <UserButton />
                </Show>
              </div>
            </nav>
          </header>
          <main>{children}</main>
          <footer className="border-t border-white/10">
            <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-zinc-500">
              Two Pixels Short builds practical AI-powered software, internal tools, and prototypes.
            </div>
          </footer>
        </ClerkProvider>
      </body>
    </html>
  );
}
