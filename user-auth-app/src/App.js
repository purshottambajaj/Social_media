import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import PostList from './PostList';
import NewPostForm from './NewPostForm';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
           </ul>
        </nav>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/new-post" element={<NewPostForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
