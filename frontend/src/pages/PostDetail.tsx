import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Post } from '../types/Post';
import { fetchPostById } from '../services/api';

const PostDetailPage: React.FC = () => {
    const [post, setPost] = useState<Post | null>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const loadPost = async () => {
            try {
                const fetchedPost = await fetchPostById(Number(id));
                setPost(fetchedPost);
            } catch (error) {
                console.error('Failed to fetch post', error);
            }
        };

        loadPost();
    }, [id]);

    if (!post) return <div>Loading...</div>;

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
        </div>
    );
};

export default PostDetailPage;
