import { InMemoryDeliverymanRepository } from 'test/repositories/in-memory-deliveryman'
import { EditDeliverymanUseCase } from './edit-deliveryman'
import { makeDeliveryman } from 'test/factories/make-deliveryman'
import { Address } from '../../enterprise/entities/value-objects.ts/address'
import { UniqueEntityID } from '@/core/entities/uniques-entity-id'

let inMemoryDeliverymanRepository: InMemoryDeliverymanRepository
let sut: EditDeliverymanUseCase

describe('Edit deliveryman', () => {
  beforeEach(() => {
    inMemoryDeliverymanRepository = new InMemoryDeliverymanRepository()
    sut = new EditDeliverymanUseCase(inMemoryDeliverymanRepository)
  })

  it('should be to edit a deliveryman', async () => {
    const deliveryman = makeDeliveryman(
      {
        address: new Address('street example', 'New York', 'NY', '12354545675'),
        password: '364556',
      },
      new UniqueEntityID('deliveryman-1'),
    )
    inMemoryDeliverymanRepository.create(deliveryman)

    await sut.execute({
      deliverymanId: deliveryman.id.toString(),
      address: new Address('street x', 'London', 'LD', '34345465456'),
    })

    console.log(deliveryman.address)

    expect(deliveryman.address.city).toEqual('London')
  })
})
