import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import router from './routers/index.js';
import fileUpload from 'express-fileupload';
import path from 'path';
import morgan from 'morgan';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(fileUpload());
app.use(morgan('dev'));

const uploadDir = path.join(process.cwd(), "uploads");
console.log(uploadDir)

app.use("/uploads", express.static(uploadDir));

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`server run in port ${PORT}`);
});
