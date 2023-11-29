import { Controller, Get } from '@nestjs/common';
import { ChatsService } from './chats.service';

@Controller('chats')
export class ChatsController {
  constructor(private chatService: ChatsService) {}

  // @Get()
  // AccessChats() {}
}
