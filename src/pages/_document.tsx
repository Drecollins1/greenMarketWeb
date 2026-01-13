import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      {/* Favicon */}
      <link rel="icon" href="/assets/logo.svg" />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
