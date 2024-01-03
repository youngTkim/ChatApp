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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongo_document_1 = require("./mongo/mongo.document");
const jsonwebtoken_1 = require("jsonwebtoken");
let AppService = class AppService {
    constructor(model) {
        this.model = model;
        this.secretKey = 'roger097';
    }
    async login(id, password) {
        if (id.length < 6 && password.length < 6) {
            throw new common_1.BadRequestException('적절한 데이터 형식이 아닙니다.');
        }
        const LoginUser = await this.model.findOne({ id, password });
        if (LoginUser === null) {
            throw new common_1.UnauthorizedException('해당하는 아이디에 맞는 비밀번호를 입력하세요.');
        }
        const _id = await LoginUser._id.toString();
        const token = this.generateToken(id, _id);
        return { token, sign: true };
    }
    async signup(id, password) {
        if (id.length < 6 && password.length < 6) {
            throw new common_1.BadRequestException('적절한 데이터 형식이 아닙니다.');
        }
        const isExisted = await this.model.findOne({ id: id });
        if (isExisted) {
            throw new common_1.BadRequestException('중복된 id를 가진 사용자가 있습니다.');
        }
        const newUser = new this.model({
            id,
            password,
            online: false,
        });
        await newUser.save();
    }
    generateToken(id, _id) {
        const payload = {
            id,
            _id,
        };
        const generated = (0, jsonwebtoken_1.sign)(payload, this.secretKey, { expiresIn: '1d' });
        return generated;
    }
    verifyToken(token) {
        let decoded = null;
        try {
            decoded = (0, jsonwebtoken_1.verify)(token, this.secretKey);
        }
        catch (err) {
            console.log(`JWT Error: ${err.message}`);
            return null;
        }
        return decoded;
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(mongo_document_1.MyDocument.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AppService);
//# sourceMappingURL=app.service.js.map