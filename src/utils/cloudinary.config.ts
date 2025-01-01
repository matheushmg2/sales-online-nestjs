import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import 'dotenv/config';
import { NotFoundError } from 'rxjs';
import { NotFoundException } from '@nestjs/common';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export class ImagesCloudinary {

    static getStorage(diretorio: string) {
        if (!diretorio) {
            throw new NotFoundException('Invalid. You need to name a directory!');
        }


        return new CloudinaryStorage({
            cloudinary: cloudinary,
            params: async (req, file) => {
                const fileExtension = file.originalname
                    .toLowerCase()
                    .match(/\.(png|jpg|jpeg)$/);

                if (!fileExtension) {
                    throw new NotFoundException('Invalid file type. Only images are allowed!');
                }

                const baseName = file.originalname.split('.')[0];

                return {
                    folder: diretorio,
                    public_id: baseName,
                    resource_type: 'image',
                };
            },
        });
    }
}