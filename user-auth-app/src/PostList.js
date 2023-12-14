import React, { useEffect, useState ,useCallback } from 'react';
import axios from 'axios';




const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [newComment, setNewComment] = useState('');
  
  // Fetch all posts when the component mounts
  async function fetchPosts() {
    try {
      const response = await axios.get('http://localhost:4000/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }

  fetchPosts();

  const memoizedFetchPosts = useCallback(() => fetchPosts(setPosts), [setPosts]);

  useEffect(() => {
    // Call fetchPosts directly within useEffect
    memoizedFetchPosts();
  }, [memoizedFetchPosts]);

  

  // Function to handle post deletion
const handleDelete = async (postId) => {
  try {
    await axios.delete(`http://localhost:4000/delposts/${postId}`);
    fetchPosts();
  } catch (error) {
    console.error('Error deleting post:', error);
  }
};

// Function to handle post liking
const handleLike = async (postId) => {
  try {
    await axios.put(`http://localhost:4000/posts/${postId}/like`);
     fetchPosts();
  } catch (error) {
    console.error('Error liking post:', error);
  }
};

 // Handle comment submission
 const handleAddComment = async (postId) => {
  try {
    await axios.post(`http://localhost:4000/posts/${postId}/comments`, { text: newComment });
    // Fetch updated posts after adding a comment
    fetchPosts();
    setNewComment(''); // Reset the comment input field
  } catch (error) {
    console.error('Error adding comment:', error);
  }
};


  return (
    <div>
      <h2>All Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>Author: {post.author}</p>
            <p>Likes: {post.likes}</p>
            <ul>
              <li>
                <strong>Comments:</strong>
                <ul>
                  {post.comments.map((comment, index) => (
                    <li key={index}>
                      <em>{comment.text}</em> - {comment.commenter}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
            {/* Add Like and Delete buttons */}
            <button onClick={() => handleLike(post._id)}>Like</button>
            <button onClick={() => handleDelete(post._id)}>Delete</button>
            <input
                  type="text"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={() => handleAddComment(post._id)}>Add Comment</button>
              
          </li>
        ))}
        
      </ul>
    </div>
  );
};

export default PostList;
