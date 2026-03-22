// d:\civic-pulse-user-dashboard\apps\cp-complaint-command\api\src\app\complaints\types\address.ts
import { IsLatitude, IsLongitude, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Address {
    @ApiProperty({ example: '37.7749' })
    @IsNotEmpty()
    @IsLatitude()
    latitude: string;

    @ApiProperty({ example: '-122.4194' })
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