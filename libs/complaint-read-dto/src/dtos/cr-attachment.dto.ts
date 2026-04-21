import {
  IsString,
  IsUUID,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsInt,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

/**
 * Validates an individual attachment received from  the complaint_created
 * RabbitMQ event or from a future REST endpoint.
 */
export class CrAttachmentDto {
  @ApiProperty({ example: 'b3d9c1a0-12ab-4e56-8901-abcdef123456' })
  @IsUUID()
  @IsNotEmpty()
  uid: string;

  @ApiProperty({ example: 'b3d9c1a0-12ab-4e56-8901-abcdef123456' })
  @IsUUID()
  @IsNotEmpty()
  complaintUid: string;

  @ApiProperty({ example: 'https://s3.bucket/path/to/image.jpg' })
  @IsString()
  @IsNotEmpty()
  fileUrl: string;

  @ApiPropertyOptional({ example: 'image/jpeg' })
  @IsOptional()
  @IsString()
  fileType?: string | null;

  @ApiPropertyOptional({ example: 1024 })
  @IsOptional()
  @IsNumber()
  fileSizeKb?: number | null;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  isThumbnail?: boolean;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  displayOrder?: number | null;

  @ApiProperty({ example: '2024-01-01T12:00:00Z' })
  @IsDateString()
  uploadedAt: Date;

  @ApiProperty({ example: true })
  @IsBoolean()
  isActive: boolean;
}
