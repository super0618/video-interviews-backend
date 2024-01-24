
import { MinLength, IsMongoId, IsNumber } from 'class-validator';

export class CreateQuestionDto {
    @MinLength(6, { message: 'The question must be at least 10 characters long' })
    question: string;

    @IsNumber()
    time_duration: number;

    @IsMongoId({ message: 'Invalid created_by ID format' })
    job_id: string;
}