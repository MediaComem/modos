import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

// Root of the application.
export const root = path.resolve(path.join(__dirname, '..'));

// To generate full URLs.
export const baseUrl = process.env.MODOS_BASE_URL || 'http://localhost:3000';

// MongoDB connection URI.
export const databaseUrl = process.env.MODOS_DATABASE_URL || 'mongodb://localhost/modos';

// Environment.
export const env = process.env.NODE_ENV || 'development';

// Port on which the application listens to.
export const port = process.env.MODOS_PORT || process.env.PORT || 3000;

// To sign JWTs, session cookies, etc.
export const secretBase = process.env.MODOS_SECRET || 'changeme';


// Expiration time for JWT.
export const expirationTime = process.env.MODOS_JWT_EXPIRATION || '1h';

// Configurable directory in which to store data that does not go into the database (e.g. images).
export const storageDirectory = process.env.MODOS_STORAGE_DIRECTORY || path.join(root, 'data/');

// Format in which the images are saved.
export const imageFormat = process.env.MODOS_IMAGE_FORMAT || '.png';

// Payload max size.
export const payloadLimit = process.env.MODOS_PAYLOAD_LIMIT || '25mb';

// Bcrypt cost factor.
export const costFactor = process.env.MODOS_COST_FACTOR || 10;
