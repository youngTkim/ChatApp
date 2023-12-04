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

interface ChatMessage {
  token: string;
  chat: string;
}

// emit 듣기  on 보내기
@WebSocketGateway(3131, {
  cors: { origin: '*' },
  method: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
})
export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private chatsService: ChatsService) {}
  @WebSocketServer()
  server: Server;
  async handleConnection(client: any) {
    console.log('ISCONNECTED!');
    this.server.emit('message', 'connect!');
  }
  async handleDisconnect(client: any) {}

  @SubscribeMessage('chat')
  async onChat(
    client: Socket,
    @MessageBody() message: { token: string; chat: string },
  ) {
    const { token, chat } = message;
    console.log(token, message);
    const authentication = await this.chatsService.isAuthenticated(token);
    console.log(token, authentication);
    if (authentication) {
      await this.chatsService.saveChat(token, chat);
      this.server.emit('chats', { username: authentication, chat: chat });
    } else {
      // client.disconnect()
    }
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
