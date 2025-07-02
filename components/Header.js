// components/Header.js
import Link from "next/link";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Header() {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <header className="nav">
      <nav aria-label="Main navigation">
        <ul>
          <li>
            <Link href="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link href="/features" className="nav-link">
              Features
            </Link>
          </li>
          <li>
            <Link href="/about" className="nav-link">
              About
            </Link>
          </li>
          {session && (
            <li>
              <Link href="/create-post" className="nav-link">
                Create Post
              </Link>
              <Link href="/feed">Feed</Link>
              <Link href="/profile">Profile</Link>
            </li>
          )}
        </ul>
      </nav>

      {!session ? (
        <div style={{ display: "flex", gap: "1rem" }}>
          <Link href="/auth/signin" className="nav-link">
            Sign In
          </Link>
          <Link href="/auth/signup" className="nav-link">
            Sign Up
          </Link>
        </div>
      ) : (
        <div className="top-right-auth">
          <button onClick={() => supabase.auth.signOut()} className="auth-btn">
            Hello, {session.user.email} (Sign Out)
          </button>
        </div>
      )}
    </header>
  );
}
