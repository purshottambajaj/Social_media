import React, { useState } from 'react';
import axios from 'axios';
import './NewPostForm.css';

const NewPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:4000/posts', {
        title,
        content,
        author,
      });
      console.log('Post created:', response.data);
      // Reset form fields after successful post creation
      setTitle('');
      setContent('');
      setAuthor('');
    } catch (error) {
      console.error('Error creating post:', error);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="new-post-form">
      <h2>Create a New Post</h2>
      <form onSubmit={handleFormSubmit} className="form">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title..."
          required
        />

        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter content..."
          required
        ></textarea>

        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Enter author..."
          required
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default NewPostForm;
