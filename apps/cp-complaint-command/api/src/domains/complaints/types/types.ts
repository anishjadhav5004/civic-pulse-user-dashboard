// d:\civic-pulse-user-dashboard\apps\cp-complaint-command\api\src\app\complaints\types\address.ts
import { IsLatitude, IsLongitude, IsNotEmpty } from 'class-validator';

export class Address {
    @IsNotEmpty()
    @IsLatitude()
    latitude: string;

    @IsNotEmpty()
    @IsLongitude()
    longitude: string;
}

export enum Priority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
    CRITICAL = 'CRITICAL'
}