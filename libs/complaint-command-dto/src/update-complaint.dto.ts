import { IsBoolean, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateComplaintDto {
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ example: 'Pothole on Main St' })
  complaintTitle?: string;

  @ApiProperty({ example: 'There is a massive pothole causing traffic.' })
  @IsOptional()
  description: string;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  visibility: boolean;

  @ApiProperty({ example: '2023-10-01T12:00:00Z', required: false })
  @IsString()
  editedAt: Date;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  isEdited: boolean;
}
