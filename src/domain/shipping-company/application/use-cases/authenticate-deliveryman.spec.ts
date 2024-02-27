import { FakeHasher } from 'test/cryptography/fake-hasher'
import { InMemoryDeliverymanRepository } from 'test/repositories/in-memory-deliveryman'
import { Encrypter } from '../cryptography/encrypter'
import { FakeEncrypter } from 'test/cryptography/fake-encrypter'

let inMemoryDeliverymanRepository: InMemoryDeliverymanRepository
let fakeHasher: FakeHasher
let encrypter: FakeEncrypter
describe('Authenticate use case', () => {
  beforeEach(() => {
    inMemoryDeliverymanRepository = new InMemoryDeliverymanRepository()
    fakeHasher = new FakeHasher()
    encrypter = new FakeEncrypter()
  })

  it('', () => {})
})
