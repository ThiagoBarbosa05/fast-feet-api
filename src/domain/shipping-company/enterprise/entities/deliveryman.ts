import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/uniques-entity-id'
import { Optional } from '@/core/types/optional'
import { Address } from './value-objects.ts/address'
import { Document } from './value-objects.ts/document'

export interface DeliverymanProps {
  name: string
  document: Document
  address: Address
  password: string
  createdAt: Date
  updatedAt?: Date | null
}

export class Deliveryman extends Entity<DeliverymanProps> {
  get name() {
    return this.props.name
  }

  get document() {
    return this.props.document
  }

  get address() {
    return this.props.address
  }

  get password() {
    return this.props.password
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(
    props: Optional<DeliverymanProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const deliveryman = new Deliveryman(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return deliveryman
  }
}
