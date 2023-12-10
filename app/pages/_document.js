import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link async rel="stylesheet" href="https://use.typekit.net/vxp7yul.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <Script src="https://kit.fontawesome.com/cea9781086.js" crossorigin="anonymous" strategy="afterInteractive" />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-S7KWG10TS2" strategy="afterInteractive" />
        <Script id="gtag-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-S7KWG10TS2');
          `}
        </Script>
      </body>
    </Html>
  )
}
