import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MyDocument, MyType } from './mongo/mongo.document';

import { verify, sign } from 'jsonwebtoken';

@Injectable()
export class AppService {
  private secretKey = 'roger097';
  constructor(@InjectModel(MyDocument.name) private model: Model<MyType>) {}
  async login(id: string, password: string) {
    if (id.length < 6 && password.length < 6) {
      throw new BadRequestException('적절한 데이터 형식이 아닙니다.');
    }
    const LoginUser = await this.model.findOne({ id, password });
    if (LoginUser === null) {
      throw new NotFoundException(
        '해당하는 아이디에 맞는 비밀번호를 입력하세요.',
      );
    }
    const _id = await LoginUser._id.toString();
    const token = this.generateToken(id, _id);
    return { token, sign: true };
  }

  async signup(id: string, password: string) {
    if (id.length < 6 && password.length < 6) {
      throw new BadRequestException('적절한 데이터 형식이 아닙니다.');
    }
    const isExisted = await this.model.findOne({ id: id });
    if (isExisted) {
      throw new NotFoundException('중복된 id를 가진 사용자가 있습니다.');
    }
    const newUser = new this.model({
      id,
      password,
      online: false,
    });
    await newUser.save();
    return newUser;
  }

  generateToken(id: string, _id: string) {
    const payload = {
      id,
      _id,
    };
    const generated = sign(payload, this.secretKey, { expiresIn: '1d' });
    return generated;
  }
  verifyToken(token: string) {
    let decoded = null;
    try {
      decoded = verify(token, this.secretKey);
    } catch (err) {
      console.log(`JWT Error: ${err.message}`);
      return null;
    }
    return decoded;
  }
}

// testInsertType() {
//   const data = new this.model({
//     name: 'abcd',
//     token: 'Asdadasd',
//     online: false,
//   });
//   data.save().then((res) => {
//     console.log(res);
//   });
// }

// select() {
//   this.model.find({}, (err, arg: Array<any>) => {
//     if (err) return;
//     arg.forEach((element: MyDocument) => {
//       console.log(element);
//     });
//   });
// }

// find({text :{$regex : 'ab'}}, (err, arg : Array<any>)=>{
//   if(err) return;
//   arg.forEach(  (element : 내도큐먼트) => {
//       console.log(element)
//   });
// })

//저장되는 데이터타입
// {
//   text: 'abcd',
//   num: 1234,
//   arr: [ 1, 2, 3, 4, 5 ],
//   _id: new ObjectId('6566eba06eb6d8852cada58b'),
//   createdAt: 2023-11-29T07:43:28.061Z,
//   updatedAt: 2023-11-29T07:43:28.061Z,
//   __v: 0
// }
