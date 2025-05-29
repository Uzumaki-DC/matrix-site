import { useState } from "react";

import dynamic from "next/dynamic";

import Hello from "../components/Hello";

import Head from "next/head";

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

      <nav aria-label="Main navigation">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/features">Features</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
        </ul>
      </nav>

      <CodeRain active={rainActive} />
      <Hello />

      <button
        onClick={() => setRainActive(!rainActive)}
        style={{
          position: "fixed",
          top: "1rem",
          right: "1rem",
          padding: "0.5rem 1rem",
          background: "#000",
          color: "#0F0",
          border: "1px solid #0F0",
          cursor: "pointer",
        }}
      >
        {rainActive ? "Stop Rain" : "Start Rain"}
      </button>

      <main>
        <section aria-labelledby="intro">
          <h2 id="intro">Introduction</h2>
          <p>Welcome to the Matrix-themed site prototype.</p>
        </section>

        <article aria-labelledby="news">
          <h2 id="news">Latest News</h2>
          <p>Placeholder for dynamic content.</p>
        </article>

        <aside aria-labelledby="sidebar">
          <h2 id="sidebar">Sidebar</h2>
          <p>Additional links or info.</p>
        </aside>
      </main>

      <footer>
        <p>© 2025 Matrix Site</p>
      </footer>
    </>
  );
}
