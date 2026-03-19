import { IsBoolean, IsEnum, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Address, Priority } from "./types";
import { Type } from 'class-transformer';


export class CreateComplaintDto {

  @IsString()
  @IsNotEmpty()
  complaint_number: string;

  @IsString()
  @IsNotEmpty()
  reported_by: string;

  @IsString()
  @IsNotEmpty()
  complaint_title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsBoolean()
  @IsNotEmpty()
  visibility: boolean;

  @IsNotEmpty()
  @IsString()
  created_at: Date;

  @IsNotEmpty()
  @IsEnum(Priority)
  priority: Priority;

  @ValidateNested()
  @Type(() => Address)
  address: Address;
}

