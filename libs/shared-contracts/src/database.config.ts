import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const getBaseTypeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
    type: configService.get<string>('DB_TYPE') as 'postgres' | 'mongodb',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    synchronize: configService.get<boolean>('BB_synchronize'),
    logging: configService.get<string>('NODE_ENV') !== 'production',

    // This is the magic flag that lets each microservice load its own entities
    autoLoadEntities: true,
});

export const sharedTypeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: getBaseTypeOrmConfig,
};
