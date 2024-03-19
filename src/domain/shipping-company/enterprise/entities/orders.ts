import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/uniques-entity-id'
import { Optional } from '@/core/types/optional'

export type DeliveryStatus = 'waiting' | 'collected' | 'delivered' | 'returned'

export interface OrderProps {
  deliveryStatus: DeliveryStatus
  deliverymanId: UniqueEntityID
  recipientId: UniqueEntityID
  createdAt: Date
  updatedAt?: Date | null
}

export class Order extends Entity<OrderProps> {
  get deliveryStatus() {
    return this.props.deliveryStatus
  }

  set deliveryStatus(status: DeliveryStatus) {
    this.props.deliveryStatus = status
    this.touch()
  }

  get deliverymanId() {
    return this.props.deliverymanId
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

    return order
  }
}
