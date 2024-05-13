import { Controller, Post, UseGuards, Request, Get, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { IResponse } from 'src/common/interfaces/response.interface';
import { ResponseError, ResponseSuccess } from 'src/common/dto/response.dto';
import { GoogleAuthGuard } from './google-auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<IResponse> {
    try {
      var response = await this.authService.login(req.user);
      return new ResponseSuccess('login.success', response);
    } catch (error) {
      return new ResponseError('login.error', error);
    }
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Request() req) {
    // Initiates the Google OAuth process
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Request() req, @Res({ passthrough: true }) res: Response) {
    const { accessToken } = await this.authService.googleLogin(req);
    res.cookie('access_token', accessToken, {
      httpOnly: true,
    });
  }

  // เพิ่ม logout
  @Get('logout')
  async logout(@Request() req, @Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt token', {
      httpOnly: true,
    });
    return { message: 'Successfully logged out' };
  }

}