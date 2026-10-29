import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import api from './routes/api.js';

const required = ['MONGODB_URI', 'SESSION_SECRET'];
const missing = required.filter(key => !process.env[key]);
if (missing.length) {
  console.error(`Missing required environment variables: ${missing.join(', ')}`);
  process.exit(1);
}

const app = express();
const configuredClientOrigin = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(helmet());

function isLocalDevelopmentOrigin(origin) {
  if (process.env.NODE_ENV === 'production' || !origin) return false;
  try {
    const { protocol, hostname } = new URL(origin);
    if (protocol !== 'http:' && protocol !== 'https:') return false;
    const host = hostname.toLowerCase();
    return host === 'localhost' || host === '127.0.0.1' || host === '[::1]' ||
      /^10(?:\.\d{1,3}){3}$/.test(host) ||
      /^192\.168(?:\.\d{1,3}){2}$/.test(host) ||
      /^172\.(?:1[6-9]|2\d|3[01])(?:\.\d{1,3}){2}$/.test(host);
  } catch {
    return false;
  }
}

if (process.env.NODE_ENV !== 'production') {
  app.use(cors({
    origin(origin, callback) {
      callback(null, !origin || origin === configuredClientOrigin || isLocalDevelopmentOrigin(origin));
    }
  }));
}

app.use(express.json({ limit: '32kb' }));
app.use('/api/v1', api);
app.use('/api/v1', (req, res) => res.status(404).json({ error: 'Route not found.' }));

const clientDist = resolve(dirname(fileURLToPath(import.meta.url)), '../../client/dist');
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(clientDist));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) return next();
    res.sendFile(resolve(clientDist, 'index.html'), error => {
      if (error) next(error);
    });
  });
}
app.use((req, res) => res.status(404).json({ error: 'Route not found.' }));

const port = Number(process.env.PORT) || 5000;
async function connectToMongo() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected.');
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    const retry = setTimeout(connectToMongo, 10_000);
    retry.unref();
  }
}

const server = app.listen(port, () => {
  console.log(`AI Mystery Room listening on port ${port}`);
  connectToMongo();
});
server.on('error', error => {
  console.error(`AI Mystery Room could not listen on port ${port}: ${error.message}`);
  process.exit(1);
});
