"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const chats_service_1 = require("./chats.service");
const app_service_1 = require("../app.service");
let ChatsGateway = class ChatsGateway {
    constructor(chatsService, appService) {
        this.chatsService = chatsService;
        this.appService = appService;
    }
    async handleConnection(client) {
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
    async handleDisconnect(client) { }
    async onChat(client, message) {
        const { username, chat } = message;
        await this.chatsService.saveChat(username, chat);
        this.server.emit('chats', { username, chat });
    }
};
exports.ChatsGateway = ChatsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatsGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('chat'),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatsGateway.prototype, "onChat", null);
exports.ChatsGateway = ChatsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(3131, {
        cors: { origin: '*' },
        method: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    }),
    __metadata("design:paramtypes", [chats_service_1.ChatsService,
        app_service_1.AppService])
], ChatsGateway);
//# sourceMappingURL=chats.gateway.js.map