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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    async isLogged(req, res) {
        const token = req.headers.authorization;
        const isVerified = this.appService.verifyToken(token);
        if (!isVerified) {
            res.clearCookie('jwt', {
                domain: 'localhost',
                path: '/',
                sameSite: 'none',
                secure: false,
                httpOnly: false,
            });
            return res.status(401).send('Not Authorized');
        }
        return res.status(200).send({ username: isVerified.id, sign: 'OK' });
    }
    async signup({ id, password }) {
        try {
            await this.appService.signup(id, password);
        }
        catch (e) {
            throw new Error(e);
        }
    }
    async login({ id, password }, res) {
        const Authorized = await this.appService.login(id, password);
        const { token, sign } = Authorized;
        console.log(token);
        res.cookie('jwt', token, {
            domain: 'localhost',
            path: '/',
            secure: false,
            httpOnly: false,
            expires: new Date(Date.now() + 24 * 3600 * 1000),
        });
        return res.send({
            username: id,
            sign,
        });
    }
    async logout(req, res) {
        console.log(req);
        res.clearCookie('jwt', {
            domain: 'localhost',
            path: '/',
            secure: false,
            httpOnly: false,
        });
        return res.status(200).send('로그아웃되었습니다!');
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "isLogged", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('/logout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "logout", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map