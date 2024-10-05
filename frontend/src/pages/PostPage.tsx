import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Comment } from '../types/Comment';
import CommentComponent from '../components/comments/Comment';
import CommentForm from '../components/comments/CommentForm';
import { saveComment, fetchCommentsByPostId } from "../services/api";

const PostPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        const loadComments = async () => {
            if (id) {
                try {
                    const fetchedComments = await fetchCommentsByPostId(Number(id));
                    setComments(fetchedComments);
                } catch (error) {
                    console.error("Failed to fetch comments:", error);
                }
            }
        };
        loadComments();
    }, [id]);


    const handleAddComment = async (comment: Comment) => {
        try {
            const newComment = await saveComment(comment); // Passe die Argumente an
            setComments([...comments, newComment]);
        } catch (error) {
            console.error("Failed to add comment:", error);
        }
    };

    return (
        <div>
            <h1>Post Page</h1>
            <CommentForm postId={Number(id)} onSubmit={handleAddComment} />
            <div>
                {comments.map((comment) => (
                    <CommentComponent key={comment.id} comment={comment} />
                ))}
            </div>
        </div>
    );
};

export default PostPage;
