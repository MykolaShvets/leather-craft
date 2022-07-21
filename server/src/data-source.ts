import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

import { config } from './configs';

const {
    DB_NAME, DB_HOST, DB_SCHEMA, DB_USERNAME, DB_PASSWORD,
} = config;

const dbConfig: DataSourceOptions = {
    type: 'postgres',
    host: DB_HOST,
    port: 5432,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    schema: DB_SCHEMA,
    synchronize: true,
    migrationsRun: false,
    logging: true,
    entities: ['./src/entity/**/*.ts'],
    subscribers: [],
    migrations: [],
};

export const AppDataSource = new DataSource(dbConfig);
