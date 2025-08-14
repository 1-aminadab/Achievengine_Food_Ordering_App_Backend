import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import { connectDatabase } from './services/database';
import { seedFoodData, seedPromoCodeData } from './services/seedData';
import { errorHandler, notFoundHandler } from './middleware/errorMiddleware';

// Import routes
import foodRoutes from './routes/foodRoutes';
import orderRoutes from './routes/orderRoutes';
import promoRoutes from './routes/promoRoutes';

// Import validation middleware
import { validate, createFoodSchema, updateFoodSchema, createOrderSchema, updateOrderStatusSchema, rateOrderSchema, validatePromoCodeSchema } from './middleware/validationMiddleware';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(compression());

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'];
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API routes
app.use('/api/foods', foodRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/promo-codes', promoRoutes);

// API documentation endpoint
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
      }
    }
  });
});

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const startServer = async (): Promise<void> => {
  try {
    // Connect to database
    await connectDatabase();
    
    // Seed initial data
    await seedFoodData();
    await seedPromoCodeData();
    
    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 Health check: http://localhost:${PORT}/health`);
      console.log(`📚 API docs: http://localhost:${PORT}/api`);
      console.log(`🍕 Foods API: http://localhost:${PORT}/api/foods`);
      console.log(`🎫 Promo codes API: http://localhost:${PORT}/api/promo-codes/active`);
    });
    
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason: Error) => {
  console.error('Unhandled Rejection:', reason);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Start the server
startServer();