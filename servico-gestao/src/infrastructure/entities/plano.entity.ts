import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Plano {
     @PrimaryGeneratedColumn()
    codigoPlano: number;

    @Column()
    nomePlano: string;

    @Column('decimal', { precision: 10, scale: 2 })
    custoMensal: number;

    @Column()
    dataModificacao: Date; 

    @Column()
    descricao: string;
}