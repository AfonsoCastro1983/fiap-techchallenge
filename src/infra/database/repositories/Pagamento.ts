import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { PedidoRepository } from './Pedido';
import { StatusPagamento } from '../../../core/domain/entities/Pagamento';

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
}