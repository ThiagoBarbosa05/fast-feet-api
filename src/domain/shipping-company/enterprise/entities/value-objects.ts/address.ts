import { ValueObject } from '@/core/entities/value-objects'
import { Optional } from '@/core/types/optional'

export interface AddressProps {
  street: string
  city: string
  state: string
  zipCode: string
  createdAt: Date | null
  updatedAt?: Date
}

export class Address extends ValueObject<AddressProps> {
  get street() {
    return this.props.street
  }

  get city() {
    return this.props.city
  }

  get state() {
    return this.props.state
  }

  get zipCode() {
    return this.props.zipCode
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: Optional<AddressProps, 'createdAt'>) {
    const address = new Address({
      ...props,
      createdAt: new Date(),
    })

    return address
  }
}
