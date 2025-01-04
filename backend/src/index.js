import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { connectDB } from "./lib/db.js";
import logger from "./lib/logger.js";
import errorHandler from "./middleware/errorHandler.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// Middleware de sécurité
app.use(helmet());

// Configuration du rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Trop de requêtes depuis cette IP, veuillez réessayer plus tard'
});
app.use("/api/", limiter);

app.use(express.json());
app.use(cookieParser());

// Configuration CORS
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
};
app.use(cors(corsOptions));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Route de test pour Vercel
app.get('/health', (req, res) => {
    res.json({ status: 'OK', environment: process.env.NODE_ENV });
});

// Middleware de gestion des erreurs
app.use(errorHandler);

// Gestion spécifique pour Vercel
if (process.env.VERCEL) {
    // Export pour Vercel
} else {
    // Démarrage du serveur traditionnel
    server.listen(PORT, () => {
        logger.info(`Server is running on PORT: ${PORT} in ${process.env.NODE_ENV} mode`);
        connectDB();
    });
}
export default app;