import express from 'express';
import 'reflect-metadata';
import cors from 'cors';

import { config } from './configs';
import { AppDataSource } from './data-source';
import { apiRouter } from './routers';

const app = express();

const { PORT } = config;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*',
}));

app.use(apiRouter);

app.listen(PORT, async () => {
    try {
        console.log(`Server has started on port ${PORT}!!`);
        const connection = await AppDataSource.initialize();
        if (connection) {
            console.log('connected');
        }
    } catch (e: any) {
        console.log(e.message);
    }
});
