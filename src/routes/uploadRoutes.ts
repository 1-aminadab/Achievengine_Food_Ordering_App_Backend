import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

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

const fileFilter = function (req: any, file: any, cb: any) {
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

// Test endpoint to verify upload functionality
router.get('/test', (req: any, res: any) => {
  res.status(200).json({
    success: true,
    message: 'Upload endpoint is working',
    timestamp: new Date().toISOString(),
    uploadsDir: uploadsDir,
    uploadsDirExists: fs.existsSync(uploadsDir),
  });
});

// Upload single image endpoint
router.post('/image', (req: any, res: any) => {
  console.log('Upload request received');
  console.log('Request headers:', req.headers);
  console.log('Request body keys:', Object.keys(req.body || {}));
  
  upload.single('image')(req, res, (err: any) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(400).json({
        success: false,
        message: err.message || 'Upload failed',
        error: err.toString(),
      });
    }

    try {
      console.log('File received:', req.file);
      
      if (!req.file) {
        console.error('No file in request');
        return res.status(400).json({
          success: false,
          message: 'No image file provided',
          receivedFields: Object.keys(req.body || {}),
        });
      }

      // Create the image URL
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const imageUrl = `${baseUrl}/uploads/${req.file.filename}`;

      console.log('Image uploaded successfully:', {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
        url: imageUrl,
      });

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
      console.error('Upload processing error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to upload image',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  });
});

// Serve uploaded files
router.get('/files/:filename', (req: any, res: any) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(uploadsDir, filename);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'File not found',
      });
    }

    // Send the file
    res.sendFile(filePath);
  } catch (error) {
    console.error('File serve error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to serve file',
    });
  }
});

// Delete image endpoint
router.delete('/image/:filename', (req: any, res: any) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(uploadsDir, filename);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'File not found',
      });
    }

    // Delete the file
    fs.unlinkSync(filePath);

    res.status(200).json({
      success: true,
      message: 'Image deleted successfully',
    });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete image',
    });
  }
});

export default router;