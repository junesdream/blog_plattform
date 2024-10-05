import React from 'react';
import {Card, CardContent, Typography, CardActions, Button} from '@mui/material';
import {Post} from '../../types/Post';
import {useNavigate} from 'react-router-dom';

interface PostCardProps {
    post: Post;
}

const PostCard: React.FC<PostCardProps> = ({post}) => {
    const navigate = useNavigate();

    const handleViewClick = () => {
        navigate(`/posts/${post.id}`);
    };

    return (
        <Card variant="outlined" style={{marginBottom: 20}}>
            <CardContent>
                <Typography variant="h5">{post.title}</Typography>
                <Typography variant="body2" color="textPrimary">
                    {post.content?.substring(0, 100)}...
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {post.author?.substring(0, 100)}...
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={handleViewClick}>
                    View
                </Button>
            </CardActions>
        </Card>
    );
};

export default PostCard;