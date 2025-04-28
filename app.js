// import express from "express";
// import dotenv from "dotenv";
// import connectDB from "./db/database.js";

// const app = express();
// dotenv.config();

// connectDB();
// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server listten at port ${PORT}`);
// });






// import express from 'express';
// import dotenv from 'dotenv';
// import connectDB from './db/database.js';
// import contactRoutes from './routes/contactRoutes.js';

// const app = express();

// dotenv.config();
// connectDB();

// // Middleware to parse JSON
// app.use(express.json());

// const PORT = process.env.PORT || 3000;

// // Contact Routes
// app.use('/api', contactRoutes);

// app.listen(PORT, () => {
//     console.log(`Server listening at port ${PORT}`);
// });








// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors'; // 🟢 CORS import
// import connectDB from './db/database.js';
// import contactRoutes from './routes/contactRoutes.js';

// const app = express();

// dotenv.config();
// connectDB();

// // 🟢 Enable CORS for frontend origin (e.g., Vite default: http://localhost:5173)
// app.use(cors({
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST'],
//     credentials: true
// }));

// // Middleware to parse JSON
// app.use(express.json());

// // Contact Routes
// app.use('/api', contactRoutes);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server listening at port ${PORT}`);
// });

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db/database.js';
import contactRoutes from './routes/contactRoutes.js';

const app = express();

dotenv.config();
connectDB();

// Enable CORS for both local and production frontend
app.use(cors({
  origin: [process.env.FRONTEND_URL, 'http://localhost:5173'],
  methods: ['GET', 'POST'],
  credentials: true
}));

// Middleware to parse JSON
app.use(express.json());

// Contact Routes
app.use('/api', contactRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
