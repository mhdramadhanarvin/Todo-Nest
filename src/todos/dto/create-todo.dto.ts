import { Type } from 'class-transformer';
import { IsString, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  sequence: number;
}
