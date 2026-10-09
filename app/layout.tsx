import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fraunces/full.css";
import "@fontsource-variable/inter";
import "./globals.css";
import { MotionProvider } from "@/components/MotionProvider";
import { company, siteUrl } from "@/lib/site";

const title = `${company.name} — ${company.headline}`;

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl), alternates: { canonical: "/" } } : {}),
  title: { default: title, template: `%s | ${company.shortName}` },
  description: company.description,
  openGraph: {
    type: "website",
    siteName: company.name,
    title,
    description: company.description,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title, description: company.description },
};

export const viewport: Viewport = {
  themeColor: "#071A14",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Without JS, scroll-reveal content must still be readable. */}
        <noscript>
          <style>{`[style*="opacity: 0"],[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
