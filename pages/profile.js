import { useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Profile() {
  const session = useSession();
  const supabase = useSupabaseClient();

  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

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

  useEffect(() => {
    if (!session) return;
    (async () => {
      const { data } = await supabase
        .from("profiles")
        .select("username, avatar_url")
        .eq("id", session.user.id)
        .single();
      if (data) {
        setUsername(data.username || "");
        setAvatar(data.avatar_url || "");
      }
      setLoading(false);
    })();
  }, [session, supabase]);

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");
    const { error } = await supabase.from("profiles").upsert({
      id: session.user.id,
      username: username.trim(),
      avatar_url: avatar,
    });
    if (error) {
      console.error(error);
      setMessage("Failed to save profile.");
    } else {
      setMessage("Profile updated successfully!");
    }
  };

  if (!session) {
    return (
      <div className="p-8 text-center text-matrixGreen">
        <p>
          Please{" "}
          <a href="/auth/signin" className="underline">
            sign in
          </a>{" "}
          to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 rounded-lg border border-matrixGreen bg-matrixBg bg-opacity-80 text-matrixGreen shadow-md">
      <h1 className="text-3xl font-semibold mb-4">Your Profile</h1>

      <p className="mb-2">
        <strong>Email:</strong> {session.user.email}
      </p>
      <p className="mb-4">
        <strong>User ID:</strong> {session.user.id}
      </p>

      {loading ? (
        <p>Loading profile…</p>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 bg-black border border-matrixGreen rounded text-white"
          />

          <div>
            <p className="mb-2 font-medium">Select an avatar:</p>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-1 justify-center">
              {avatarOptions.map((url) => {
                const isSelected = avatar === url;
                return (
                  <img
                    key={url}
                    src={url}
                    alt="avatar"
                    onClick={() => setAvatar(url)}
                    className={
                      "w-[128px] h-[128px] rounded-full object-cover border-2 " +
                      "transition-transform duration-150 cursor-pointer " +
                      (isSelected
                        ? "border-matrixGreen scale-110 shadow-lg"
                        : "border-transparent hover:scale-105 opacity-90")
                    }
                  />
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-matrixGreen text-black rounded hover:bg-lime-300 transition-colors"
          >
            Save Changes
          </button>

          {message && <p className="mt-2 text-sm italic">{message}</p>}
        </form>
      )}

      <button
        onClick={() => supabase.auth.signOut()}
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Sign Out
      </button>
    </div>
  );
}
