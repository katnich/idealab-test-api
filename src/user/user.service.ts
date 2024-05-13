import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema'; // Import UserDocument

import { RegisterUserDTO } from './dto/register-user.dto';
import { UpdateKolDto } from './dto/update-kol.dto';
import { CreateKolDto } from './dto/create-kol.dto';
import { Kol, KolDocument } from './schemas/kol.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Kol.name) private readonly kolModel: Model<KolDocument>,
  ) {} // Use UserDocument type

  async register(registerDTO: RegisterUserDTO): Promise<User> {
    const newUser = new this.userModel(registerDTO);
    return await newUser.save();
  }

  // หา user
  async findByEmail(email: string): Promise<UserDocument> {
    return await this.userModel.findOne({ email }).exec();
  }

  async create(createKolDto: CreateKolDto): Promise<Kol> {
    const result = new this.kolModel(createKolDto);
    return result.save();
  }

  async findAll(): Promise<Kol[]> {
    return this.kolModel.find().skip(0).limit(10).exec();
  }

  async findOne(id: string): Promise<Kol> {
    let data = this.kolModel.findById(id).exec();
    if(!data){
      throw new NotFoundException();
    }
    return data;
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