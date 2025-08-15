"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./services/database");
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const foodRoutes_1 = __importDefault(require("./routes/foodRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const promoRoutes_1 = __importDefault(require("./routes/promoRoutes"));
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, helmet_1.default)());
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'];
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
app.use('/uploads', express_1.default.static('uploads'));
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});
app.use('/api/foods', foodRoutes_1.default);
app.use('/api/orders', orderRoutes_1.default);
app.use('/api/promo-codes', promoRoutes_1.default);
app.use('/api/upload', uploadRoutes_1.default);
app.get('/api', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Food Ordering API',
        version: '1.0.0',
        endpoints: {
            foods: {
                'GET /api/foods': 'Get all foods with optional filters',
                'GET /api/foods/search': 'Search foods by text',
                'GET /api/foods/categories': 'Get all food categories',
                'GET /api/foods/:id': 'Get food by ID',
                'POST /api/foods': 'Create new food item (admin)',
                'PUT /api/foods/:id': 'Update food item (admin)',
                'DELETE /api/foods/:id': 'Delete food item (admin)'
            },
            orders: {
                'POST /api/orders': 'Create new order (auth required)',
                'GET /api/orders': 'Get user orders (auth required)',
                'GET /api/orders/:id': 'Get order by ID (auth required)',
                'PATCH /api/orders/:id/status': 'Update order status (auth required)',
                'PATCH /api/orders/:id/cancel': 'Cancel order (auth required)',
                'POST /api/orders/:id/rating': 'Rate order (auth required)'
            },
            promoCodes: {
                'POST /api/promo-codes/validate': 'Validate promo code',
                'GET /api/promo-codes/active': 'Get active promo codes'
            },
            uploads: {
                'POST /api/upload/image': 'Upload single image file',
                'GET /api/upload/files/:filename': 'Get uploaded file by filename',
                'DELETE /api/upload/image/:filename': 'Delete uploaded image'
            }
        }
    });
});
app.use(errorMiddleware_1.notFoundHandler);
app.use(errorMiddleware_1.errorHandler);
const startServer = async () => {
    try {
        await (0, database_1.connectDatabase)();
        console.log('📊 Using existing data from MongoDB Atlas cluster');
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`📍 Health check: http://localhost:${PORT}/health`);
            console.log(`📚 API docs: http://localhost:${PORT}/api`);
            console.log(`🍕 Foods API: http://localhost:${PORT}/api/foods`);
            console.log(`🎫 Promo codes API: http://localhost:${PORT}/api/promo-codes/active`);
        });
    }
    catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};
process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
    process.exit(1);
});
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});
startServer();
//# sourceMappingURL=index.js.map