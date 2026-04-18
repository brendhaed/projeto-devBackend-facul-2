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
exports.AssinaturasController = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let AssinaturasController = class AssinaturasController {
    constructor() {
        this.baseUrl = 'http://localhost:3001/gerenciaplanos/assinaturas';
    }
    async criar(body) {
        const { data } = await axios_1.default.post(this.baseUrl, body);
        return data;
    }
    async buscar(id) {
        const { data } = await axios_1.default.get(`${this.baseUrl}/${id}`);
        return data;
    }
};
exports.AssinaturasController = AssinaturasController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AssinaturasController.prototype, "criar", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AssinaturasController.prototype, "buscar", null);
exports.AssinaturasController = AssinaturasController = __decorate([
    (0, common_1.Controller)('gerenciaplanos/assinaturas')
], AssinaturasController);
//# sourceMappingURL=assinatura.controller.js.map