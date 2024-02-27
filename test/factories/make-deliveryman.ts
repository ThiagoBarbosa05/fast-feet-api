import { UniqueEntityID } from '@/core/entities/uniques-entity-id'
import {
  Deliveryman,
  DeliverymanProps,
} from '@/domain/shipping-company/enterprise/entities/deliveryman'
import { Address } from '@/domain/shipping-company/enterprise/entities/value-objects.ts/address'
import { Document } from '@/domain/shipping-company/enterprise/entities/value-objects.ts/document'
import { faker } from '@faker-js/faker'
import { generateRandomCPF } from 'test/utils/generate-random-cpf'

export function makeDeliveryman(
  override: Partial<DeliverymanProps> = {},
  id?: UniqueEntityID,
) {
  const deliveryman = Deliveryman.create(
    {
      name: faker.person.fullName(),
      document: new Document(generateRandomCPF()),
      address: Address.create({
        city: faker.location.city(),
        state: faker.location.state(),
        street: faker.location.street(),
        zipCode: faker.location.zipCode(),
      }),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return deliveryman
}
