import { Injectable } from "@nestjs/common";
import { AssinaturaRepositoryORM } from "src/infrastructure/repositories/assinatura.repository.orm";

@Injectable()
export class AssinaturaService {
    constructor(
        private readonly assinaturaRepository: AssinaturaRepositoryORM
    ){}
    async confirmarPagamento(
        codigoAssinatura: number, 
        valorPago: number, 
        dataPagamento: Date
    ) {
        const assinatura =
        await this.assinaturaRepository.buscarPorCodigo(codigoAssinatura);

        if (!assinatura){
            throw new Error('Assinatura não encontrada');
        }
    

         return await this.assinaturaRepository.salvar(assinatura);
         
    }

}