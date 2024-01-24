import { Injectable, ConflictException, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Question } from './entities/question.entity'
import { Model } from 'mongoose';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
  constructor(@InjectModel('Question') private QuestionModel: Model<Question>) { }

  async create(createQuestionDto: CreateQuestionDto) {
    return ((await this.QuestionModel.create(createQuestionDto))).populate({
      path: 'job_id'
    });
  }

  async findAll() {
    let questions = await this.QuestionModel.find().populate({
      path: 'job_id'
    })
    if (questions.length == 0) {
      throw new NotFoundException('questions not found')
    }
    return questions
  }

  async findOne(id: string) {
    let question = await this.QuestionModel.findById(id)
      .populate({
        path: 'job_id'
      })
    if (!question) {
      throw new NotFoundException('question not found');
    }
    return question
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    let question = await this.QuestionModel.findById(id)
    if (!question) {
      throw new NotFoundException('question not found');
    }
    return await this.QuestionModel.findByIdAndUpdate(
      id,
      updateQuestionDto,
      { new: true }
    ).populate({
      path: 'job_id',
    })
  }

  async remove(id: string) {
    let question = await this.QuestionModel.findById(id)
    if (!question) {
      throw new NotFoundException('question not found');
    }
    return await this.QuestionModel.findByIdAndRemove(id).populate({
      path: 'job_id',
    })
  }

  async jobQuestions(id: string) {
    let questions = await this.QuestionModel.find({
      job_id: id
    }).populate({
      path: 'job_id',
    })
    if (!questions) {
      throw new NotFoundException('questions not found');
    }
    return questions
  }
}






