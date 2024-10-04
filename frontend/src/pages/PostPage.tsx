import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Post } from '../types/Post';

const PostPage: React.FC = () => {
    const [post, setPost] = useState<Post | null>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`http://localhost:8080/api/posts/${id}`);
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