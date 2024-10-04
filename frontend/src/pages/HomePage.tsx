import React, { useState, useEffect } from 'react';
import PostCard from '../components/posts/PostCard';
import { Post } from '../types/Post';
import { fetchPosts } from '../services/api';

const HomePage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const getPosts = async () => {
            const data = await fetchPosts();
            setPosts(data);
        };

        getPosts();
    }, []);

    return (
        <div>
            <h1>Blog Plattform</h1>
            <div>
                {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default HomePage;