import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export default function SignUp() {
  const supabase = useSupabaseClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [error, setError] = useState("");

  const avatarOptions = [
    "https://dpztmowfziutatnlhvcu.supabase.co/storage/v1/object/sign/profile-avatars/matrix_diverse_set1_avatar_1.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83MmQzOThhNi1jNDRhLTRkYWYtYTE3OS02NzEyOTJhODE3ODciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9maWxlLWF2YXRhcnMvbWF0cml4X2RpdmVyc2Vfc2V0MV9hdmF0YXJfMS5wbmciLCJpYXQiOjE3NTA2NjQ0MzUsImV4cCI6MTc4MjIwMDQzNX0.VP18hXaTdlWcKN_wzQwto4BB1euhA39HDOQyHjQaNBg",
    "https://dpztmowfziutatnlhvcu.supabase.co/storage/v1/object/sign/profile-avatars/matrix_diverse_set1_avatar_2.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83MmQzOThhNi1jNDRhLTRkYWYtYTE3OS02NzEyOTJhODE3ODciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9maWxlLWF2YXRhcnMvbWF0cml4X2RpdmVyc2Vfc2V0MV9hdmF0YXJfMi5wbmciLCJpYXQiOjE3NTA2NjQ0NTgsImV4cCI6MTc4MjIwMDQ1OH0.JeCAEl-azqNWame9hxWli2sPN1iz9yMBekb2h4h-SWY",
    "https://dpztmowfziutatnlhvcu.supabase.co/storage/v1/object/sign/profile-avatars/matrix_diverse_set1_avatar_3.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83MmQzOThhNi1jNDRhLTRkYWYtYTE3OS02NzEyOTJhODE3ODciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9maWxlLWF2YXRhcnMvbWF0cml4X2RpdmVyc2Vfc2V0MV9hdmF0YXJfMy5wbmciLCJpYXQiOjE3NTA2NjQ0NzYsImV4cCI6MTc4MjIwMDQ3Nn0.ZpYjLo-4__qvez9YgVbgCOfzpaPb0WkvlU1oWI2q5z8",
    "https://dpztmowfziutatnlhvcu.supabase.co/storage/v1/object/sign/profile-avatars/matrix_diverse_set1_avatar_4.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83MmQzOThhNi1jNDRhLTRkYWYtYTE3OS02NzEyOTJhODE3ODciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9maWxlLWF2YXRhcnMvbWF0cml4X2RpdmVyc2Vfc2V0MV9hdmF0YXJfNC5wbmciLCJpYXQiOjE3NTA2NjQ0OTQsImV4cCI6MTc4MjIwMDQ5NH0.RzKQP6Dnv22_eskZV8X--iuwbD5wl3_7oiUScB0Zlls",
    "https://dpztmowfziutatnlhvcu.supabase.co/storage/v1/object/sign/profile-avatars/matrix_set1_avatar_1.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83MmQzOThhNi1jNDRhLTRkYWYtYTE3OS02NzEyOTJhODE3ODciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9maWxlLWF2YXRhcnMvbWF0cml4X3NldDFfYXZhdGFyXzEucG5nIiwiaWF0IjoxNzUwNjY0NTE2LCJleHAiOjE3ODIyMDA1MTZ9.gOOEWkHvxC0jANaFpx3dvDIHLyKkD6Gx8DA-f0egRWk",
    "https://dpztmowfziutatnlhvcu.supabase.co/storage/v1/object/sign/profile-avatars/matrix_set1_avatar_2.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83MmQzOThhNi1jNDRhLTRkYWYtYTE3OS02NzEyOTJhODE3ODciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9maWxlLWF2YXRhcnMvbWF0cml4X3NldDFfYXZhdGFyXzIucG5nIiwiaWF0IjoxNzUwNjY0NTM3LCJleHAiOjE3ODIyMDA1Mzd9.l7xjI1aR1huG2MQLHpkCx4h-zrOLBw6htCOrzlLWhKc",
    "https://dpztmowfziutatnlhvcu.supabase.co/storage/v1/object/sign/profile-avatars/matrix_set2_avatar_1.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83MmQzOThhNi1jNDRhLTRkYWYtYTE3OS02NzEyOTJhODE3ODciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9maWxlLWF2YXRhcnMvbWF0cml4X3NldDJfYXZhdGFyXzEucG5nIiwiaWF0IjoxNzUwNjY0NTY0LCJleHAiOjE3ODIyMDA1NjR9.Kt8YzntVreAuxP6b7FNHW0ovFu6XrDEvF3FOPOVSZhY",
    "https://dpztmowfziutatnlhvcu.supabase.co/storage/v1/object/sign/profile-avatars/matrix_set2_avatar_3.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83MmQzOThhNi1jNDRhLTRkYWYtYTE3OS02NzEyOTJhODE3ODciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9maWxlLWF2YXRhcnMvbWF0cml4X3NldDJfYXZhdGFyXzMucG5nIiwiaWF0IjoxNzUwNjY0NTkwLCJleHAiOjE3ODIyMDA1OTB9.usFnnhMLatWn0Cad_XWkXzWAEX7yaPY-wywkwfmZE1E",
  ];

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    const user = data.user;

    if (user) {
      // Insert into profiles table
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: user.id,
          username,
          avatar_url: selectedAvatar,
        },
      ]);

      if (profileError) {
        console.error("Error inserting profile:", profileError);
        setError(profileError.message);
        return;
      }

      alert("Sign-up successful! Please check your email to verify.");
      router.push("/signin");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 text-matrixGreen">
      <h1 className="text-2xl mb-4">Sign Up</h1>
      <form onSubmit={handleSignUp} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 bg-black border border-matrixGreen"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 bg-black border border-matrixGreen"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 bg-black border border-matrixGreen"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div>
          <p className="mb-2">Choose an avatar:</p>
          <div className="grid grid-cols-3 gap-2">
            {avatarOptions.map((url) => (
              <img
                key={url}
                src={url}
                alt="avatar"
                className={`w-16 h-16 rounded-full border-4 cursor-pointer ${
                  selectedAvatar === url
                    ? "border-matrixGreen"
                    : "border-transparent"
                }`}
                onClick={() => setSelectedAvatar(url)}
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-matrixGreen text-black py-2 rounded"
        >
          Sign Up
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
}
