"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const router = express_1.default.Router();
const uploadsDir = path_1.default.join(process.cwd(), 'uploads');
if (!fs_1.default.existsSync(uploadsDir)) {
    fs_1.default.mkdirSync(uploadsDir, { recursive: true });
}
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        const uniqueId = (0, uuid_1.v4)();
        const extension = path_1.default.extname(file.originalname);
        const filename = `${uniqueId}${extension}`;
        cb(null, filename);
    },
});
const fileFilter = function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    }
    else {
        cb(new Error('Only image files are allowed!'));
    }
};
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});
router.get('/test', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Upload endpoint is working',
        timestamp: new Date().toISOString(),
        uploadsDir: uploadsDir,
        uploadsDirExists: fs_1.default.existsSync(uploadsDir),
    });
});
router.post('/image', (req, res) => {
    console.log('Upload request received');
    console.log('Request headers:', req.headers);
    console.log('Request body keys:', Object.keys(req.body || {}));
    upload.single('image')(req, res, (err) => {
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
        }
        catch (error) {
            console.error('Upload processing error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to upload image',
                error: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    });
});
router.get('/files/:filename', (req, res) => {
    try {
        const filename = req.params.filename;
        const filePath = path_1.default.join(uploadsDir, filename);
        if (!fs_1.default.existsSync(filePath)) {
            return res.status(404).json({
                success: false,
                message: 'File not found',
            });
        }
        res.sendFile(filePath);
    }
    catch (error) {
        console.error('File serve error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to serve file',
        });
    }
});
router.delete('/image/:filename', (req, res) => {
    try {
        const filename = req.params.filename;
        const filePath = path_1.default.join(uploadsDir, filename);
        if (!fs_1.default.existsSync(filePath)) {
            return res.status(404).json({
                success: false,
                message: 'File not found',
            });
        }
        fs_1.default.unlinkSync(filePath);
        res.status(200).json({
            success: true,
            message: 'Image deleted successfully',
        });
    }
    catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete image',
        });
    }
});
exports.default = router;
//# sourceMappingURL=uploadRoutes.js.map