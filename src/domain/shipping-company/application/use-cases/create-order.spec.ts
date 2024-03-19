import { InMemoryOrderRepository } from 'test/repositories/in-memory-order'
import { CreateOrderUseCase } from './create-order'

let inMemoryOrderRepository: InMemoryOrderRepository
let sut: CreateOrderUseCase

describe('Create an order', () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository()
    sut = new CreateOrderUseCase(inMemoryOrderRepository)
  })

  it('should be able to create an order', async () => {
    const result = await sut.execute({
      deliverymanId: '1',
      recipientId: '2',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryOrderRepository.items[0]).toEqual(result.value?.order)
  })
})
