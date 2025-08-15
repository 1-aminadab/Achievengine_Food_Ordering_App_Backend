import mongoose from 'mongoose';
import Food from '../models/Food';
import { v4 as uuidv4 } from 'uuid';

const sampleFoods = [
  {
    id: uuidv4(),
    name: "Margherita Pizza",
    description: "Classic pizza with fresh mozzarella, tomatoes, and basil",
    price: 12.99,
    imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400",
    category: "pizza",
    restaurant: "Papa's Pizzeria",
    availability: true,
    quantity: 50,
    deliveryTime: "25-30 min",
    spiceLevel: "Mild",
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    ingredients: ["mozzarella", "tomatoes", "basil", "pizza dough"],
    nutritionalInfo: {
      calories: 285,
      protein: 12,
      carbs: 35,
      fat: 10
    }
  },
  {
    id: uuidv4(),
    name: "Chicken Burger",
    description: "Grilled chicken breast with lettuce, tomato, and mayo",
    price: 8.99,
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
    category: "burger",
    restaurant: "Burger Palace",
    availability: true,
    quantity: 30,
    deliveryTime: "15-20 min",
    spiceLevel: "Mild",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    ingredients: ["chicken breast", "lettuce", "tomato", "mayo", "burger bun"],
    nutritionalInfo: {
      calories: 420,
      protein: 35,
      carbs: 30,
      fat: 18
    }
  },
  {
    id: uuidv4(),
    name: "Caesar Salad",
    description: "Fresh romaine lettuce with parmesan cheese and croutons",
    price: 7.50,
    imageUrl: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=400",
    category: "salad",
    restaurant: "Green Garden",
    availability: true,
    quantity: 25,
    deliveryTime: "10-15 min",
    spiceLevel: "Mild",
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    ingredients: ["romaine lettuce", "parmesan cheese", "croutons", "caesar dressing"],
    nutritionalInfo: {
      calories: 180,
      protein: 8,
      carbs: 12,
      fat: 12
    }
  },
  {
    id: uuidv4(),
    name: "Spaghetti Carbonara",
    description: "Classic Italian pasta with eggs, cheese, and pancetta",
    price: 14.99,
    imageUrl: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400",
    category: "pasta",
    restaurant: "Nonna's Kitchen",
    availability: true,
    quantity: 20,
    deliveryTime: "20-25 min",
    spiceLevel: "Medium",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    ingredients: ["spaghetti", "eggs", "parmesan cheese", "pancetta", "black pepper"],
    nutritionalInfo: {
      calories: 580,
      protein: 25,
      carbs: 65,
      fat: 25
    }
  },
  {
    id: uuidv4(),
    name: "Fish Tacos",
    description: "Grilled fish with cabbage slaw and spicy mayo",
    price: 10.99,
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400",
    category: "main",
    restaurant: "Coastal Cantina",
    availability: true,
    quantity: 15,
    deliveryTime: "15-20 min",
    spiceLevel: "Medium",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    ingredients: ["white fish", "corn tortillas", "cabbage", "lime", "spicy mayo"],
    nutritionalInfo: {
      calories: 320,
      protein: 28,
      carbs: 25,
      fat: 12
    }
  },
  {
    id: uuidv4(),
    name: "Chocolate Brownie",
    description: "Rich and fudgy chocolate brownie with vanilla ice cream",
    price: 5.99,
    imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
    category: "dessert",
    restaurant: "Sweet Treats",
    availability: true,
    quantity: 40,
    deliveryTime: "10-15 min",
    spiceLevel: "Mild",
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    ingredients: ["chocolate", "butter", "sugar", "eggs", "flour", "vanilla ice cream"],
    nutritionalInfo: {
      calories: 450,
      protein: 6,
      carbs: 55,
      fat: 24
    }
  },
  {
    id: uuidv4(),
    name: "Green Smoothie",
    description: "Healthy blend of spinach, banana, apple, and coconut water",
    price: 4.99,
    imageUrl: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400",
    category: "beverage",
    restaurant: "Juice Bar",
    availability: true,
    quantity: 35,
    deliveryTime: "5-10 min",
    spiceLevel: "Mild",
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    ingredients: ["spinach", "banana", "apple", "coconut water", "lime"],
    nutritionalInfo: {
      calories: 120,
      protein: 3,
      carbs: 28,
      fat: 1
    }
  },
  {
    id: uuidv4(),
    name: "Buffalo Wings",
    description: "Spicy chicken wings with blue cheese dip",
    price: 9.99,
    imageUrl: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400",
    category: "appetizer",
    restaurant: "Wing Stop",
    availability: true,
    quantity: 25,
    deliveryTime: "20-25 min",
    spiceLevel: "Hot",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    ingredients: ["chicken wings", "buffalo sauce", "blue cheese", "celery"],
    nutritionalInfo: {
      calories: 380,
      protein: 32,
      carbs: 5,
      fat: 26
    }
  }
];

export const seedFoodData = async () => {
  try {
    // Clear existing data
    await Food.deleteMany({});
    console.log('Cleared existing food data');

    // Insert sample data
    await Food.insertMany(sampleFoods);
    console.log(`Seeded ${sampleFoods.length} food items`);
    
    return true;
  } catch (error) {
    console.error('Error seeding food data:', error);
    return false;
  }
};