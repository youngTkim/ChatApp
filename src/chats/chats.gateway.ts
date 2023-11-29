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

@WebSocketGateway(8423, {
  cors: { origin: '*' },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  users: number = 0;
  constructor(private chatsService: ChatsService) {}
  //OnGatewayConnection를 오버라이딩
  async handleConnection() {
    this.users++; //사용자 증가
    this.server.emit('users', this.users);
    console.log(this.users);
  }

  //OnGatewayDisconnect를 오버라이딩
  async handleDisconnect() {
    this.users--; //사용자 감소
    this.server.emit('users', this.users);
    console.log(this.users);
  }

  @SubscribeMessage('chat')
  async onChat(client: Socket, @MessageBody() message: string) {
    console.log(client.rooms); //현재 클라이언트의 방
    console.log(message); //메시지
    client.broadcast.emit('chat', message); //전체에게 방송함
  }
}

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
