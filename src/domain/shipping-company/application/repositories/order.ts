import { PaginationParams } from '@/core/repositories/pagination-params'
import { Order } from '../../enterprise/entities/orders'

export interface ListManyByDeliverymanIdParams extends PaginationParams {
  deliverymanId: string
}

export abstract class OrderRepository {
  abstract create(order: Order): Promise<void>
  abstract listManyByDeliverymanId({
    deliverymanId,
    page,
  }: ListManyByDeliverymanIdParams): Promise<Order[] | null>

  abstract findById(orderId: string): Promise<Order | null>
  abstract save(order: Order): Promise<void>
  abstract delete(order: Order): Promise<void>
}
