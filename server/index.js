const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://kimiClaw:Y7sKUHDBSwmafaRm@cluster3.7mxgj4n.mongodb.net/kimiclaw';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// Schemas
const OrderSchema = new mongoose.Schema({
  design: {
    type: { type: String },
    imageUrl: String,
    prompt: String
  },
  product: {
    type: String,
    size: String,
    color: String
  },
  customer: {
    email: String,
    firstName: String,
    lastName: String,
    address: String,
    city: String,
    zipCode: String,
    country: String
  },
  total: Number,
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const DesignSchema = new mongoose.Schema({
  type: String,
  imageUrl: String,
  prompt: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', OrderSchema);
const Design = mongoose.model('Design', DesignSchema);

// Multer config for file uploads
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// Upload image
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ success: true, imageUrl });
});

// Create order
app.post('/api/orders', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.json({ success: true, orderId: order._id });
  } catch (err) {
    console.error('Order error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(50);
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save design
app.post('/api/designs', async (req, res) => {
  try {
    const design = new Design(req.body);
    await design.save();
    res.json({ success: true, designId: design._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get designs
app.get('/api/designs', async (req, res) => {
  try {
    const designs = await Design.find().sort({ createdAt: -1 }).limit(20);
    res.json({ success: true, designs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Segmind mockup generation (placeholder)
app.post('/api/mockup', async (req, res) => {
  const { designUrl, productType } = req.body;
  
  // TODO: Integrate with Segmind API
  // const SEGMIND_API_KEY = process.env.SEGMIND_API_KEY;
  
  res.json({ 
    success: true, 
    mockupUrl: designUrl,
    note: 'Add Segmind API integration for real product mockups'
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
