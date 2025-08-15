import mongoose from 'mongoose';
import { seedFoodData } from './seedData';

const runSeed = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://4ethiochild:newwayoflife@cluster0.dvvkrcu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    const success = await seedFoodData();
    
    if (success) {
      console.log('Seeding completed successfully');
    } else {
      console.log('Seeding failed');
    }

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('Error running seed:', error);
    process.exit(1);
  }
};

runSeed();