import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  UnauthorizedException,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDTO } from './dto/register-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateKolDto } from './dto/create-kol.dto';
import { UpdateKolDto } from './dto/update-kol.dto';
import { ResponseError, ResponseSuccess } from 'src/common/dto/response.dto';
import { IResponse } from 'src/common/interfaces/response.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() registerDTO: RegisterUserDTO): Promise<IResponse> {
    try {
      var response = await this.userService.register(registerDTO);
      return new ResponseSuccess('register.success', response);
    } catch (error) {
      return new ResponseError('register.error', error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req): Promise<IResponse>  {
    try {
      var response = await this.userService.findByEmail(req.user.email);
      return new ResponseSuccess('profile.success', response);
    } catch (error) {
      return new ResponseError('profile.error', error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('kol/create')
  async create(@Body() createKolDto: CreateKolDto): Promise<IResponse>  {
    try {
      var response = await this.userService.create(createKolDto);
      return new ResponseSuccess('kol.create.success', response);
    } catch (error) {
      return new ResponseError('kol.create.error', error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('kol/list')
  async findAll(): Promise<IResponse> {
    try {
      var response = await this.userService.findAll();
      return new ResponseSuccess('kol.list.success', response);
    } catch (error) {
      return new ResponseError('kol.list.error', error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('kol/find/:id')
  async findOne(@Param('id') id: string): Promise<IResponse> {
    try {
      var response = await this.userService.findOne(id);
      return new ResponseSuccess('kol.find.success', response);
    } catch (error) {
      return new ResponseError('kol.find.error', error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('kol/edit/:id')
  async update(
    @Param('id') id: string,
    @Body() updateKolDto: UpdateKolDto,
  ): Promise<IResponse> {
    try {
      var response = await this.userService.update(id, updateKolDto);
      return new ResponseSuccess('kol.edit.success', response);
    } catch (error) {
      return new ResponseError('kol.edit.error', error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('kol/delete/:id')
  async remove(@Param('id') id: string): Promise<IResponse> {
    try {
      var response = await this.userService.delete(id);
      return new ResponseSuccess('kol.delete.success', response);
    } catch (error) {
      return new ResponseError('kol.delete.error', error);
    }
  }
}