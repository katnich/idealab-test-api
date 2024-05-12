import { IsString, IsNumber, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateKolDto } from './create-kol.dto';

export class UpdateKolDto extends PartialType(CreateKolDto) {
  @IsString()
  @IsOptional()
  readonly name?: string;
  
  @IsString()
  @IsOptional()
  readonly platform?: string;

  @IsString()
  @IsOptional()
  readonly sex?: string;

  @IsString()
  @IsOptional()
  readonly categories?: string[];

  @IsString()
  @IsOptional()
  readonly tel?: string;

  @IsString()
  @IsOptional()
  readonly link?: string;

  @IsString()
  @IsOptional()
  readonly followers?: string;

  @IsNumber()
  @IsOptional()
  readonly photo?: number;

  @IsNumber()
  @IsOptional()
  readonly vdo?: number;

  @IsString()
  @IsOptional()
  readonly er?: string;

}
