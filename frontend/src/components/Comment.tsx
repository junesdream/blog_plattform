import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Comment as CommentType } from '../types/Comment';

interface CommentProps {
    comment: CommentType;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
    return (
        <Card variant="outlined" style={{ marginBottom: 10 }}>
            <CardContent>
                <Typography variant="body1">{comment.body}</Typography>
                <Typography variant="body2" color="textSecondary">
                    - {comment.author}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Comment;
