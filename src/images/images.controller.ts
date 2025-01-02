import {
    Controller,
    Get,
    Post,
    Param,
    Delete,
    Req,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { Request } from 'express';

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
    findImageById(@Param('id') id: string) {
        return this.imagesService.findImageById(id);
    }

    @Delete(':publicId')
    async remove(@Param('publicId') id: string) {
        await this.imagesService.remove(id);
        return `Image with publicId ${id} deleted successfully`;
    }
}
