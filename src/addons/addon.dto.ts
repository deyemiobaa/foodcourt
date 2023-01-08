import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty, IsNumber } from 'class-validator';

export class AddonDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  category?: string;
}

export class PatchAddonDTO {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  category?: string;
}

export class AddonCategoryDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
