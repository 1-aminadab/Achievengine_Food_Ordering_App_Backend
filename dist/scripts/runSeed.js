"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const seedData_1 = require("./seedData");
const runSeed = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://4ethiochild:newwayoflife@cluster0.dvvkrcu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
        await mongoose_1.default.connect(mongoUri);
        console.log('Connected to MongoDB');
        const success = await (0, seedData_1.seedFoodData)();
        if (success) {
            console.log('Seeding completed successfully');
        }
        else {
            console.log('Seeding failed');
        }
        await mongoose_1.default.disconnect();
        console.log('Disconnected from MongoDB');
        process.exit(0);
    }
    catch (error) {
        console.error('Error running seed:', error);
        process.exit(1);
    }
};
runSeed();
//# sourceMappingURL=runSeed.js.map