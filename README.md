## Projeto da Disciplina de Desenvolvimento Backend
- Sistema de Controle de Planos de Operadora: O objetivo deste trabalho é desenvolver o módulo “backend” de um sistema de apoio para empresas que disponibilizem seus planos e serviços neste modelo de negócio.

## “ServicoGestao” 
Módulo principal do backend. Ele deverá ser o responsável por todas as operações de manutenção dos cadastros (clientes, planos e assinaturas) bem como pelas operações relativas à cobrança, tais como, atualizar o preço das assinaturas, atualizar a data de fidelidade etc. Sempre que uma assinatura for cadastrada, entra em período de fidelidade, pagando o valor com desconto. A fidelidade é de um ano (365 dias) a partir do dia da contratação. A 
extensão do período de fidelidade da assinatura se dá mediante a vontade do cliente a partir de uma comunicação com atendente que deve lhe ofertar um novo valor promocional e cadastrar no sistema. Podendo o período de fidelidade ser alterado a qualquer momento.

## “ServicoFaturamento” 
 Mantém uma base dados com todos os pagamentos efetuados. Sempre que receber um pagamento, deve ser armazenado no banco e um evento assíncrono deve ser gerado para notificar os interessados de que um pagamento foi efetuado.O “ServicoGestao” já é capaz de responder se uma determinada assinatura é válida ou não. Entretanto,como a demanda por esta informação é muito grande (todos os serviços periodicamente necessitam fazer essa consulta), foi projetado um microsserviço adicional visando garantir a performance do sistema. 
 
 
## “ServicoPlanosAtivos” 
Responsável por responder, de forma rápida, se uma determinada assinatura de plano é ativa ou não. Ele será demandado, tipicamente pelos serviços de terceiros, sempre que estes tiverem necessidade de confirmar se devem 
continuar respondendo ou se devem bloquear o acesso por falta de pagamento da assinatura. Cada vez que for demandado, este microsserviço deve consultar sua “cache” (esta cache pode ser em memória ou não, dependendo da decisão do desenvolvedor) interna verificando se já possui a informação relativa àquela assinatura. Caso não disponha, deverá perguntar para o “ServicoGestao” e, então, registrar em sua “cache” a informação para consultas futuras.
Tanto o “ServicoGestao” quanto o “ServicoPlanosAtivos” consomem o evento que notifica que um pagamento foi efetuado. Com essa informação o “ServicoGestao”, usando suas regras de negócio, deverá atualizar a validade da assinatura. Já o “ServicoPlanosAtivos” deverá remover da sua “cache” a entrada correspondente a assinatura paga. Desta forma, da próxima vez que for solicitado a respeito dessa assinatura, irá solicitar para o “ServicoGestao” a informação atualizada evitando inconsistências.