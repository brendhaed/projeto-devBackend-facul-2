export declare class GerenciaPlanosController {
    private gestaoUrl;
    listarClientes(): Promise<any>;
    listarPlanos(): Promise<any>;
    atualizarPlano(id: string, body: any): Promise<any>;
    criarAssinatura(body: any): Promise<any>;
    listarAssinaturas(tipo: string): Promise<any>;
    assinaturasPorPlano(codplano: string): Promise<any>;
}
