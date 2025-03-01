import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import router from './routers/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`server run in port ${PORT}`);
});