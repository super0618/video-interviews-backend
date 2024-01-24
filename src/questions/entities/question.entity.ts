import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Job } from '../../jobs/entities/job.entity'
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Question extends Document {
    @Prop()
    question: string

    @Prop()
    time_duration: number

    //making link with job

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Job' })
    job_id: Job;
}



export const QuestionSchema = SchemaFactory.createForClass(Question);