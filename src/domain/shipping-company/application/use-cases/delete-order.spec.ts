import { InMemoryOrderRepository } from 'test/repositories/in-memory-order'
import { DeleteOrderUseCase } from './delete-order'
import { makeOrder } from 'test/factories/make-order'

let inMemoryOrderRepository: InMemoryOrderRepository
let sut: DeleteOrderUseCase

describe('Delete an order', () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository()
    sut = new DeleteOrderUseCase(inMemoryOrderRepository)
  })

  it('should be able to delete an order', async () => {
    const order = makeOrder()

    inMemoryOrderRepository.create(order)

    await sut.execute({ orderId: order.id.toString() })

    expect(inMemoryOrderRepository.items).toHaveLength(0)
  })
})
