import { InMemoryOrderRepository } from 'test/repositories/in-memory-order'
import { MarkOrderAsDeliveredUseCase } from './mark-order-as-delivered'
import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipient'
import { makeOrder } from 'test/factories/make-order'
import { UniqueEntityID } from '@/core/entities/uniques-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryOrderRepository: InMemoryOrderRepository
let inMemoryRecipientRepository: InMemoryRecipientRepository
let sut: MarkOrderAsDeliveredUseCase

describe('Mark Order as Delivered', () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    inMemoryOrderRepository = new InMemoryOrderRepository(
      inMemoryRecipientRepository,
    )
    sut = new MarkOrderAsDeliveredUseCase(inMemoryOrderRepository)
  })

  it('should be possible to mark the order as delivered.', async () => {
    const order = makeOrder({
      deliverymanId: new UniqueEntityID('deliveryman-1'),
    })

    await inMemoryOrderRepository.create(order)

    const result = await sut.execute({
      deliverymanId: 'deliveryman-1',
      orderId: order.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryOrderRepository.items[0]).toMatchObject({
      deliveryStatus: 'delivered',
    })
  })

  it('should not be possible to mark the order as delivered by another deliveryman.', async () => {
    const order = makeOrder({
      deliverymanId: new UniqueEntityID('deliveryman-2'),
    })

    await inMemoryOrderRepository.create(order)

    const result = await sut.execute({
      deliverymanId: 'deliveryman-1',
      orderId: order.id.toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
