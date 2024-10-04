import React, { useState, useEffect } from 'react';
import { Post } from '../types/Post';

interface RouteParams {
    id: string;
}

const PostPage: React.FC = () => {
    const [post, setPost] = useState<Post | null>(null);
    const id = "your_id_here";

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`http://deine-api-url.com/posts/${id}`);
            const data: Post = await response.json();
            setPost(data);
        };

        fetchPost();
    }, [id]);

    if (!post) return <div>Loading...</div>;

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
        </div>
    );
};

export default PostPage;
