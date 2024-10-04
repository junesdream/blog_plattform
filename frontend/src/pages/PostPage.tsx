import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { fetchPostById, fetchCommentsByPostId, saveComment } from '../services/api';
import CommentForm from '../components/comments/CommentForm';
import CommentComponent from '../components/comments/Comment'; // Änderung hier

const PostPage: React.FC = () => {
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchPost = async () => {
            if (id) {
                const data = await fetchPostById(Number(id));
                setPost(data);
            }
        };

        fetchPost();
    }, [id]);

    useEffect(() => {
        const fetchComments = async () => {
            if (id) {
                const data = await fetchCommentsByPostId(Number(id));
                setComments(data);
            }
        };

        fetchComments();
    }, [id]);

    const handleCommentSubmit = async (comment: Comment) => {
        await saveComment(comment);
        setComments(prevComments => [...prevComments, comment]);
    };

    if (!post) return <div>Loading...</div>;

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <h2>Comments</h2>
            {comments.map(comment => (
                <CommentComponent key={comment.id} comment={comment} /> // Änderung hier
            ))}
            <CommentForm postId={post.id} onSubmit={handleCommentSubmit} />
        </div>
    );
};

export default PostPage;