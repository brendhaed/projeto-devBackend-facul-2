import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pagamento {
  @PrimaryGeneratedColumn()
  codigoPagamento: number;

  @Column()
  codigoAssinatura: number;

  @Column()
  valorPago: number;

  @Column({ type: 'timestamp' })
  dataPagamento: Date;
}
