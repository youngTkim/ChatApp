import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatsService } from './chats.service';
import { AppService } from 'src/app.service';

// emit 듣기  on 보내기
@WebSocketGateway(3131, {
  cors: { origin: '*' },
  method: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
})
export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private chatsService: ChatsService,
    private appService: AppService,
  ) {}
  @WebSocketServer()
  server: Server;
  async handleConnection(client: Socket) {
    const token = client.handshake.headers.authorization;
    const isVerified = this.appService.verifyToken(token);
    if (!isVerified) {
      client.disconnect();
      return;
    }
    const RecentChats = await this.chatsService.getRecentChats();
    console.log('ISCONNECTED!');
    this.server.emit('message', 'connect!');
    client.emit('recentchats', RecentChats.reverse());
  }
  async handleDisconnect(client: Socket) {}

  @SubscribeMessage('chat')
  async onChat(
    client: Socket,
    @MessageBody() message: { username: string; chat: string },
  ) {
    const { username, chat } = message;
    await this.chatsService.saveChat(username, chat);
    this.server.emit('chats', { username, chat });
  }
}
// users: number = 0;
// //OnGatewayConnection를 오버라이딩
// async handleConnection() {
//   this.users++; //사용자 증가
//   this.server.emit('users', this.users);
//   console.log(this.users);
// }

// //OnGatewayDisconnect를 오버라이딩
// async handleDisconnect() {
//   this.users--; //사용자 감소
//   this.server.emit('users', this.users);
//   console.log(this.users);
// }

// async handleConnection(socket: Socket) {
//   await this.chatsService.getUserFromSocket(socket);
// }

// @SubscribeMessage('send_message')
// async listenForMessages(
//   @MessageBody() message: string,
//   @ConnectedSocket() socket: Socket,
// ) {
//   const user = await this.chatsService.getUserFromSocket(socket);
//   this.server.sockets.emit('receive_message', {
//     message,
//     user,
//   });
// }
