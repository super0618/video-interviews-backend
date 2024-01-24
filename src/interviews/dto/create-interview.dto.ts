import { IsArray, IsString, IsNumber, IsMongoId, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';


export class CreateInterviewDto {
    @IsMongoId()
    question_id: string;

    @IsOptional()
    video_url: string;

    @IsOptional()
    @IsMongoId()
    interviewee: string;

    @IsOptional()
    @IsMongoId()
    job_id: string
}