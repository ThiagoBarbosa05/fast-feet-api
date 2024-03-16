import { InMemoryDeliverymanRepository } from 'test/repositories/in-memory-deliveryman'
import { FetchDeliverymanUseCase } from './fetch-deliveryman'

let inMemoryDeliverymanRepository: InMemoryDeliverymanRepository
let sut: FetchDeliverymanUseCase

describe('Fetch deliveryman', () => {
  beforeEach(() => {
    inMemoryDeliverymanRepository = new InMemoryDeliverymanRepository()
    sut = FetchDeliverymanUseCase(inMemoryDeliverymanRepository)
  })
})
