import { Either, left, right } from '@/core/either'
import { Address } from '../../enterprise/entities/value-objects.ts/address'
import { Document } from '../../enterprise/entities/value-objects.ts/document'
import { Deliveryman } from '../../enterprise/entities/deliveryman'
import { HashGenerator } from '../cryptography/hash-generator'
import { DeliverymanRepository } from '../repositories/deliveryman'

interface RegisterDeliverymanUseCaseRequest {
  name: string
  document: Document
  password: string
  address: Address
}

type RegisterDeliverymanUseCaseResponse = Either<
  string,
  {
    deliveryman: Deliveryman
  }
>

export class RegisterDeliverymanUseCase {
  constructor(
    private hashGenerator: HashGenerator,
    private deliverymanRepository: DeliverymanRepository,
  ) {}

  async execute({
    address,
    document,
    name,
    password,
  }: RegisterDeliverymanUseCaseRequest): Promise<RegisterDeliverymanUseCaseResponse> {
    const hashedPassword = await this.hashGenerator.hash(password)
    const adminDocument = new Document(document.toString())

    if (!document.validateCpf()) {
      return left('invalid document')
    }

    const deliverymanAlreadyExists =
      await this.deliverymanRepository.findByDocument(document.toValue())

    if (deliverymanAlreadyExists) {
      return left('Deliveryman already exists.')
    }

    const deliverymanAddress = Address.create(address)

    const deliveryman = Deliveryman.create({
      address: deliverymanAddress,
      document: adminDocument,
      name,
      password: hashedPassword,
    })

    await this.deliverymanRepository.create(deliveryman)

    return right({
      deliveryman,
    })
  }
}
