import { Module, OnModuleInit } from '@nestjs/common';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatsDocument, ChatsSchema } from './chatDocument/chats.document';
import { ChatsGateway } from './chats.gateway';
import { MyDocument } from 'src/mongo/mongo.document';
import { UserSchema } from 'src/mongo/mongo.document';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ChatsDocument.name, schema: ChatsSchema },
    ]),
    MongooseModule.forFeature([{ name: MyDocument.name, schema: UserSchema }]),
  ],
  controllers: [ChatsController],
  providers: [ChatsService, ChatsGateway],
})
export class ChatsModule {}
