import { Either, left, right } from '@/core/either'
import { Order } from '../../enterprise/entities/orders'
import { OrderRepository } from '../repositories/order'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FetchOrdersByDeliverymanIdRequest {
  deliverymanId: string
  page: number
}

type FetchOrdersByDeliverymanIdResponse = Either<
  ResourceNotFoundError,
  {
    orders: Order[]
  }
>

export class FetchOrdersByDeliverymanId {
  constructor(private orderRepository: OrderRepository) {}

  async execute({
    deliverymanId,
    page,
  }: FetchOrdersByDeliverymanIdRequest): Promise<FetchOrdersByDeliverymanIdResponse> {
    const orders = await this.orderRepository.listManyByDeliverymanId({
      page,
      deliverymanId,
    })

    if (!orders) {
      return left(new ResourceNotFoundError())
    }

    if (orders.length <= 0) {
      return left(new ResourceNotFoundError())
    }

    return right({
      orders,
    })
  }
}
