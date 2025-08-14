# Food Ordering Backend API

A robust Node.js backend API for a food ordering application built with Express.js, TypeScript, and MongoDB.

## Features

- 🍕 **Food Management**: CRUD operations for food items with advanced filtering
- 📦 **Order Management**: Complete order lifecycle management
- 🎫 **Promo Codes**: Discount codes validation and management
- 🔒 **Authentication**: JWT-based authentication system
- ✅ **Validation**: Comprehensive input validation with Joi
- 🛡️ **Security**: Security best practices with Helmet and CORS
- 📊 **Database**: MongoDB with Mongoose ODM
- 🔍 **Search**: Full-text search for food items
- 📈 **Performance**: Compression and connection pooling

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JWT
- **Validation**: Joi
- **Security**: Helmet, CORS
- **Environment**: dotenv

## API Endpoints

### Foods
- `GET /api/foods` - Get all foods with filtering
- `GET /api/foods/search` - Search foods by text
- `GET /api/foods/categories` - Get food categories
- `GET /api/foods/:id` - Get food by ID
- `POST /api/foods` - Create food item (admin)
- `PUT /api/foods/:id` - Update food item (admin)
- `DELETE /api/foods/:id` - Delete food item (admin)

### Orders (Authentication Required)
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `PATCH /api/orders/:id/status` - Update order status
- `PATCH /api/orders/:id/cancel` - Cancel order
- `POST /api/orders/:id/rating` - Rate order

### Promo Codes
- `POST /api/promo-codes/validate` - Validate promo code
- `GET /api/promo-codes/active` - Get active promo codes

## Quick Start

### Prerequisites
- Node.js 18 or higher
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone and navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration:
   ```env
   PORT=3000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/food_ordering_app
   JWT_SECRET=your-super-secret-jwt-key-here
   ALLOWED_ORIGINS=http://localhost:3000,http://localhost:19006
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   
   # Or use MongoDB Atlas cloud service
   ```

5. **Run the application**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production build
   npm run build
   npm start
   ```

### Development Scripts

```bash
npm run dev        # Start development server with auto-reload
npm run build      # Build TypeScript to JavaScript
npm start          # Start production server
npm run lint       # Run ESLint
npm run type-check # TypeScript type checking
npm test           # Run tests (when implemented)
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment mode | `development` |
| `MONGODB_URI` | MongoDB connection string | Required |
| `JWT_SECRET` | JWT signing secret | Required |
| `ALLOWED_ORIGINS` | CORS allowed origins | `http://localhost:3000` |

## Sample Data

The application automatically seeds sample data on first run:
- 8 sample food items across different categories
- 3 sample promo codes (WELCOME, SAVE50, FIRST20)

## API Usage Examples

### Get Foods with Filters
```bash
GET /api/foods?category=pizza&isVegetarian=true&minPrice=100&maxPrice=300
```

### Search Foods
```bash
GET /api/foods/search?q=chicken
```

### Validate Promo Code
```bash
POST /api/promo-codes/validate
Content-Type: application/json

{
  "code": "WELCOME",
  "orderValue": 250
}
```

### Create Order
```bash
POST /api/orders
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "items": [
    {
      "id": "food-item-id",
      "name": "Margherita Pizza",
      "price": 250,
      "quantity": 2,
      "imageUrl": "https://example.com/image.jpg"
    }
  ],
  "totalPrice": 500,
  "deliveryType": "delivery",
  "paymentMethod": "cash",
  "deliveryAddress": {
    "street": "123 Main St",
    "city": "Addis Ababa",
    "state": "AA",
    "zipCode": "1000",
    "country": "Ethiopia"
  }
}
```

## Database Schema

### Food Item
```typescript
{
  id: string;
  name: string;
  description: string;
  price: number;
  availability: boolean;
  deliveryTime: string;
  imageUrl: string;
  quantity: number;
  category: string;
  restaurant: string;
  ingredients?: string[];
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  spiceLevel?: 'Mild' | 'Medium' | 'Hot' | 'Very Hot';
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
}
```

### Order
```typescript
{
  id: string;
  userId: string;
  items: CartItem[];
  totalPrice: number;
  discount: number;
  deliveryFee: number;
  finalTotal: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'out-for-delivery' | 'delivered' | 'cancelled';
  deliveryType: 'delivery' | 'pickup';
  paymentMethod: 'cash' | 'card' | 'mobile';
  cutleryCount: number;
  promoCode?: string;
  specialInstructions?: string;
}
```

## Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing configuration
- **Input Validation**: Joi schema validation
- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcrypt for password security
- **Rate Limiting**: (Ready to implement)

## Error Handling

The API uses consistent error response format:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

## Testing

```bash
# Health check
curl http://localhost:3000/health

# Get foods
curl http://localhost:3000/api/foods

# Get active promo codes
curl http://localhost:3000/api/promo-codes/active
```

## Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables for Production
- Set `NODE_ENV=production`
- Use strong `JWT_SECRET`
- Configure production MongoDB URI
- Set appropriate `ALLOWED_ORIGINS`

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License

MIT License - see LICENSE file for details# Achievengine_Food_Ordering_App_Backend
