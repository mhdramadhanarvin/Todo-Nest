import { Type } from 'class-transformer';
import { IsString, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateTodoDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  sequence: number;
}
