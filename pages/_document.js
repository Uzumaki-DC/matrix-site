// pages/_document.js
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head /> {/* you can put global links here */}
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
