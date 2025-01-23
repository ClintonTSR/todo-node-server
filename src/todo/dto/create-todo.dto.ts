import { IsDateString, IsOptional, IsString } from "class-validator";

export class CreateTodoDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsDateString()
    @IsOptional()
    dueDate: Date;
}
