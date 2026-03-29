import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Cliente {
    @PrimaryGeneratedColumn()
    codigoCli: number;

    @Column()
    nome: string; 

    @Column()
    email: string;
}