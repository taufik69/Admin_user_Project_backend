import express from "express";
import compression from "compression";
import morgan from "morgan";
import {
  errorHandler,
  notFound,
} from "./shared/middlewares/error.middleware.ts";
import { globalErrorHandeler } from "./shared/utils/globalErrorhandler.utils.ts";
import { userRoute } from "./modules/user/index.ts";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Compression
app.use(compression());

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Rate limiting
// app.use("/api/", apiLimiter);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/v1/user", userRoute);

/**
 * const compression = require('compression');

// Basic usage
app.use(compression());

// Advanced configuration
app.use(compression({
  level: 6,              // Compression level (0-9)
  threshold: 1024,       // শুধু 1KB এর বড় response compress করো
  filter: (req, res) => {
    // Specific routes এর জন্য compression on/off
    if (req.path === '/api/stream') {
      return false;  // Don't compress streaming data
    }
    return compression.filter(req, res);
  }
}));
 */

// 404 handler
app.use(notFound);

// Global error handler
app.use(globalErrorHandeler);
export { app };
