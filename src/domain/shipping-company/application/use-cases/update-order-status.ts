import { Either, left, right } from '@/core/either'
import { DeliveryStatus } from '../../enterprise/entities/orders'
import { OrderRepository } from '../repositories/order'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface UpdateOrderStatusUseCaseRequest {
  orderId: string
  deliveryStatus: DeliveryStatus
}

type UpdateOrderStatusUseCaseResponse = Either<ResourceNotFoundError, object>

export class UpdateOrderStatusUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({
    orderId,
    deliveryStatus,
  }: UpdateOrderStatusUseCaseRequest): Promise<UpdateOrderStatusUseCaseResponse> {
    const order = await this.orderRepository.findById(orderId)

    if (!order) {
      return left(new ResourceNotFoundError())
    }

    order.deliveryStatus = deliveryStatus

    await this.orderRepository.save(order)

    return right({})
  }
}
