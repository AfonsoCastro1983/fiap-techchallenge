import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { PedidoRepository } from './Pedido';
import { StatusPagamento } from '../../../shared/enums/StatusPagamento';

@Entity()
export class PagamentoRepository {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'decimal' })
    valor!: number;

    @Column({
        type: 'enum',
        enum: StatusPagamento
    })
    status!: StatusPagamento;

    @ManyToOne(() => PedidoRepository, { nullable: true })
    @JoinColumn({ name: 'pedidoId' })
    pedido!: PedidoRepository;

    @Column()
    identificador_pedido!: string;

    @Column()
    qrcode!: string;

}