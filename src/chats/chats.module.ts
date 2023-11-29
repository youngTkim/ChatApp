import { Module } from '@nestjs/common';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatsDocument, ChatsSchema } from './chatDocument/chats.document';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ChatsDocument.name, schema: ChatsSchema },
    ]),
  ],
  controllers: [ChatsController],
  providers: [ChatsService],
})
export class ChatsModule {}
