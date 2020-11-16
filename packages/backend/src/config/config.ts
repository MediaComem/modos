import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

// Root of the project.
export const root = path.resolve(path.join(__dirname, '..', '..'));

// Port on which the application listens to.
export const port = process.env.MODOS_PORT || process.env.PORT || 3000;

// The base URL at which the application can be reached.
export const baseUrl = process.env.MODOS_BASE_URL || `http://localhost:${port}`;

// PostgreSQL connection URI.
export const databaseUrl = process.env.MODOS_DATABASE_URL || 'postgres://localhost/modos';

// Environment.
export const env = process.env.NODE_ENV || 'development';

// To sign JWTs, session cookies, etc.
export const secretBase = process.env.MODOS_SECRET || 'changeme';

// Expiration time for JWT.
export const expirationTime = process.env.MODOS_JWT_EXPIRATION || '1h';

// Configurable directory in which to store data that does not go into the database (e.g. images).
export const storageDirectory = process.env.MODOS_STORAGE_DIRECTORY || path.join(root, 'data');

// Format in which the images are saved.
export const imageFormat = process.env.MODOS_IMAGE_FORMAT || '.png';

// Payload max size.
export const payloadLimit = process.env.MODOS_PAYLOAD_LIMIT || '25mb';

// Bcrypt cost factor.
export const costFactor = process.env.MODOS_BCRYPT_COST_FACTOR || 10;

// Whether to log TypeORM queries (false by default).
export const typeormLogging = process.env.TYPEORM_LOGGING !== undefined ? Boolean(process.env.TYPEORM_LOGGING) : false;
