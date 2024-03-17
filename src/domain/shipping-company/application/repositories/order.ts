import { Order } from '../../enterprise/entities/orders'

export abstract class OrderRepository {
  abstract create(order: Order): Promise<void>
}
