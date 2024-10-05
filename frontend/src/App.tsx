import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import EditPostPage from './pages/EditPostPage';
import Navbar from './components/layout/Navbar';
import { CssBaseline } from '@mui/material';

const App: React.FC = () => {
    return (
        <Router>
            <CssBaseline />
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/edit" element={<EditPostPage />} />
                <Route path="/posts/:id" element={<PostPage />} />
                <Route path="/edit/:id" element={<EditPostPage />} />
            </Routes>
        </Router>
    );
};

export default App;