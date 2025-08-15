"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    console.error('Error:', error);
    if (error.name === 'ValidationError') {
        const response = {
            success: false,
            message: 'Validation error',
            error: error.message
        };
        res.status(400).json(response);
        return;
    }
    if (error.name === 'MongoError' && error.code === 11000) {
        const response = {
            success: false,
            message: 'Duplicate entry error',
            error: 'A record with this information already exists'
        };
        res.status(409).json(response);
        return;
    }
    if (error.name === 'JsonWebTokenError') {
        const response = {
            success: false,
            message: 'Invalid token',
            error: error.message
        };
        res.status(401).json(response);
        return;
    }
    if (error.name === 'TokenExpiredError') {
        const response = {
            success: false,
            message: 'Token expired',
            error: error.message
        };
        res.status(401).json(response);
        return;
    }
    const response = {
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    };
    res.status(500).json(response);
};
exports.errorHandler = errorHandler;
const notFoundHandler = (req, res) => {
    const response = {
        success: false,
        message: `Route ${req.originalUrl} not found`
    };
    res.status(404).json(response);
};
exports.notFoundHandler = notFoundHandler;
//# sourceMappingURL=errorMiddleware.js.map