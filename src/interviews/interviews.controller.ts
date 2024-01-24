import { Controller, Get, Post, Body, Patch, UseInterceptors, UploadedFile, Param, Delete, UseGuards, Request, ParseFilePipeBuilder } from '@nestjs/common';
import { InterviewsService } from './interviews.service';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { UpdateInterviewDto } from './dto/update-interview.dto';

import { FileInterceptor } from '@nestjs/platform-express';
// JWT auth guard
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
//Role Guard
import { RolesGuard } from '../auth/role-base-auth/role.guard';
import { Roles } from '../auth/role-base-auth/roles.decorator'
import { ROLE } from '../users/enums/users.enums'

@Controller('interviews')
export class InterviewsController {
  constructor(private readonly interviewsService: InterviewsService,
  ) { }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.INTERVIEWEE)
  @UseInterceptors(FileInterceptor('video'))
  async create(@UploadedFile(
    new ParseFilePipeBuilder().addFileTypeValidator({
      fileType: 'video/*',
    })
      .addMaxSizeValidator({
        maxSize: 3 * 1024 * 1024 //// 3 MB in bytes
      })
      .build(),
  ) video: Express.Multer.File, @Body() createInterviewDto: CreateInterviewDto, @Request() req) {
    createInterviewDto.interviewee = req.user.id
    return this.interviewsService.create(createInterviewDto, video);
  }

  @Get()
  findAll() {
    return this.interviewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interviewsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInterviewDto: UpdateInterviewDto) {
    return this.interviewsService.update(id, updateInterviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.interviewsService.remove(id);
  }

  @Get('user/all-interviews/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.INTERVIEWER)
  allInterviewsfor(@Request() req, @Param('id') id: string) {
    return this.interviewsService.interviwee(id);
  }
}
