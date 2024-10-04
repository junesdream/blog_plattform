// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import EditPostPage from './pages/EditPostPage';
import Navbar from './components/Navbar';
import { CssBaseline } from '@mui/material';

const App: React.FC = () => {
  return (
      <Router>
        <CssBaseline />
        <Navbar />
        <Switch>
            <Route path="/" element={<HomePage />} />
            <Route path="/posts/:id" element={<PostPage />} />
            <Route path="/edit/:id?" element={<EditPostPage />} />
        </Switch>
      </Router>
  );
};

export default App;
