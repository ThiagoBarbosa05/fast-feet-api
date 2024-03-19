import {
  ListManyByDeliverymanIdParams,
  OrderRepository,
} from '@/domain/shipping-company/application/repositories/order'
import { Order } from '@/domain/shipping-company/enterprise/entities/orders'

export class InMemoryOrderRepository implements OrderRepository {
  public items: Order[] = []

  async create(order: Order) {
    this.items.push(order)
  }

  async listManyByDeliverymanId({
    deliverymanId,
    page,
  }: ListManyByDeliverymanIdParams) {
    const orders = this.items
      .filter((item) => item.deliverymanId.toString() === deliverymanId)
      .slice((page - 1) * 20, page * 20)

    if (!orders) return null

    return orders
  }

  async findById(orderId: string) {
    const order = this.items.find((item) => item.id.toString() === orderId)

    if (!order) return null

    return order
  }

  async save(order: Order) {
    const itemIndex = this.items.findIndex(
      (item) => item.id.toString() === order.id.toString(),
    )

    this.items[itemIndex] = order
  }

  async delete(order: Order) {
    const itemIndex = this.items.findIndex(
      (item) => item.id.toValue() === order.id.toValue(),
    )

    this.items.splice(itemIndex, 1)
  }
}
