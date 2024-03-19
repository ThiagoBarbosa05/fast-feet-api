import { InMemoryOrderRepository } from 'test/repositories/in-memory-order'
import { EditOrderUseCase } from './edit-order'
import { makeOrder } from 'test/factories/make-order'

let inMemoryOrderRepository: InMemoryOrderRepository
let sut: EditOrderUseCase

describe('Edit Order', () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository()
    sut = new EditOrderUseCase(inMemoryOrderRepository)
  })

  it('should be able to edit a order', async () => {
    const orderToEditCreated = makeOrder()
    await inMemoryOrderRepository.create(orderToEditCreated)

    await sut.execute({
      deliveryStatus: 'collected',
      orderId: orderToEditCreated.id.toString(),
    })

    expect(inMemoryOrderRepository.items[0]).toMatchObject({
      deliveryStatus: 'collected',
    })
  })
})
