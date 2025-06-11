// pages/index.js
import Head from "next/head";
import { useState } from "react";
import dynamic from "next/dynamic";
import Hello from "../components/Hello";

// Only render CodeRain on the client
const CodeRain = dynamic(() => import("../components/CodeRain"), {
  ssr: false,
});

export default function Home() {
  const [rainActive, setRainActive] = useState(true);

  return (
    <>
      <Head>
        <title>Matrix Site Prototype</title>
        <meta name="description" content="A Matrix-themed site demo" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Matrix Rain Effect */}
      <CodeRain active={rainActive} />

      {/* Greeting Box */}
      <Hello />

      {/* Toggle Rain Button */}
      <button onClick={() => setRainActive(!rainActive)} className="toggle-btn">
        {rainActive ? "Stop Rain" : "Start Rain"}
      </button>

      {/* Main Content Grid */}
      <main>
        <section aria-labelledby="intro" className="card">
          <h2 id="intro">Introduction</h2>
          <p>Welcome to the Matrix-themed site prototype.</p>
        </section>

        <article aria-labelledby="news" className="card">
          <h2 id="news">Latest News</h2>
          <p>Placeholder for dynamic content.</p>
        </article>

        <aside aria-labelledby="sidebar" className="card">
          <h2 id="sidebar">Sidebar</h2>
          <p>Additional links or info.</p>
        </aside>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Matrix Site</p>
      </footer>
    </>
  );
}
