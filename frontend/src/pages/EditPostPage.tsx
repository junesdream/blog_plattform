import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Post } from '../types/Post';
import { fetchPostById, savePost } from '../services/api';
import PostForm from '../components/posts/PostForm';

const EditPostPage: React.FC = () => {
    const [post, setPost] = useState<Post | null>(null);
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            if (id) {
                const data = await fetchPostById(Number(id));
                setPost(data);
            }
        };

        fetchPost();
    }, [id]);

    const handleSubmit = async (post: Post) => {
        await savePost(post);
        navigate('/');
    };

    if (!post) return <div>Loading...</div>;

    return (
        <div>
            <h1>{id ? 'Edit Post' : 'Create Post'}</h1>
            <PostForm initialPost={post} onSubmit={handleSubmit} />
        </div>
    );
};

export default EditPostPage;