import { OrderRepository } from '@/domain/shipping-company/application/repositories/order'
import { Order } from '@/domain/shipping-company/enterprise/entities/orders'

export class InMemoryOrderRepository implements OrderRepository {
  public items: Order[] = []

  async create(order: Order) {
    this.items.push(order)
  }
}
