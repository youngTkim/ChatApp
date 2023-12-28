"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatsModule = void 0;
const common_1 = require("@nestjs/common");
const chats_controller_1 = require("./chats.controller");
const chats_service_1 = require("./chats.service");
const mongoose_1 = require("@nestjs/mongoose");
const chats_document_1 = require("./chatDocument/chats.document");
const chats_gateway_1 = require("./chats.gateway");
const mongo_document_1 = require("../mongo/mongo.document");
const mongo_document_2 = require("../mongo/mongo.document");
const app_service_1 = require("../app.service");
let ChatsModule = class ChatsModule {
};
exports.ChatsModule = ChatsModule;
exports.ChatsModule = ChatsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: chats_document_1.ChatsDocument.name, schema: chats_document_1.ChatsSchema },
            ]),
            mongoose_1.MongooseModule.forFeature([{ name: mongo_document_1.MyDocument.name, schema: mongo_document_2.UserSchema }]),
        ],
        controllers: [chats_controller_1.ChatsController],
        providers: [chats_service_1.ChatsService, app_service_1.AppService, chats_gateway_1.ChatsGateway],
    })
], ChatsModule);
//# sourceMappingURL=chats.module.js.map