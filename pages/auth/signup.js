// pages/auth/signup.js
import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      alert(error.message);
    } else {
      alert("Check your email for a confirmation link.");
      router.push("/auth/signin");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 text-matrixGreen">
      <h1 className="text-2xl mb-4">Sign Up</h1>
      <form onSubmit={handleSignup} className="space-y-4">
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
          Sign Up
        </button>
      </form>
    </div>
  );
}
