import { Either, left, right } from '@/core/either'
import { DeliverymanRepository } from '../repositories/deliveryman'
import { HashComparer } from '../cryptography/hash-comparer'
import { Encrypter } from '../cryptography/encrypter'

interface AuthenticateDeliverymanUseCaseRequest {
  document: string
  password: string
}

type AuthenticateDeliverymanUseCaseResponse = Either<
  string,
  {
    accessToken: string
  }
>

export class AuthenticateDeliverymanUseCase {
  constructor(
    private deliverymanRepository: DeliverymanRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    document,
    password,
  }: AuthenticateDeliverymanUseCaseRequest): Promise<AuthenticateDeliverymanUseCaseResponse> {
    const deliveryman =
      await this.deliverymanRepository.findByDocument(document)

    if (!deliveryman) return left('Wrong credentials')

    const isPasswordValid = await this.hashComparer.compare(
      password,
      deliveryman.password,
    )

    if (!isPasswordValid) return left('Wrong credentials')

    const accessToken = await this.encrypter.encrypt({
      sub: deliveryman.id.toValue(),
    })

    return right({
      accessToken,
    })
  }
}
