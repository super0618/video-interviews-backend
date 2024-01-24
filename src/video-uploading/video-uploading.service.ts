import { Injectable } from '@nestjs/common';
import { CreateVideoUploadingDto } from './dto/create-video-uploading.dto';
import { UpdateVideoUploadingDto } from './dto/update-video-uploading.dto';

@Injectable()
export class VideoUploadingService {
  create(createVideoUploadingDto: CreateVideoUploadingDto) {
    return 'This action adds a new videoUploading';
  }

  findAll() {
    return `This action returns all videoUploading`;
  }

  findOne(id: number) {
    return `This action returns a #${id} videoUploading`;
  }

  update(id: number, updateVideoUploadingDto: UpdateVideoUploadingDto) {
    return `This action updates a #${id} videoUploading`;
  }

  remove(id: number) {
    return `This action removes a #${id} videoUploading`;
  }
}
