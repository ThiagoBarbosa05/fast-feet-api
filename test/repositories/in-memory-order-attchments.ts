import { OrderAttachmentsRepository } from '@/domain/shipping-company/application/repositories/order-attachments'
import { OrderAttachments } from '@/domain/shipping-company/enterprise/entities/order-attachments'

export class InMemoryOrderAttachmentsRepository
  implements OrderAttachmentsRepository
{
  public items: OrderAttachments[] = []

  async findManyByOrderId(orderId: string) {
    const orderAttachments = this.items.filter(
      (item) => item.orderId.toString() === orderId,
    )

    return orderAttachments
  }
}
