import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Post } from '../types/Post';

interface RouteParams {
    id?: string;
}

const EditPostPage: React.FC = () => {
    const [post, setPost] = useState<Post>({ id: 0, title: '', body: '' });
    const { id } = useParams<{id: string}>();

    useEffect(() => {
        if (id) {
            const fetchPost = async () => {
                const response = await fetch(`http://deine-api-url.com/posts/${id}`);
                const data: Post = await response.json();
                setPost(data);
            };

            fetchPost();
        }
    }, [id]);

    const navigate = useNavigate();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const method = id ? 'PUT' : 'POST';
        const url = id ? `http://deine-api-url.com/posts/${id}` : 'http://deine-api-url.com/posts';

        await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        });

       navigate('/');
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
