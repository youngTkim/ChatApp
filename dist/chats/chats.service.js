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
exports.ChatsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const chats_document_1 = require("./chatDocument/chats.document");
const mongo_document_1 = require("../mongo/mongo.document");
let ChatsService = class ChatsService {
    constructor(chatModel, userModel) {
        this.chatModel = chatModel;
        this.userModel = userModel;
    }
    async isAuthenticated(token) {
        const found = await this.userModel.findOne({ _id: token });
        return found ? found.id : false;
    }
    async saveChat(username, chat) {
        const chatData = new this.chatModel({
            username,
            chat,
        });
        await chatData.save();
        return chatData;
    }
    async getRecentChats() {
        return (await this.chatModel.find().sort({ createdAt: -1 }).limit(30).exec()).map((data) => {
            const { username, chat, createdAt } = data;
            return {
                date: new Date('' + createdAt).toLocaleString(),
                username,
                chat,
            };
        });
    }
};
exports.ChatsService = ChatsService;
exports.ChatsService = ChatsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(chats_document_1.ChatsDocument.name)),
    __param(1, (0, mongoose_1.InjectModel)(mongo_document_1.MyDocument.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ChatsService);
//# sourceMappingURL=chats.service.js.map