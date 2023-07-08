import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';
import authorRoutes from './routes/Author';
import bookRoutes from './routes/Book';
const router = express();

/* Connect to MongoDB */
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info('MongoDB Atlas Connected');
        StartSever();
    })
    .catch((e) => {
        Logging.error('Unable to connect to MongoDB');
        Logging.error(e);
    });

/* Only start is the server if MongoDB connects */
const StartSever = () => {
    router.use((req, res, next) => {
        /* Log the Request */
        Logging.info(`Incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] `);

        res.on('finish', () => {
            /* Log the Response */
            Logging.info(`Outgoing -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}] `);
        });

        next();
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });

    /* Routes */
    router.use('/authors', authorRoutes);
    router.use('/books', bookRoutes);

    /* HealthCheck */
    router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));

    /* Error Handling */
    router.use((req, res, next) => {
        const error = new Error('Not found');
        Logging.error(error);
        return res.status(404).json({ message: error.message });
    });

    http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}`));
};
