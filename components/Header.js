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
        </ul>
      </nav>
      <div>
        {!session ? (
          <Link href="/auth/signin" className="nav-link">
            Sign In
          </Link>
        ) : (
          <button
            onClick={() => supabase.auth.signOut()}
            className="toggle-btn"
          >
            Hello, {session.user.email} (Sign Out)
          </button>
        )}
      </div>
    </header>
  );
}
