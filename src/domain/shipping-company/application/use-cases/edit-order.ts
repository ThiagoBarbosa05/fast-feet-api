import { Either, left, right } from '@/core/either'
import { DeliveryStatus } from '../../enterprise/entities/orders'
import { OrderRepository } from '../repositories/order'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface EditOrderUseCaseRequest {
  orderId: string
  deliveryStatus: DeliveryStatus
}

type EditOrderUseCaseResponse = Either<ResourceNotFoundError, object>

export class EditOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({
    orderId,
    deliveryStatus,
  }: EditOrderUseCaseRequest): Promise<EditOrderUseCaseResponse> {
    const order = await this.orderRepository.findById(orderId)

    if (!order) {
      return left(new ResourceNotFoundError())
    }

    order.deliveryStatus = deliveryStatus

    await this.orderRepository.save(order)

    return right({})
  }
}
