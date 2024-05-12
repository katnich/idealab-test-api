import { Injectable } from '@nestjs/common';
import { CreateKolDto } from './dto/create-kol.dto';
import { UpdateKolDto } from './dto/update-kol.dto';
import { Kol, KolDocument } from './schemas/kol.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { promises } from 'fs';
import { NotFoundException } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class KolService {
  constructor(@InjectModel(Kol.name) private kolModel: Model<KolDocument>) {}

  async create(createKolDto: CreateKolDto): Promise<Kol> {
    const result = new this.kolModel(createKolDto);
    return result.save();
  }

  async findAll(): Promise<Kol[]> {
    return this.kolModel.find().skip(0).limit(10).exec();
  }

  async findOne(id: string): Promise<Kol> {
    return this.kolModel.findById(id).exec();
  }

  async update(
    id: string,
    updateKolDto: UpdateKolDto,
  ): Promise<Kol> {
    return this.kolModel
      .findByIdAndUpdate(id, updateKolDto, { new: true })
      .exec();
  }


  async delete(id: string): Promise<{ message: string }> {
    try {
      const result = await this.kolModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      return { message: 'Delete Successful' };
    } catch (error) {
      // Handle or transform the error as needed
      throw new InternalServerErrorException(
        'An error occurred during deletion',
      );
    }
  }
}
