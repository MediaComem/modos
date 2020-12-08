import * as dotenv from 'dotenv';
import * as path from 'path';
import { URL } from 'url';

dotenv.config();

// Root of the project.
export const root = path.resolve(path.join(__dirname, '..', '..'));

// Port on which the application listens to.
export const port = parseEnvPort('MODOS_PORT', { required: false }) || parseEnvPort('PORT', { required: false }) || 3000;

// The base URL at which the application can be reached.
export const baseUrl = parseEnvUrl('MODOS_BASE_URL', { required: false }) || `http://localhost:${port}`;

// PostgreSQL connection URI.
export const databaseUrl = parseEnvUrl('MODOS_DATABASE_URL', { allowedProtocols: ['postgres:'], required: false }) || 'postgres://localhost/modos';

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
export const costFactor = parseEnvInteger('MODOS_BCRYPT_COST_FACTOR', { required: false }) || 10;

// Whether to log TypeORM queries (false by default).
export const typeormLogging = parseEnvBoolean('TYPEORM_LOGGING', { default: 'false' });

interface ParseEnvOptions {
    readonly default?: string;
    readonly required?: boolean;
}

/**
 * Returns the value of an environment variable. By default, the variable is
 * required to be set in the environment unless a default value is provided.
 */
function parseEnv(varname: string, options: ParseEnvOptions = {}) {

    const defaultValue = options.default;
    const required = options.required !== undefined ? options.required : defaultValue === undefined;

    const value = process.env[varname];
    if (value === undefined && required) {
        throw new Error(`Environment variable $${varname} is required`);
    }

    return value !== undefined ? value : defaultValue;
};

/**
 * Returns the value of a boolean environment variable. By default, the variable
 * is required to be set in the environment unless a default value is provided.
 *
 * The following values are considered valid booleans:
 *
 * * For true: `1`, `y`, `yes`, `t`, `true`.
 * * For false: `0`, `n`, `no`, `f`, `false`.
 *
 * Any other value will be considered invalid.
 */
function parseEnvBoolean(varname: string, options: ParseEnvOptions = {}) {

    const value = parseEnv(varname, options);
    if (value === undefined) {
        // Do not check the value if it is not required.
        return;
    } else if (/^(1|y|yes|t|true)$/.exec(value)) {
        return true;
    } else if (/^(0|n|no|f|false)$/.exec(value)) {
        return false;
    }

    throw new Error(`Environment variable $${varname} must be a boolean`);
}

interface ParseEnvUrlOptions extends ParseEnvOptions {
    readonly allowedProtocols?: string[];
}

/**
 * Returns the value of an environment variable that is supposed to be a URL (without a
 * trailing slash). By default, the variable is required to be set in the environment
 * unless a default value is provided.
 */
function parseEnvUrl(varname: string, options: ParseEnvUrlOptions = {}) {

    const value = parseEnv(varname, options);
    if (value === undefined) {
        // Do not check the value if it is not required.
        return;
    }

    const allowedProtocols = options.allowedProtocols ?? ['http:', 'https:'];

    let url;
    try {
        url = new URL(value);
    } catch (err) {
        throw new Error(`Environment variable $${varname} must be a ${allowedProtocols.join('/')} URL without a trailing slash, but it could not be parsed: ${err.message}`);
    }

    if (/\/$/.exec(value)) {
        throw new Error(`Environment variable $${varname} must be a ${allowedProtocols.join('/')} URL without a trailing slash, but its value is ${value}`);
    }

    if (!allowedProtocols.includes(url.protocol)) {
        throw new Error(`Environment variable $${varname} must be a ${allowedProtocols.join('/')} URL without a trailing slash, but its value is ${value}`);
    }

    return value;
}

interface ParseEnvIntegerOptions extends ParseEnvOptions {
    readonly min?: number;
    readonly max?: number;
}

/**
 * Returns the value of an integer environment variable, optionally enforcing it
 * to be within the specified bounds. By default, the variable is required to be
 * set in the environment unless a default value is provided.
 */
function parseEnvInteger(varname: string, options: ParseEnvIntegerOptions = {}) {

    const value = parseEnv(varname, options);
    if (value === undefined) {
        // Do not check the value if it is not required.
        return;
    }

    const min = options.min !== undefined ? options.min : Number.MIN_SAFE_INTEGER;
    const max = options.max !== undefined ? options.max : Number.MAX_SAFE_INTEGER;

    const parsed = parseInt(value, 10);
    if (isNaN(parsed) || parsed < min || parsed > max) {
        throw new Error(`Environment variable $${varname} must be a valid integer between ${min} and ${max}`);
    }

    return parsed;
}

/**
 * Returns the value of an environment variable that is supposed to be a port
 * number. By default, the variable is required to be set in the environment
 * unless a default value is provided.
 */
function parseEnvPort(varname: string, options: ParseEnvIntegerOptions = {}) {
    return parseEnvInteger(varname, {
        ...options,
        min: 1,
        max: 65535
    });
}
