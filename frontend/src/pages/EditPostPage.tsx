import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Post } from '../types/Post';
import { fetchPostById, savePost } from '../services/api';
import PostForm from '../components/posts/PostForm';

const EditPostPage: React.FC = () => {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const loadPost = async () => {
            if (id) {
                try {
                    const fetchedPost = await fetchPostById(Number(id));
                    setPost(fetchedPost);
                } catch (error) {
                    console.error('Failed to fetch post:', error);
                    setError('Failed to load the post.');
                }
            }
            setLoading(false);
        };

        loadPost();
    }, [id]);

    const handleSubmit = async (post: Post) => {
        try {
            await savePost(post);
            navigate('/'); // Redirect to home after save
        } catch (error) {
            console.error('Failed to save post:', error);
            setError('Failed to save the post.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>{id ? 'Edit Post' : 'Create Post'}</h1>
            <PostForm initialPost={post} onSubmit={handleSubmit} />
        </div>
    );
};

export default EditPostPage;
