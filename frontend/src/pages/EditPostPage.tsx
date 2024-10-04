import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Post } from '../types/Post';

const EditPostPage: React.FC = () => {
    const [post, setPost] = useState<Post>({ id: 0, title: '', body: '' });
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const fetchPost = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/api/posts/${id}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const data: Post = await response.json();
                    setPost(data);
                } catch (error) {
                    console.error('Failed to fetch post:', error);
                }
            };

            fetchPost();
        }
    }, [id]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const method = id ? 'PUT' : 'POST';
        const url = id ? `http://localhost:8080/api/posts/${id}` : 'http://localhost:8080/api/posts';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(post),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            navigate('/');
        } catch (error) {
            console.error('Failed to submit post:', error);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setPost(prevPost => ({ ...prevPost, [name]: value }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input type="text" name="title" value={post.title} onChange={handleChange} />
            </label>
            <label>
                Content:
                <textarea name="body" value={post.body} onChange={handleChange} />
            </label>
            <button type="submit">Save Post</button>
        </form>
    );
};

export default EditPostPage;