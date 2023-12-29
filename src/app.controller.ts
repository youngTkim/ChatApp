import { Controller, Get, Delete, Post, Body, Res, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { AppService } from './app.service';

interface loginAnswer {
  token: string;
  sign: boolean;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  async isLogged(@Req() req: Request, @Res() res: Response) {
    const token = req.headers.authorization;
    const isVerified = this.appService.verifyToken(token);
    if (!isVerified) {
      res.clearCookie('jwt', {
        domain: 'socketclient.s3-website.ap-northeast-2.amazonaws.com',
        path: '/',
        sameSite: 'none',
        secure: false,
        httpOnly: false,
      });
      return res.status(401).send('Not Authorized');
    }
    return res.status(200).send({ username: isVerified.id, sign: 'OK' });
  }
  @Post()
  async signup(@Body() { id, password }: { id: string; password: string }) {
    try {
      await this.appService.signup(id, password);
    } catch (e) {
      throw new Error(e);
    }
  }
  @Post('/login')
  async login(
    @Body() { id, password }: { id: string; password: string },
    @Res() res: Response,
  ) {
    // appService를 통해 login을 한 후에 token을 생성, token, sign으로 반환
    const Authorized = await this.appService.login(id, password);
    const { token, sign }: loginAnswer = Authorized;
    console.log(token);
    res.cookie('jwt', token, {
      domain: 'socketclient.s3-website.ap-northeast-2.amazonaws.com',
      path: '/',
      secure: false,
      httpOnly: false,
      expires: new Date(Date.now() + 24 * 3600 * 1000), // 7일 후 소멸되는 Persistent Cookie
    });
    //여기
    return res.send({
      username: id,
      sign,
    });
  }
  @Post('/logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    console.log(req);
    res.clearCookie('jwt', {
      domain: 'socketclient.s3-website.ap-northeast-2.amazonaws.com',
      path: '/',
      secure: false,
      httpOnly: false,
    });
    return res.status(200).send('로그아웃되었습니다!');
  }
}
