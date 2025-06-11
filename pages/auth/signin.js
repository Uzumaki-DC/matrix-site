// pages/auth/signin.js
import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert(error.message);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 text-matrixGreen">
      <h1 className="text-2xl mb-4">Sign In</h1>
      <form onSubmit={handleSignin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 bg-matrixBg border border-matrixGreen rounded"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 bg-matrixBg border border-matrixGreen rounded"
        />
        <button
          type="submit"
          className="w-full py-2 bg-matrixGreen text-matrixBg rounded"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
