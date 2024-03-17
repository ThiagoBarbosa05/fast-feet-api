import { UniqueEntityID } from '@/core/entities/uniques-entity-id'
import { Order } from '../../enterprise/entities/orders'
import { OrderRepository } from '../repositories/order'
import { Either, right } from '@/core/either'

interface CreateOrderUseCaseRequest {
  deliveryStatus: 'waiting' | 'collected' | 'delivered' | 'returned'
  deliverymanId: string
  recipientId: string
}

type CreateOrderUseCaseResponse = Either<null, object>

export class CreateOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({
    deliveryStatus,
    deliverymanId,
    recipientId,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
    const order = Order.create({
      deliverymanId: new UniqueEntityID(deliverymanId),
      recipientId: new UniqueEntityID(recipientId),
      deliveryStatus,
    })

    await this.orderRepository.create(order)

    return right({})
  }
}
