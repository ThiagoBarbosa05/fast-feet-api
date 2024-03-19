import { InMemoryOrderRepository } from 'test/repositories/in-memory-order'
import { FetchOrdersByDeliverymanId } from './fetch-orders-by-deliveryman-id'
import { InMemoryDeliverymanRepository } from 'test/repositories/in-memory-deliveryman'
import { makeDeliveryman } from 'test/factories/make-deliveryman'
import { makeOrder } from 'test/factories/make-order'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let inMemoryOrderRepository: InMemoryOrderRepository
let inMemoryDeliverymanRepository: InMemoryDeliverymanRepository
let sut: FetchOrdersByDeliverymanId

describe('Fetch orders by deliveryman id', () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository()
    inMemoryDeliverymanRepository = new InMemoryDeliverymanRepository()
    sut = new FetchOrdersByDeliverymanId(inMemoryOrderRepository)
  })

  it('should be able to fetch orders by deliveryman id', async () => {
    const deliveryman = makeDeliveryman()

    await inMemoryDeliverymanRepository.create(deliveryman)

    for (let i = 0; i < 2; i++) {
      const orderCreated = makeOrder({
        deliverymanId: deliveryman.id,
      })
      await inMemoryOrderRepository.create(orderCreated)
    }

    const result = await sut.execute({
      deliverymanId: deliveryman.id.toString(),
      page: 1,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      orders: [
        expect.objectContaining({ deliveryStatus: 'waiting' }),
        expect.objectContaining({ deliveryStatus: 'waiting' }),
      ],
    })
  })

  it('It should not be possible to pick up orders from other deliveryman', async () => {
    const deliveryman = makeDeliveryman()

    await inMemoryDeliverymanRepository.create(deliveryman)

    for (let i = 0; i < 5; i++) {
      const orderCreated = makeOrder({
        deliverymanId: deliveryman.id,
      })
      await inMemoryOrderRepository.create(orderCreated)
    }

    const wrongDeliverymanId = 'wrongId'

    const result = await sut.execute({
      deliverymanId: wrongDeliverymanId,
      page: 1,
    })

    console.log(result.value)

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
