
import { AppDataSourceConfigService } from './config-service.local';
import { getBaseTypeOrmConfig } from '@civic-pulse/shared-contracts';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';

// Load the local .env variables
config({ path: join(__dirname, '../../.env') });

const baseConfig = getBaseTypeOrmConfig(new AppDataSourceConfigService() as any) as DataSourceOptions;

export const AppDataSource = new DataSource({
    ...baseConfig,
    entities: [process.env.DB_ENTITIES || join(__dirname, 'entities/*{.ts,.js}')],
    migrations: [process.env.DB_MIGRATIONS || join(__dirname, 'migrations/*{.ts,.js}')],
});
