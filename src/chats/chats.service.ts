import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatsDocument } from './chatDocument/chats.document';
import { ChatsType } from './chatDocument/chats.document';
import { ChatsGateway } from './chats.gateway';
import { MyDocument, MyType } from 'src/mongo/mongo.document';

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel(ChatsDocument.name) private chatModel: Model<ChatsType>,
    @InjectModel(MyDocument.name) private userModel: Model<MyType>,
  ) {}

  async isAuthenticated(token: string) {
    const found = await this.userModel.findOne({ _id: token });
    return found ? found.id : false;
  }

  async saveChat(username: string, chat: string) {
    const chatData = new this.chatModel({
      username,
      chat,
    });
    await chatData.save();
    return chatData;
  }
  async getRecentChats() {
    return (
      await this.chatModel.find().sort({ createdAt: -1 }).limit(30).exec()
    ).map((data) => {
      const { username, chat, createdAt }: any = data;
      return {
        date: new Date('' + createdAt).toLocaleString(),
        username,
        chat,
      };
    });
  }
}
// testChatsCollection() {
//   const data = new this.model({
//     chat: 'asdasd',
//   });
//   data
//     .save()
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((err) => console.log(err));
// }

// import { Injectable } from '@nestjs/common';
// // mongodb에 있는 데이터베이스 '컬렉션명'컬렉션에 대한 종속성 주입
// import { InjectModel } from '@nestjs/mongoose';
// // Model은 MongoDB 컬렉션에 대한 CRUD(Create, Read, Update, Delete) 연산을 수행할 수 있도록 다양한 메서드를 제공합니다.
// import { Model } from 'mongoose';
// import { MyDocument, MyType } from './mongo/mongo.document';

// @Injectable()
// export class AppService {
//   constructor(@InjectModel(MyDocument.name) private model: Model<MyType>) {}

//   testInsertType() {
//     const data = new this.model({
//       name: 'abcd',
//       token: 'Asdadasd',
//       online: false,
//     });
//     data.save().then((res) => {
//       console.log(res);
//     });
//   }
//   deleteOne() {
//     this.model.deleteOne({ _id: '6566f9a3baa0942bf410b3d8' }).then((res) => {
//       console.log(res);
//     });
//   }

//   select() {
//     this.model.find({}, (err, arg: Array<any>) => {
//       if (err) return;
//       arg.forEach((element: MyDocument) => {
//         console.log(element);
//       });
//     });
//   }
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
