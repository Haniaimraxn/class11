'use client';

import { useEffect, useState } from 'react';

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function FetchPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/external');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className=" loading-container flex items-center justify-center min-h-screen">
        <p className="text-3xl text-black animate-pulse font-serif">Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6 font-serif">Posts</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <li key={post.id} className="bg-green-950 shadow-md rounded-lg p-4 border animate-pulse">
            <h2 className="text-xl font-serif mb-2 text-orange-400">{post.title}</h2>
            <p className="text-white font-serif">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
 
