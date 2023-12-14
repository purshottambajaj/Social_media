const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/users',
  { useNewUrlParser: true, useUnifiedTopology: true });
const User = 
mongoose.model('User', { email: String, password: String, username: String });

const Post = mongoose.model('post', {
  title: String,content: String,author: String,likes: {type: Number,default: 0
  }, comments: [{text: String,commenter: String  }]
}, 'post');

//See all the post
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new post
app.post('/posts', async (req, res) => {
  const { title, content, author} = req.body;
  try {
    const newPost = new Post({ title, content, author });
    await newPost.save();
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Like a post
app.put('/posts/:postId/like', async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    post.likes += 1;
    await post.save();
    res.status(200).json({ message: 'Post liked successfully', post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a comment to a post
app.post('/posts/:postId/comments', async (req, res) => {
  const { postId } = req.params;
  const { text, commenter } = req.body;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    post.comments.push({ text, commenter });
    await post.save();
    res.status(201).json({ message: 'Comment added successfully', post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a post
app.delete('/delposts/:postId', async (req, res) => {
  const { postId } = req.params;
  try {
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully', deletedPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// User Registration 
app.post('/register', async (req, res) => {
    const { email, password, username } = req.body;
    try {
        const user = new User({ email, password, username });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// User Login 
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (!user) {
            res.status(401).json({ message: 'Invalid credentials' });
        } else {
            res.status(200).json({ message: 'Login successful' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// forget _  password 

app.post('/forgot-password', async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        res.status(200).json({ message: 'Password reset instructions sent to email' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to process request' });
    }
  });
    
app.listen(4000, () => {
    console.log('Server started on port 4000');
});
