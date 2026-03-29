import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Unique } from 'typeorm';

@Unique(['codigoPlano', 'codigoCli'])

@Entity()
export class Assinatura {

  @PrimaryGeneratedColumn()
  codigoAssinatura: number; 

  @Column()
  codigoPlano: number;

  @Column()
  codigoCli: number;

  @Column('float')
  custoFinal: number;

  @Column()
  descricao: string;

  @Column()
  inicioFidelidade: Date;

  @Column()
  fimFidelidade: Date;

  @Column()
  dataUltimoPagamento: Date;
}