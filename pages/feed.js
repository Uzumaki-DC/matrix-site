// pages/feed.js
import { useEffect, useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

export default function Feed() {
  const supabase = useSupabaseClient();
  const user = useUser();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentTexts, setCommentTexts] = useState({});
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");

  // fetched once and on demand
  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("glitch_posts")
      .select(
        `
        *,
        profiles ( username, avatar_url ),
        post_likes ( user_id ),
        comments (
          id,
          content,
          created_at,
          user_id,
          profiles ( username, avatar_url )
        )
      `
      )
      .order("created_at", { ascending: false });

    if (error) console.error(error);
    else setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    // initial load
    fetchPosts();

    // create one channel to watch all three tables
    const channel = supabase
      .channel("realtime-feed")
      // glitch_posts events
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "glitch_posts" },
        () => fetchPosts()
      )
      // post_likes events
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "post_likes" },
        () => fetchPosts()
      )
      // comments events
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "comments" },
        () => fetchPosts()
      )
      .subscribe();

    // cleanup on unmount
    return () => {
      channel.unsubscribe();
    };
  }, [supabase]);

  // like / unlike
  const toggleLike = async (postId, hasLiked) => {
    if (!user) return;
    if (hasLiked) {
      await supabase
        .from("post_likes")
        .delete()
        .match({ post_id: postId, user_id: user.id });
    } else {
      await supabase
        .from("post_likes")
        .insert([{ post_id: postId, user_id: user.id }]);
    }
  };

  // add new comment
  const addComment = async (postId) => {
    const content = (commentTexts[postId] || "").trim();
    if (!user || !content) return;
    await supabase
      .from("comments")
      .insert([{ post_id: postId, user_id: user.id, content }]);
    setCommentTexts((p) => ({ ...p, [postId]: "" }));
  };

  // edit / delete comment
  const startEdit = (id, text) => {
    setEditingCommentId(id);
    setEditText(text);
  };
  const cancelEdit = () => {
    setEditingCommentId(null);
    setEditText("");
  };
  const saveEdit = async (id) => {
    const content = editText.trim();
    if (!content) return;
    await supabase.from("comments").update({ content }).match({ id });
    cancelEdit();
  };
  const deleteComment = async (id) => {
    if (!confirm("Delete this comment?")) return;
    await supabase.from("comments").delete().match({ id });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-matrixGreen">
      <h1 className="text-3xl mb-6 font-bold">🕳️ Glitch Feed</h1>

      {loading && <p>Loading…</p>}
      {!loading && posts.length === 0 && (
        <p>No glitches have been posted yet.</p>
      )}

      {posts.map((post) => {
        const likes = post.post_likes || [];
        const hasLiked = user && likes.some((l) => l.user_id === user.id);
        const comments = post.comments || [];

        return (
          <div
            key={post.id}
            className="mb-8 border border-matrixGreen rounded p-4 bg-black bg-opacity-50"
          >
            {/* Avatar + Username */}
            <div className="flex items-center mb-4">
              {post.profiles?.avatar_url ? (
                <img
                  src={post.profiles.avatar_url}
                  alt={post.profiles.username}
                  className="w-[128px] h-[128px] rounded-full object-cover border-2 border-matrixGreen mr-3"
                />
              ) : (
                <div className="w-[128px] h-[128px] rounded-full bg-matrixGreen mr-3" />
              )}
              <span className="font-medium">
                {post.profiles?.username || "Anonymous"}
              </span>
            </div>

            {/* Media */}
            {post.media_url?.match(/\.(mp4|webm)$/i) ? (
              <video
                src={post.media_url}
                controls
                className="w-full mb-4 rounded"
              />
            ) : (
              <img
                src={post.media_url}
                alt="glitch"
                className="w-[400px] h-[300px] mb-4 rounded object-cover"
              />
            )}

            {/* Description */}
            <p className="mb-4">{post.description}</p>

            {/* Like */}
            <button
              onClick={() => toggleLike(post.id, hasLiked)}
              className="inline-flex items-center space-x-2 mb-4 hover:opacity-75"
            >
              <span className="text-xl">{hasLiked ? "❤️" : "🤍"}</span>
              <span>{likes.length}</span>
            </button>

            {/* Comments */}
            <div className="mb-4 space-y-3">
              {comments.map((c) => {
                const own = user && c.user_id === user.id;
                return (
                  <div key={c.id} className="flex items-start space-x-2">
                    {c.profiles?.avatar_url ? (
                      <img
                        src={c.profiles.avatar_url}
                        alt={c.profiles.username}
                        className="w-6 h-6 rounded-full object-cover border border-matrixGreen"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-matrixGreen" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm">
                        <strong>{c.profiles?.username || "Anon"}</strong>{" "}
                        {c.content}
                      </p>
                      <p className="text-xs text-matrixGreen/50">
                        {new Date(c.created_at).toLocaleString()}
                      </p>

                      {/* edit/delete */}
                      {own && editingCommentId !== c.id && (
                        <div className="mt-1 flex space-x-2">
                          <button
                            onClick={() => startEdit(c.id, c.content)}
                            className="text-sm underline hover:text-white"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteComment(c.id)}
                            className="text-sm underline hover:text-red-500"
                          >
                            Delete
                          </button>
                        </div>
                      )}

                      {/* inline edit */}
                      {own && editingCommentId === c.id && (
                        <div className="mt-2 flex space-x-2">
                          <input
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="flex-1 px-3 py-1 bg-black bg-opacity-60 border-2 border-matrixGreen text-matrixGreen rounded focus:outline-none focus:ring-2 focus:ring-matrixGreen"
                          />
                          <button
                            onClick={() => saveEdit(c.id)}
                            className="px-3 py-1 bg-matrixGreen text-black rounded hover:bg-lime-300"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* New Comment */}
            {user && (
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Add comment…"
                  value={commentTexts[post.id] || ""}
                  onChange={(e) =>
                    setCommentTexts((p) => ({
                      ...p,
                      [post.id]: e.target.value,
                    }))
                  }
                  className="flex-1 px-4 py-2 bg-black bg-opacity-60 border-2 border-matrixGreen text-matrixGreen rounded focus:outline-none focus:ring-2 focus:ring-matrixGreen"
                />
                <button
                  onClick={() => addComment(post.id)}
                  className="px-4 py-2 bg-matrixGreen text-black uppercase tracking-wider rounded shadow hover:shadow-lg"
                >
                  Post
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
