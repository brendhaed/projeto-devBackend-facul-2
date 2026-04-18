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
exports.GerenciaPlanosController = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let GerenciaPlanosController = class GerenciaPlanosController {
    constructor() {
        this.gestaoUrl = 'http://localhost:3001';
    }
    async listarClientes() {
        const { data } = await axios_1.default.get(`${this.gestaoUrl}/gerenciaplanos/clientes`);
        return data;
    }
    async listarPlanos() {
        const { data } = await axios_1.default.get(`${this.gestaoUrl}/gerenciaplanos/planos`);
        return data;
    }
    async atualizarPlano(id, body) {
        const { data } = await axios_1.default.patch(`${this.gestaoUrl}/gerenciaplanos/planos/${id}`, body);
        return data;
    }
    async criarAssinatura(body) {
        const { data } = await axios_1.default.post(`${this.gestaoUrl}/gerenciaplanos/assinaturas`, body);
        return data;
    }
    async listarAssinaturas(tipo) {
        const { data } = await axios_1.default.get(`${this.gestaoUrl}/gerenciaplanos/assinaturas/${tipo}`);
        return data;
    }
    async assinaturasPorPlano(codplano) {
        const { data } = await axios_1.default.get(`${this.gestaoUrl}/gerenciaplanos/assinaturaplano/${codplano}`);
        return data;
    }
};
exports.GerenciaPlanosController = GerenciaPlanosController;
__decorate([
    (0, common_1.Get)('clientes'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GerenciaPlanosController.prototype, "listarClientes", null);
__decorate([
    (0, common_1.Get)('planos'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GerenciaPlanosController.prototype, "listarPlanos", null);
__decorate([
    (0, common_1.Patch)('planos/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GerenciaPlanosController.prototype, "atualizarPlano", null);
__decorate([
    (0, common_1.Post)('assinaturas'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GerenciaPlanosController.prototype, "criarAssinatura", null);
__decorate([
    (0, common_1.Get)('assinaturas/:tipo'),
    __param(0, (0, common_1.Param)('tipo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GerenciaPlanosController.prototype, "listarAssinaturas", null);
__decorate([
    (0, common_1.Get)('assinaturaplano/:codplano'),
    __param(0, (0, common_1.Param)('codplano')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GerenciaPlanosController.prototype, "assinaturasPorPlano", null);
exports.GerenciaPlanosController = GerenciaPlanosController = __decorate([
    (0, common_1.Controller)('gerenciaplanos')
], GerenciaPlanosController);
//# sourceMappingURL=gerenciaplanos.controller.js.map