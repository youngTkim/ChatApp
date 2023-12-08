import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MyDocument, UserSchema } from './mongo/mongo.document';
import { ChatsModule } from './chats/chats.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`${process.env.MONGO_URI}`, {}),
    MongooseModule.forFeature([{ name: MyDocument.name, schema: UserSchema }]),
    ChatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
