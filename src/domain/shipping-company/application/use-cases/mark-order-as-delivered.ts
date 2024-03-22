import { Either, left, right } from '@/core/either'
import { OrderRepository } from '../repositories/order'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

export interface MarkOrderAsDeliveredUseCaseRequest {
  deliverymanId: string
  orderId: string
}

type MarkOrderAsDeliveredUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  object
>

export class MarkOrderAsDeliveredUseCase {
  constructor(private ordersRepository: OrderRepository) {}

  async execute({
    deliverymanId,
    orderId,
  }: MarkOrderAsDeliveredUseCaseRequest): Promise<MarkOrderAsDeliveredUseCaseResponse> {
    const orderDelivered = await this.ordersRepository.findById(orderId)

    if (!orderDelivered) {
      return left(new ResourceNotFoundError())
    }

    if (deliverymanId !== orderDelivered.deliverymanId.toString()) {
      return left(new NotAllowedError())
    }

    orderDelivered.deliveryStatus = 'delivered'

    await this.ordersRepository.save(orderDelivered)

    return right({})
  }
}
