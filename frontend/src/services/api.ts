import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

const API_URL = 'http://localhost:8080/api';

export const fetchPosts = async (): Promise<Post[]> => {
    const response = await fetch(`${API_URL}/posts`);
    if (!response.ok) {
        throw new Error('Failed to fetch posts');
    }
    return response.json();
};

export const fetchPostById = async (id: number): Promise<Post> => {
    const response = await fetch(`${API_URL}/posts/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch post');
    }
    return response.json();
};

export const savePost = async (post: Post): Promise<void> => {
    const response = await fetch(`${API_URL}/posts/${post.id || ''}`, {
        method: post.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
    });
    if (!response.ok) {
        throw new Error('Failed to save post');
    }
};

export const fetchCommentsByPostId = async (postId: number): Promise<Comment[]> => {
    const response = await fetch(`${API_URL}/posts/${postId}/comments`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch comments');
    }
    return response.json();
};

export const saveComment = async (comment: Comment): Promise<void> => {
    const response = await fetch(`${API_URL}/posts/${comment.postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    });
    if (!response.ok) {
        throw new Error('Failed to save comment');
    }
};