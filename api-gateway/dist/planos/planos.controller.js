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
exports.PlanosController = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let PlanosController = class PlanosController {
    constructor() {
        this.baseUrl = 'http://localhost:3003/planosativos';
    }
    async verificar(codAss) {
        const { data } = await axios_1.default.get(`${this.baseUrl}/${codAss}`);
        return data;
    }
};
exports.PlanosController = PlanosController;
__decorate([
    (0, common_1.Get)(':codAss'),
    __param(0, (0, common_1.Param)('codAss')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlanosController.prototype, "verificar", null);
exports.PlanosController = PlanosController = __decorate([
    (0, common_1.Controller)('planosativos')
], PlanosController);
//# sourceMappingURL=planos.controller.js.map