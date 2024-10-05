import React, {useState} from 'react';
import {Comment} from '../../types/Comment';

interface CommentFormProps {
    postId: number;
    onSubmit: (comment: Comment) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({postId, onSubmit}) => {
    const [comment, setComment] = useState<Comment>({id: 0, postId, body: '', author: ''});
    const [error, setError] = useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setComment(prevComment => ({...prevComment, [name]: value}));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await onSubmit(comment);
            setComment({id: 0, postId, body: '', author: ''}); // reset form
            setError(null); // clear error
        } catch (err) {
            setError('Failed to submit comment');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <label>
                Author:
                <input
                    type="text"
                    name="author"
                    value={comment.author}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Comment:
                <textarea
                    name="body"
                    value={comment.body}
                    onChange={handleChange}
                    required
                />
            </label>
            <button type="submit">Add Comment</button>
        </form>
    );
};

export default CommentForm;
