import { Either, left, right } from '@/core/either'
import { Address } from '../../enterprise/entities/value-objects.ts/address'
import { Deliveryman } from '../../enterprise/entities/deliveryman'
import { DeliverymanRepository } from '../repositories/deliveryman'

interface EditDeliverymanUseCaseRequest {
  deliverymanId: string
  address?: Address
  password?: string
}

type EditDeliverymanUseCaseResponse = Either<
  string,
  {
    deliveryman: Deliveryman
  }
>

export class EditDeliverymanUseCase {
  constructor(private deliverymanRepository: DeliverymanRepository) {}

  async execute({
    deliverymanId,
    address,
    password,
  }: EditDeliverymanUseCaseRequest): Promise<EditDeliverymanUseCaseResponse> {
    const deliveryman = await this.deliverymanRepository.findById(deliverymanId)

    if (!deliveryman) return left('deliveryman not found.')

    if (address) {
      deliveryman.address = new Address(
        address.street,
        address.city,
        address.state,
        address.zipCode,
      )
    }

    if (password && password !== deliveryman.password) {
      deliveryman.password = password
    }

    await this.deliverymanRepository.save(deliveryman)

    return right({
      deliveryman,
    })
  }
}
