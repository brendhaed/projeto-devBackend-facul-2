import { Repository } from 'typeorm';
import { Assinatura } from './entities/assinatura.entity';
export declare class GerenciaPlanosService {
    private readonly assinaturaRepository;
    constructor(assinaturaRepository: Repository<Assinatura>);
    buscarPorCliente(id: number): Promise<any>;
}
