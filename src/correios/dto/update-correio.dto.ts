import { PartialType } from '@nestjs/mapped-types';
import { CreateCorreioDto } from './create-correio.dto';

export class UpdateCorreioDto extends PartialType(CreateCorreioDto) {}
