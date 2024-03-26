import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/uniques-entity-id'
import { Optional } from '@/core/types/optional'
import { OrderCreatedEvent } from '../events/order-created-event'
import { UpdateDeliveryStatusEvent } from '../events/update-delivery-status-event'

export type DeliveryStatus = 'waiting' | 'collected' | 'delivered' | 'returned'

export interface OrderProps {
  deliveryStatus: DeliveryStatus
  deliverymanId?: UniqueEntityID
  recipientId: UniqueEntityID
  collectedAt?: Date | null
  deliveredAt?: Date | null
  returnedAt?: Date | null
  createdAt: Date
  updatedAt?: Date | null
}

export class Order extends AggregateRoot<OrderProps> {
  get deliveryStatus() {
    return this.props.deliveryStatus
  }

  set deliveryStatus(status: DeliveryStatus) {
    this.props.deliveryStatus = status
    switch (status) {
      case 'collected':
        this.props.collectedAt = new Date()
        this.addDomainEvent(new UpdateDeliveryStatusEvent(this))
        break
      case 'delivered':
        this.props.deliveredAt = new Date()
        this.addDomainEvent(new UpdateDeliveryStatusEvent(this))
        break
      case 'returned':
        this.props.returnedAt = new Date()
        this.addDomainEvent(new UpdateDeliveryStatusEvent(this))
        break
    }
    this.touch()
  }

  get deliverymanId() {
    return this.props.deliverymanId!
  }

  set deliverymanId(deliverymanId: UniqueEntityID) {
    this.props.deliverymanId = deliverymanId
    this.touch()
  }

  get recipientId() {
    return this.props.recipientId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<OrderProps, 'createdAt'>, id?: UniqueEntityID) {
    const order = new Order({ ...props, createdAt: new Date() }, id)

    const isNewOrder = !id

    if (isNewOrder) {
      order.addDomainEvent(new OrderCreatedEvent(order))
    }

    return order
  }
}
