import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateKolDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly platform: string;

  @IsString()
  readonly sex: string;

  readonly categories: string[];

  @IsString()
  readonly tel: string;

  @IsString()
  readonly link: string;

  @IsString()
  readonly followers: string;

  @IsNumber()
  readonly photo: number;

  @IsNumber()
  readonly vdo: number;

  @IsString()
  readonly er: string;

}
