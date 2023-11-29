import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MyDocument, MyType } from './mongo/mongo.document';

@Injectable()
export class AppService {
  constructor(@InjectModel(MyDocument.name) private model: Model<MyType>) {}

  testInsertType() {
    const data = new this.model({
      name: 'abcd',
      token: 'Asdadasd',
      online: false,
    });
    data.save().then((res) => {
      console.log(res);
    });
  }

  select() {
    this.model.find({}, (err, arg: Array<any>) => {
      if (err) return;
      arg.forEach((element: MyDocument) => {
        console.log(element);
      });
    });
  }
}
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
