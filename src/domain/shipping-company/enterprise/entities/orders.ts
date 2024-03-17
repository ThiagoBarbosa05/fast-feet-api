import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/uniques-entity-id'
import { Optional } from '@/core/types/optional'

export interface OrderProps {
  deliveryStatus: 'waiting' | 'collected' | 'delivered' | 'returned'
  deliverymanId: UniqueEntityID
  recipientId: UniqueEntityID
  createdAt: Date
  updatedAt?: Date | null
}

export class Order extends Entity<OrderProps> {
  get deliveryStatus() {
    return this.props.deliveryStatus
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: Optional<OrderProps, 'createdAt'>, id?: UniqueEntityID) {
    const order = new Order({ ...props, createdAt: new Date() }, id)

    return order
  }
}
