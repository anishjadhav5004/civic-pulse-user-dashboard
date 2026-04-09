import { IsLatitude, IsLongitude, IsNotEmpty, IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
  CRITICAL = 'CRITICAL',
}

export class Attachment {
  @ApiProperty({ example: 'https://s3.bucket/path/to/image.jpg' })
  @IsNotEmpty()
  @IsString()
  fileUrl: string;

  @ApiPropertyOptional({ example: 'image/jpeg' })
  @IsOptional()
  @IsString()
  fileType?: string;

  @ApiPropertyOptional({ example: 1024 })
  @IsOptional()
  @IsNumber()
  fileSizeKb?: number;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  isThumbnail?: boolean;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  displayOrder?: number;
}
