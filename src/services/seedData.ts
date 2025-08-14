import { v4 as uuidv4 } from 'uuid';
import Food from '../models/Food';
import PromoCode from '../models/PromoCode';

export const seedFoodData = async (): Promise<void> => {
  try {
    const existingFoods = await Food.countDocuments();
    if (existingFoods > 0) {
      console.log('Food data already exists, skipping seed');
      return;
    }

    const sampleFoods = [
      {
        id: uuidv4(),
        name: 'Margherita Pizza',
        description: 'Classic pizza with fresh mozzarella, tomato sauce, and basil',
        price: 250,
        availability: true,
        deliveryTime: '25-30 mins',
        imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500',
        quantity: 50,
        category: 'pizza',
        restaurant: 'Spice and Sizzle',
        ingredients: ['Mozzarella', 'Tomato Sauce', 'Basil', 'Olive Oil'],
        nutritionalInfo: {
          calories: 285,
          protein: 12,
          carbs: 36,
          fat: 10
        },
        spiceLevel: 'Mild',
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: false
      },
      {
        id: uuidv4(),
        name: 'Chicken Burger Deluxe',
        description: 'Grilled chicken breast with lettuce, tomato, cheese, and special sauce',
        price: 180,
        availability: true,
        deliveryTime: '20-25 mins',
        imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
        quantity: 30,
        category: 'burger',
        restaurant: 'Burger Palace',
        ingredients: ['Chicken Breast', 'Lettuce', 'Tomato', 'Cheese', 'Special Sauce', 'Bun'],
        nutritionalInfo: {
          calories: 520,
          protein: 35,
          carbs: 42,
          fat: 22
        },
        spiceLevel: 'Medium',
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false
      },
      {
        id: uuidv4(),
        name: 'Pasta Carbonara',
        description: 'Creamy pasta with bacon, eggs, parmesan cheese, and black pepper',
        price: 220,
        availability: true,
        deliveryTime: '15-20 mins',
        imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=500',
        quantity: 25,
        category: 'pasta',
        restaurant: 'Italian Corner',
        ingredients: ['Pasta', 'Bacon', 'Eggs', 'Parmesan', 'Black Pepper', 'Cream'],
        nutritionalInfo: {
          calories: 580,
          protein: 28,
          carbs: 55,
          fat: 28
        },
        spiceLevel: 'Mild',
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false
      },
      {
        id: uuidv4(),
        name: 'Caesar Salad',
        description: 'Fresh romaine lettuce with caesar dressing, croutons, and parmesan',
        price: 120,
        availability: true,
        deliveryTime: '10-15 mins',
        imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500',
        quantity: 40,
        category: 'salad',
        restaurant: 'Green Garden',
        ingredients: ['Romaine Lettuce', 'Caesar Dressing', 'Croutons', 'Parmesan'],
        nutritionalInfo: {
          calories: 185,
          protein: 8,
          carbs: 12,
          fat: 12
        },
        spiceLevel: 'Mild',
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: false
      },
      {
        id: uuidv4(),
        name: 'Spicy Chicken Wings',
        description: 'Hot and spicy chicken wings with blue cheese dip',
        price: 200,
        availability: true,
        deliveryTime: '25-30 mins',
        imageUrl: 'https://images.unsplash.com/photo-1527477396-31ff8b3806d7?w=500',
        quantity: 35,
        category: 'appetizer',
        restaurant: 'Wing Stop',
        ingredients: ['Chicken Wings', 'Hot Sauce', 'Blue Cheese', 'Celery'],
        nutritionalInfo: {
          calories: 430,
          protein: 32,
          carbs: 5,
          fat: 31
        },
        spiceLevel: 'Hot',
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: true
      },
      {
        id: uuidv4(),
        name: 'Chocolate Brownie',
        description: 'Rich chocolate brownie with vanilla ice cream',
        price: 80,
        availability: true,
        deliveryTime: '10-15 mins',
        imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500',
        quantity: 20,
        category: 'dessert',
        restaurant: 'Sweet Treats',
        ingredients: ['Chocolate', 'Butter', 'Sugar', 'Eggs', 'Flour', 'Vanilla Ice Cream'],
        nutritionalInfo: {
          calories: 385,
          protein: 6,
          carbs: 52,
          fat: 18
        },
        spiceLevel: 'Mild',
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: false
      },
      {
        id: uuidv4(),
        name: 'Fresh Orange Juice',
        description: 'Freshly squeezed orange juice',
        price: 45,
        availability: true,
        deliveryTime: '5-10 mins',
        imageUrl: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500',
        quantity: 50,
        category: 'beverage',
        restaurant: 'Juice Bar',
        ingredients: ['Fresh Oranges'],
        nutritionalInfo: {
          calories: 110,
          protein: 2,
          carbs: 26,
          fat: 0
        },
        spiceLevel: 'Mild',
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true
      },
      {
        id: uuidv4(),
        name: 'Vegetable Soup',
        description: 'Healthy mixed vegetable soup with herbs',
        price: 90,
        availability: true,
        deliveryTime: '15-20 mins',
        imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500',
        quantity: 30,
        category: 'soup',
        restaurant: 'Healthy Bowls',
        ingredients: ['Mixed Vegetables', 'Vegetable Broth', 'Herbs', 'Spices'],
        nutritionalInfo: {
          calories: 85,
          protein: 3,
          carbs: 17,
          fat: 1
        },
        spiceLevel: 'Mild',
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true
      }
    ];

    await Food.insertMany(sampleFoods);
    console.log('✅ Sample food data seeded successfully');

  } catch (error) {
    console.error('❌ Error seeding food data:', error);
  }
};

export const seedPromoCodeData = async (): Promise<void> => {
  try {
    const existingPromoCodes = await PromoCode.countDocuments();
    if (existingPromoCodes > 0) {
      console.log('Promo code data already exists, skipping seed');
      return;
    }

    const samplePromoCodes = [
      {
        id: uuidv4(),
        code: 'WELCOME',
        description: '10% off on your first order',
        discountType: 'percentage',
        discountValue: 10,
        minimumOrderValue: 100,
        maximumDiscount: 50,
        usageLimit: 1000,
        usedCount: 0,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        isActive: true
      },
      {
        id: uuidv4(),
        code: 'SAVE50',
        description: '50 ETB off on orders above 300 ETB',
        discountType: 'fixed',
        discountValue: 50,
        minimumOrderValue: 300,
        usageLimit: 500,
        usedCount: 0,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
        isActive: true
      },
      {
        id: uuidv4(),
        code: 'FIRST20',
        description: '20% off for new customers',
        discountType: 'percentage',
        discountValue: 20,
        minimumOrderValue: 150,
        maximumDiscount: 100,
        usageLimit: 200,
        usedCount: 0,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
        isActive: true
      }
    ];

    await PromoCode.insertMany(samplePromoCodes);
    console.log('✅ Sample promo code data seeded successfully');

  } catch (error) {
    console.error('❌ Error seeding promo code data:', error);
  }
};