/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { ChatsDocument } from './chatDocument/chats.document';
import { ChatsType } from './chatDocument/chats.document';
import { MyType } from 'src/mongo/mongo.document';
export declare class ChatsService {
    private chatModel;
    private userModel;
    constructor(chatModel: Model<ChatsType>, userModel: Model<MyType>);
    isAuthenticated(token: string): Promise<any>;
    saveChat(username: string, chat: string): Promise<import("mongoose").Document<unknown, {}, ChatsType> & ChatsDocument & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getRecentChats(): Promise<{
        date: string;
        username: any;
        chat: any;
    }[]>;
}
