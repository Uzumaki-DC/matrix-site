import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Profile() {
  const session = useSession();
  const supabase = useSupabaseClient();

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
    <div className="max-w-md mx-auto p-8 bg-matrixBg bg-opacity-75 border border-matrixGreen rounded-lg mt-8 text-matrixGreen">
      <h1 className="text-2xl mb-4">Your Profile</h1>
      <p>
        <strong>Email:</strong> {session.user.email}
      </p>
      <p>
        <strong>User ID:</strong> {session.user.id}
      </p>
      <button
        onClick={() => supabase.auth.signOut()}
        className="mt-6 px-4 py-2 bg-matrixGreen text-matrixBg rounded"
      >
        Sign Out
      </button>
    </div>
  );
}
