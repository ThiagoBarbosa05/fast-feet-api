import { InMemoryOrderRepository } from 'test/repositories/in-memory-order'
import { UpdateOrderStatusUseCase } from './update-order-status'
import { makeOrder } from 'test/factories/make-order'
import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipient'

let inMemoryRecipientRepository: InMemoryRecipientRepository
let inMemoryOrderRepository: InMemoryOrderRepository
let sut: UpdateOrderStatusUseCase

describe('Update Order Status', () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    inMemoryOrderRepository = new InMemoryOrderRepository(
      inMemoryRecipientRepository,
    )

    sut = new UpdateOrderStatusUseCase(inMemoryOrderRepository)
  })

  it('should be able to update order status', async () => {
    const orderToUpdateCreated = makeOrder()
    await inMemoryOrderRepository.create(orderToUpdateCreated)

    await sut.execute({
      deliveryStatus: 'collected',
      orderId: orderToUpdateCreated.id.toString(),
    })

    expect(inMemoryOrderRepository.items[0]).toMatchObject({
      deliveryStatus: 'collected',
    })
  })
})
