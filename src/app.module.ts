import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MyDocument, UserSchema } from './mongo/mongo.document';
import { ChatsModule } from './chats/chats.module';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://kooduck168:2TTZ3qVMu5NK48Wa@cluster0.uehzb8e.mongodb.net/',
      {},
    ),
    MongooseModule.forFeature([{ name: MyDocument.name, schema: UserSchema }]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ChatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
