import {
  IsString,
  IsUUID,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsDateString,
  IsArray,
  IsNumber,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CrPriority, CrAttachment, CrStatusHistory } from './types';

/**
 * Lean denormalized complaint document published over RabbitMQ
 * and stored in MongoDB. Contains just enough data to serve
 * hot read queries without joins.
 *
 * Used in BOTH:
 *  - cp-complaint-command  → what gets emitted to the queue
 *  - cp-complaint-read     → what gets validated on arrival & persisted
 */
export class CrComplaintDto {
  // ── Core identity ───────────────────────────────────────────────────────
  @ApiProperty({ example: 'b3d9c1a0-12ab-4e56-8901-abcdef123456' })
  @IsUUID()
  @IsNotEmpty()
  uid: string;

  @ApiProperty({ example: 'CMP-00042' })
  @IsString()
  @IsNotEmpty()
  complaintNumber: string;

  // ── Complaint details ────────────────────────────────────────────────────
  @ApiProperty({ example: 'Road damage near market' })
  @IsString()
  @IsNotEmpty()
  complaintTitle: string;

  @ApiPropertyOptional({ example: 'Large pothole causing traffic hazard.' })
  @IsOptional()
  @IsString()
  description?: string | null;

  @ApiPropertyOptional({ example: 'ROAD_HAZARD' })
  @IsOptional()
  @IsString()
  category?: string | null;

  @ApiProperty({ example: 'pending' })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  visibility: boolean;

  @ApiProperty({ enum: CrPriority, example: CrPriority.HIGH })
  @IsEnum(CrPriority)
  priority: CrPriority;

  @ApiPropertyOptional({ example: '2024-01-10T12:05:00Z' })
  @IsOptional()
  @IsDateString()
  canEditUntil?: Date | null;

  // ── Reporter (denormalized to avoid join) ────────────────────────────────
  @ApiProperty({ example: 'b3d9c1a0-12ab-4e56-8901-abcdef123456' })
  @IsUUID()
  @IsNotEmpty()
  reportedBy: string;

  @ApiPropertyOptional({ example: 'John Doe' })
  @IsOptional()
  @IsString()
  username?: string | null;

  // ── Location (denormalized from address + ward tables) ───────────────────
  @ApiPropertyOptional({ example: 5 })
  @IsOptional()
  @IsNumber()
  wardNumber?: number | null;

  @ApiPropertyOptional({ example: 'Shivaji Nagar' })
  @IsOptional()
  @IsString()
  city?: string | null;

  @ApiPropertyOptional({ example: 'Maharashtra' })
  @IsOptional()
  @IsString()
  state?: string | null;

  @ApiPropertyOptional({ example: '411001' })
  @IsOptional()
  @IsString()
  pincode?: string | null;

  // ── Ward officials (denormalized from ward_dtl table) ────────────────────
  @ApiPropertyOptional({ example: 'Ram Shinde' })
  @IsOptional()
  @IsString()
  nagarsevakName?: string | null;

  @ApiPropertyOptional({ example: 'Suresh Patil' })
  @IsOptional()
  @IsString()
  wardAdmin?: string | null;

  @ApiPropertyOptional({ example: 'b3d9c1a0-12ab-4e56-8901-abcdef123456' })
  @IsOptional()
  @IsUUID()
  wardAdminUid?: string | null;

  @ApiPropertyOptional({ example: 'Prakash More' })
  @IsOptional()
  @IsString()
  mayorName?: string | null;

  // ── Timestamps ───────────────────────────────────────────────────────────
  @ApiProperty({ example: '2024-01-01T12:00:00Z' })
  @IsDateString()
  createdAt: Date;

  // ── Embedded arrays ──────────────────────────────────────────────────────
  @ApiPropertyOptional({ type: () => [CrStatusHistory] })
  @IsOptional()
  @IsArray()
  history?: CrStatusHistory[];

  @ApiPropertyOptional({ type: () => [CrAttachment] })
  @IsOptional()
  @IsArray()
  attachments?: CrAttachment[];
}
