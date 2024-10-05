// src/pages/PostPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { fetchPostById, fetchCommentsByPostId, saveComment } from '../services/api';
import CommentForm from '../components/comments/CommentForm';
import CommentComponent from '../components/comments/Comment';

const PostPage: React.FC = () => {
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchPostAndComments = async () => {
            if (id) {
                try {
                    const postData = await fetchPostById(Number(id));
                    setPost(postData);

                    const commentsData = await fetchCommentsByPostId(Number(id));
                    setComments(commentsData);
                } catch (error) {
                    console.error("Error fetching data: ", error);
                }
            }
        };

        fetchPostAndComments();
    }, [id]);

    if (!post) return <div>Loading...</div>;

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <p>Author: {post.author}</p> {/* Hier wird der Autor angezeigt */}
            <h2>Comments</h2>
            {comments.map(comment => (
                <CommentComponent key={comment.id} comment={comment} />
            ))}
            <CommentForm postId={post.id} onSubmit={saveComment} />
        </div>
    );
};

export default PostPage;
