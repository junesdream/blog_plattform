import React, { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import { Post } from '../types/Post';

const HomePage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('http://deine-api-url.com/posts');
            const data: Post[] = await response.json();
            setPosts(data);
        };

        fetchPosts();
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
