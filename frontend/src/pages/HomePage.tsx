import React, { useState, useEffect } from 'react';
import PostCard from '../components/posts/PostCard';
import { Post } from '../types/Post';
import { fetchPosts } from '../services/api';

const HomePage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getPosts = async () => {
            try {
                const data = await fetchPosts();
                setPosts(data);
                setError(null); // Clear previous errors if any
            } catch (err) {
                setError('Failed to fetch posts');
                console.error(err);
            }
        };

        getPosts();
    }, []);

    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Blog Plattform</h1>
            {posts.length > 0 ? (
                <div>
                    {posts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            ) : (
                <div>No posts available.</div>
            )}
        </div>
    );
};

export default HomePage;
