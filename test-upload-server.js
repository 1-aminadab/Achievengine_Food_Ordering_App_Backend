const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const app = express();
const PORT = 3000;

// CORS configuration
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve static files from uploads directory
app.use('/uploads', express.static(uploadsDir));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueId = uuidv4();
    const extension = path.extname(file.originalname);
    const filename = `${uniqueId}${extension}`;
    cb(null, filename);
  },
});

const fileFilter = function (req, file, cb) {
  // Check if file is an image
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Upload server is healthy',
    timestamp: new Date().toISOString()
  });
});

// Upload single image endpoint
app.post('/api/upload/image', (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message || 'Upload failed',
      });
    }

    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No image file provided',
        });
      }

      // Create the image URL
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const imageUrl = `${baseUrl}/uploads/${req.file.filename}`;

      res.status(200).json({
        success: true,
        message: 'Image uploaded successfully',
        data: {
          url: imageUrl,
          imageUrl: imageUrl,
          filename: req.file.filename,
          originalName: req.file.originalname,
          size: req.file.size,
          mimetype: req.file.mimetype,
        },
      });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to upload image',
        error: error.message || 'Unknown error',
      });
    }
  });
});

// Mock food endpoints for testing
app.get('/api/foods', (req, res) => {
  res.json({
    success: true,
    data: []
  });
});

app.post('/api/foods', (req, res) => {
  console.log('Creating food item:', req.body);
  res.json({
    success: true,
    data: { id: Date.now().toString(), ...req.body },
    message: 'Food item created successfully'
  });
});

app.put('/api/foods/:id', (req, res) => {
  console.log('Updating food item:', req.params.id, req.body);
  res.json({
    success: true,
    data: { id: req.params.id, ...req.body },
    message: 'Food item updated successfully'
  });
});

app.delete('/api/foods/:id', (req, res) => {
  console.log('Deleting food item:', req.params.id);
  res.json({
    success: true,
    message: 'Food item deleted successfully'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Test upload server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📤 Upload endpoint: http://localhost:${PORT}/api/upload/image`);
  console.log(`🍕 Mock foods API: http://localhost:${PORT}/api/foods`);
});