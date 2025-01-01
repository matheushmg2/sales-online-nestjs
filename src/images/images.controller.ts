import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseInterceptors,
    UploadedFile,
    Req,
    Res,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { ImagesCloudinary } from '../utils/cloudinary.config';
import multer from 'multer';

const upload = multer({ storage: ImagesCloudinary.getStorage('Images') });

@Controller('images')
export class ImagesController {
    constructor(private readonly imagesService: ImagesService) {}

    @Post()
    async create(@Req() req: Request) {
        const file = await this.imagesService.handleFileUploadSingle(
            req,
            'Images',
        );
        return this.imagesService.create(file);
    }

    @Get()
    findAll() {
        return this.imagesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.imagesService.findOne(+id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.imagesService.remove(+id);
    }
}
