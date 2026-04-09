import { IsString, IsNotEmpty, IsUUID, IsBoolean, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsUUID()
  @IsNotEmpty()
  complaintUid: string;

  @IsUUID()
  @IsNotEmpty()
  userUid: string;

  @IsString()
  @IsNotEmpty()
  commentText: string;

  @IsBoolean()
  @IsOptional()
  isOfficial?: boolean;

  @IsBoolean()
  @IsOptional()
  isInternal?: boolean;
}
