import React, { useState } from 'react';
import { Post } from '../../types/Post';

interface PostFormProps {
    initialPost?: Post | null;
    onSubmit: (post: Post) => void;
}

const PostForm: React.FC<PostFormProps> = ({ initialPost, onSubmit }) => {
    const [post, setPost] = useState<Post>(initialPost || { id: 0, title: '', content: '', author: '' });


    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setPost(prevPost => ({ ...prevPost, [name]: value }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(post);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input type="text" name="title" value={post.title} onChange={handleChange} />
            </label>
            <label>
                Content:
                <textarea name="body" value={post.content} onChange={handleChange} />
            </label>
            <button type="submit">Save Post</button>
        </form>
    );
};

export default PostForm;