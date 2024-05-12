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

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() registerDTO: RegisterUserDTO) {
    return this.userService.register(registerDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    console.log("🚀 ~ UserController ~ getProfile ~ req:", req.user)
    // return req.email;
    const user = this.userService.findByEmail(req.user.email);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('kol/create')
  async create(@Body() createKolDto: CreateKolDto) {
    return this.userService.create(createKolDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('kol/list')
  async findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('kol/find/:id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('kol/edit/:id')
  async update(
    @Param('id') id: string,
    @Body() updateKolDto: UpdateKolDto,
  ) {
    return this.userService.update(id, updateKolDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('kol/delete/:id')
  async remove(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}