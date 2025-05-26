// pages/index.js
export default function Home() {
  return (
    <>
      <header>
        <h1>Matrix Site</h1>
      </header>

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
