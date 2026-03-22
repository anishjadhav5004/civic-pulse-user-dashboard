import { IsBoolean, IsEnum, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Address, Priority } from "./types";
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';


export class CreateComplaintDto {

  @ApiProperty({ example: 'CMP-12345' })
  @IsString()
  @IsNotEmpty()
  complaint_number: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsString()
  @IsNotEmpty()
  reported_by: string;

  @ApiProperty({ example: 'Pothole on Main St' })
  @IsString()
  @IsNotEmpty()
  complaint_title: string;

  @ApiProperty({ example: 'There is a massive pothole causing traffic.' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'ROAD_HAZARD' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsNotEmpty()
  visibility: boolean;

  @ApiProperty({ example: '2023-10-01T12:00:00Z' })
  @IsNotEmpty()
  @IsString()
  created_at: Date;

  @ApiProperty({ enum: Priority, example: Priority.HIGH })
  @IsNotEmpty()
  @IsEnum(Priority)
  priority: Priority;

  @ApiProperty({ type: () => Address })
  @ValidateNested()
  @Type(() => Address)
  address: Address;
}

