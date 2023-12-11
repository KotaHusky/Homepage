import Script from 'next/script'
import './global.css';

export const metadata = {
  title: 'Kota Husky',
  description: 'Event and portrait photographer | Convention and community event organizer | Founder of Barks & Rec',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="stylesheet" href="https://use.typekit.net/vxp7yul.css" />
      <Script id="fontawesome" src="https://kit.fontawesome.com/cea9781086.js" crossOrigin="anonymous" strategy="afterInteractive" />
      <Script id="gtag-manager" src="https://www.googletagmanager.com/gtag/js?id=G-S7KWG10TS2" strategy="afterInteractive" />
      <Script id="gtag-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-S7KWG10TS2');
        `}
      </Script>
      <body>{children}</body>
    </html>
  );
}
