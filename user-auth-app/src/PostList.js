import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './PostList.css'; // Import CSS file for styling
import { Link } from 'react-router-dom';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [newComment, setNewComment] = useState('');

  // Fetch all posts when the component mounts
  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:4000/delposts/${postId}`);
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleLike = async (postId) => {
    try {
      await axios.put(`http://localhost:4000/posts/${postId}/like`);
      fetchPosts();
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleAddComment = async (postId) => {
    try {
      await axios.post(`http://localhost:4000/posts/${postId}/comments`, { text: newComment });
      fetchPosts();
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="post-list-container">
      <h2>All Posts</h2>
      {posts.map((post) => (
        <div key={post._id} className="post-item">
          <div className="post-header">
            <h3>{post.title}</h3>
            <p>Author: {post.author}</p>
            <p>Likes: {post.likes}</p>
            <button onClick={() => handleLike(post._id)}>Like</button>
            <button onClick={() => handleDelete(post._id)}>Delete</button>
          </div>
          <div className="post-content">
            <p>{post.content}</p>
            <ul className="comments-list">
              <strong>Comments:</strong>
              {post.comments.map((comment, index) => (
                <li key={index}>
                  <em>{comment.text}</em> - {comment.commenter}
                </li>
              ))}
            </ul>
            <div className="add-comment">
              <input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button onClick={() => handleAddComment(post._id)}>Add Comment</button>
            </div>
          </div>
        </div>
      ))}
       <div className="extra-links">
        <Link to="/new-post" >Add new post</Link>
      </div>
    </div>
  );
};

export default PostList;
