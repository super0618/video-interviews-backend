import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { VideoUploadingService } from './video-uploading.service';
import { CreateVideoUploadingDto } from './dto/create-video-uploading.dto';
import { UpdateVideoUploadingDto } from './dto/update-video-uploading.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageKitService } from '../utils/imagekit.service'

@Controller('video-uploading')
export class VideoUploadingController {
  constructor(private readonly videoUploadingService: VideoUploadingService,
    private readonly imageKitService: ImageKitService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file?: Express.Multer.File) {
    return await this.imageKitService.uploadImage(file, file.originalname)
    // this.videoUploadingService.create(createVideoUploadingDto);
  }

  @Get()
  findAll() {
    return this.videoUploadingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoUploadingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoUploadingDto: UpdateVideoUploadingDto) {
    return this.videoUploadingService.update(+id, updateVideoUploadingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoUploadingService.remove(+id);
  }
}
