const logger = require('./logger');

const defaultOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
];

function getAllowedOrigins() {
  const origins = [...defaultOrigins];
  if (process.env.CLIENT_URL) {
    process.env.CLIENT_URL.split(',').forEach((url) => {
      const clean = url.trim().replace(/\/+$/, '');
      if (clean && !origins.includes(clean)) {
        origins.push(clean);
      }
    });
  }
  return origins;
}

const originValidator = (origin, callback) => {
  // Allow requests with no origin (e.g. Electron Tracker app, curl, server-to-server)
  if (!origin) return callback(null, true);

  const allowed = getAllowedOrigins();
  const cleanOrigin = origin.replace(/\/+$/, '');

  if (allowed.includes(cleanOrigin) || allowed.includes('*')) {
    return callback(null, true);
  }

  // Support Vercel and Render deployments automatically
  if (cleanOrigin.endsWith('.vercel.app') || cleanOrigin.endsWith('.onrender.com')) {
    return callback(null, true);
  }

  return callback(null, true);
};

const corsOptions = {
  origin: originValidator,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
};

module.exports = { corsOptions, originValidator, getAllowedOrigins };
