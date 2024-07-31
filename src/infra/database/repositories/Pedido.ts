import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ClienteRepository } from './Cliente';
import { ItemRepository } from './Item';
import { StatusPedido } from '../../../shared/enums/StatusPedido';

@Entity()
export class PedidoRepository {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    data!: Date;

    @Column({
        type: 'enum',
        enum: StatusPedido
    })
    status!: StatusPedido;

    @ManyToOne(() => ClienteRepository, { nullable: true })
    @JoinColumn({ name: 'clienteId' })
    cliente!: ClienteRepository;

    @Column({ type: 'decimal' })
    total!: number;

    @OneToMany(() => PedidoItemRepository, pedidoItem => pedidoItem.pedido)
    pedidoItems!: PedidoItemRepository[];
}

@Entity()
export class PedidoItemRepository {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => PedidoRepository, pedido => pedido.pedidoItems)
    @JoinColumn({ name: 'pedidoId' })
    pedido!: PedidoRepository;

    @ManyToOne(() => ItemRepository)
    @JoinColumn({ name: 'itemId' })
    item!: ItemRepository;

    @Column({ type: 'int' })
    quantidade!: number;

    @Column({ type: 'decimal' })
    preco!: number;
}