import { DeliverymanRepository } from '@/domain/shipping-company/application/repositories/deliveryman'
import { Deliveryman } from '@/domain/shipping-company/enterprise/entities/deliveryman'

export class InMemoryDeliverymanRepository implements DeliverymanRepository {
  public items: Deliveryman[] = []

  async create(deliveryman: Deliveryman) {
    this.items.push(deliveryman)
  }

  async findByDocument(document: string) {
    const deliveryman = this.items.find(
      (dl) => dl.document.toString() === document,
    )

    if (!deliveryman) return null

    return deliveryman
  }

  async findById(deliverymanId: string) {
    const deliveryman = this.items.find(
      (dl) => dl.id.toString() === deliverymanId,
    )

    if (!deliveryman) return null

    return deliveryman
  }

  async save(deliveryman: Deliveryman) {
    const itemIndex = this.items.findIndex(
      (item) => item.id.toString() === deliveryman.id.toString(),
    )

    this.items[itemIndex] = deliveryman
  }
}
