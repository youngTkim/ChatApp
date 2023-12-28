import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatsService } from './chats.service';
import { AppService } from 'src/app.service';
export declare class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private chatsService;
    private appService;
    constructor(chatsService: ChatsService, appService: AppService);
    server: Server;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    onChat(client: Socket, message: {
        username: string;
        chat: string;
    }): Promise<void>;
}
