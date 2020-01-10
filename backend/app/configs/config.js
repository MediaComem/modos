const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

// Root of the application.
const root = path.resolve(path.join(__dirname, '..'));

// To generate full URLs.
exports.baseUrl = process.env.MODOS_BASE_URL || 'http://localhost:3000';

// MongoDB connection URI.
exports.databaseUrl = process.env.MODOS_DATABASE_URL || 'mongodb://localhost/modos'

// Environment.
exports.env = process.env.NODE_ENV || 'development';

// Port on which the application listens to.
exports.port = process.env.MODOS_PORT || process.env.PORT || 3000;

// To sign JWTs, session cookies, etc.
exports.secretBase = process.env.MODOS_SECRET || 'changeme';

// Expiration time for JWT
exports.expirationTime = process.env.MODOS_JWT_EXPIRATION || '1h';

// Configurable directory in which to store data that does not go into the database (e.g. images).
exports.storageDirectory = process.env.MODOS_STORAGE_DIRECTORY || path.join(root, 'data/');

// Format in which the images are saved
exports.imageFormat = process.env.MODOS_IMAGE_FORMAT || '.png'

// Payload max size
exports.payloadLimit = process.env.MODOS_PAYLOAD_LIMIT || '25mb'
