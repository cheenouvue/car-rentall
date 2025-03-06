import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import router from './routers/index.js';
import fileUpload from 'express-fileupload';
import path from 'path';
import fs from 'fs';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(fileUpload());

const uploadDir = path.join(process.cwd(), 'uploads')
app.use('/uploads', express.static(uploadDir));

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`server run in port ${PORT}`);
});