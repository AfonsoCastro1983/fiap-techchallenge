import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Categoria } from '../../../shared/enums/Categoria';

@Entity()
export class ItemRepository {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nome!: string;

    @Column()
    descricao!: string;

    @Column({ type: 'decimal' })
    preco!: number;

    @Column()
    ingredientes!: string;

    @Column({
        type: 'enum',
        enum: Categoria
    })
    categoria!: Categoria;
}
