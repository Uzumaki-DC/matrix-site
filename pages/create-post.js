// pages/create-post.js
import { useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function CreatePost() {
  const session = useSession();
  const supabase = useSupabaseClient();

  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !description) {
      alert("Please add a description and a file");
      return;
    }

    setUploading(true);

    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `user_${session.user.id}/${fileName}`;

    console.log("Uploading as user:", session.user.id);
    console.log("File:", file);
    console.log("Path:", filePath);

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("posts") // must match your Supabase bucket name
      .upload(filePath, file);

    if (uploadError) {
      console.error(uploadError);
      alert("Upload failed");
      setUploading(false);
      return;
    }

    // Get public URL for uploaded file
    const { data: publicUrlData } = supabase.storage
      .from("posts")
      .getPublicUrl(filePath);

    const publicUrl = publicUrlData.publicUrl;

    // Insert post into database
    const { error: dbError } = await supabase.from("glitch_posts").insert([
      {
        user_id: session.user.id,
        description,
        media_url: publicUrl,
      },
    ]);

    if (dbError) {
      console.error(dbError);
      alert("Post failed (database error)");
    } else {
      alert("Post created!");
      setDescription("");
      setFile(null);
    }

    setUploading(false);
  };

  if (!session) {
    return (
      <div className="p-8 text-center text-matrixGreen">
        <p>Please sign in to create a post.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-8 text-matrixGreen">
      <h1 className="text-2xl mb-4">Share a Glitch in the Matrix</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          placeholder="Describe your experience..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full p-2 bg-matrixBg border border-matrixGreen rounded"
        ></textarea>
        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full text-matrixGreen"
        />
        <button
          type="submit"
          disabled={uploading}
          className="w-full py-2 bg-matrixGreen text-matrixBg rounded"
        >
          {uploading ? "Uploading..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}
