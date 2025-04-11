import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const populatedName = process.env.POPULATEDNAME || "Default Populated Name";
export const name = process.env.NAME || "Default Name";