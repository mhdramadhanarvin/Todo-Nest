import { IsOptional } from "class-validator";

export class FilterTodoDto {
    @IsOptional()
    title: string; 
}