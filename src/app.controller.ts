import { Controller, Get, Delete, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post('/login')
  async login(@Body() { id, password }: { id: string; password: string }) {
    const { token, sign }: { token: string; sign: boolean } =
      await this.appService.login(id, password);
    return {
      token: token,
      sign: sign,
      socket_URI: 'http://localhost:3131',
    };
  }
  @Post()
  async signup(@Body() { id, password }: { id: string; password: string }) {
    return await this.appService.signup(id, password);
  }
}
