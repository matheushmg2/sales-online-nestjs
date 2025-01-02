import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';

import { cloudinary, ImagesCloudinary } from '../utils/cloudinary.config';
import multer from 'multer';

import 'dotenv/config';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageEntity } from './entities/image.entity';
import { DeleteResult, Repository } from 'typeorm';
import { isUUID } from 'class-validator';

@Injectable()
export class ImagesService {
    constructor(
        @InjectRepository(ImageEntity)
        private readonly imageRepository: Repository<ImageEntity>,
    ) {}

    async handleFileUploadAll(req: Request, directory: string): Promise<any> {
        const upload = await multer({
            storage: ImagesCloudinary.getStorage(directory),
            limits: { fileSize: 10 * 1024 * 1024 },
            fileFilter: (
                req: Request,
                file: Express.Multer.File,
                callback: multer.FileFilterCallback,
            ) => {
                const allowedExtensions = ['jpg', 'jpeg', 'png'];
                const fileExtension = file.originalname
                    .split('.')
                    .pop()
                    ?.toLowerCase();

                if (!allowedExtensions.includes(fileExtension!)) {
                    return callback(null, false);
                }

                callback(null, true);
            },
        }).single('file');

        return new Promise((resolve, reject) => {
            upload(req, null, async (err: any) => {
                const { file, body } = req;

                if (err) {
                    console.error('Multer Error:', err);
                    return reject(new NotFoundException('Erro no upload'));
                }

                if (!file) {
                    return reject(
                        new NotFoundException('File is required for upload'),
                    );
                }

                resolve({ file, body });
            });
        });
    }

    handleFileUploadSingle(
        req: Request,
        directory?: string,
    ): Promise<Express.Multer.File> {
        const upload = multer({
            storage: ImagesCloudinary.getStorage(directory),
            limits: { fileSize: 10 * 1024 * 1024 },
        }).single('file');

        return new Promise((resolve, reject) => {
            upload(req, null, (err: any) => {
                if (err) {
                    return reject(new NotFoundException('Erro no upload'));
                }

                if (!req.file) {
                    return reject(
                        new NotFoundException('File is required for upload'),
                    );
                }

                resolve(req.file);
            });
        });
    }

    async findImageById(id: string): Promise<any> {
        if (!isUUID(id)) {
            throw new BadRequestException('Image Not Found');
        }

        const image = await this.imageRepository.findOne({
            where: {
                id,
            },
        });

        if (!image) {
            throw new NotFoundException('Image not found');
        }

        return image;
    }

    async create(file: Express.Multer.File) {
        if (!file) {
            throw new NotFoundException('File is required for upload');
        }

        const newImage: CreateImageDto = this.imageRepository.create({
            name: file.originalname,
            key: file.filename,
            size: file.size,
            url: file.path,
        });

        return await this.imageRepository.save(newImage);
    }

    findAll() {
        return `This action returns all images`;
    }

    findOne(id: number) {
        return `This action returns a #${id} image`;
    }

    async remove(publicId: string): Promise<any> {
        try {
            const { id, key } = await this.findImageById(publicId);

            const result = await cloudinary.uploader.destroy(key);
            if (result.result !== 'ok') {
                throw new Error(`Failed to delete image with publicId: ${key}`);
            }

            return this.imageRepository.delete({ id: id });
        } catch (error) {
            console.error('Error deleting image:', error.message);
            throw new Error('Error deleting image');
        }
    }
}
