/**
 * A lightweight mock of the NestJS ConfigService, designed explicitly
 * to be used outside of the NestJS runtime (like by the TypeORM CLI).
 *
 * It simply proxies `.get()` calls down to `process.env`.
 */
export class AppDataSourceConfigService {
    get<T>(key: string): T | undefined {
        const value = process.env[key];

        // Basic type coercion to match what NestJS ConfigService would normally do
        if (value !== undefined) {
            if (!isNaN(Number(value))) {
                return Number(value) as T;
            }
            if (value === 'true' || value === 'false') {
                return (value === 'true') as T;
            }
        }

        return value as T | undefined;
    }
}
