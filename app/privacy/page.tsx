import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Privacy Policy", robots: { index: false } };

export default function Page() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-5 py-28 sm:px-8">
      <Link href="/" className="eyebrow">← Back to home</Link>
      <h1 className="mt-8 text-5xl">Privacy Policy</h1>
      <p className="mt-8 border border-gold/50 p-5 text-muted">
        <strong className="text-ivory">Draft placeholder.</strong> The Privacy Policy for Kalpavriksha Private Limited has not yet been supplied or reviewed by legal counsel. This page reserves the route; replace this notice with the approved text before launch.
      </p>
    </main>
  );
}
