import { InMemoryDeliverymanRepository } from 'test/repositories/in-memory-deliveryman'
import { RegisterDeliverymanUseCase } from './register-deliveryman'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { Address } from '../../enterprise/entities/value-objects.ts/address'
import { Document } from '../../enterprise/entities/value-objects.ts/document'
import { makeDeliveryman } from 'test/factories/make-deliveryman'

let fakeHasher: FakeHasher
let inMemoryDeliverymanRepository: InMemoryDeliverymanRepository
let sut: RegisterDeliverymanUseCase

describe('Register deliveryman', () => {
  beforeEach(() => {
    fakeHasher = new FakeHasher()
    inMemoryDeliverymanRepository = new InMemoryDeliverymanRepository()
    sut = new RegisterDeliverymanUseCase(
      fakeHasher,
      inMemoryDeliverymanRepository,
    )
  })

  it('should be able to register a deliveryman', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      document: new Document('16409526750'),
      password: 'example',
      address: Address.create({
        city: 'Rio de Janeiro',
        state: 'Rio de Janeiro',
        street: 'Rua x',
        zipCode: '28951730',
      }),
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      deliveryman: inMemoryDeliverymanRepository.items[0],
    })
  })

  it('should hash deliveryman password upon registration', async () => {
    const result = await sut.execute({
      document: new Document('16409526750'),
      address: Address.create({
        city: 'Rio de Janeiro',
        state: 'Rio de Janeiro',
        street: 'Rua x',
        zipCode: '28951730',
      }),
      name: 'John Doe',
      password: 'example',
    })

    const hashedPassword = await fakeHasher.hash('example')

    expect(result.isRight()).toBe(true)
    expect(inMemoryDeliverymanRepository.items[0].password).toEqual(
      hashedPassword,
    )
  })

  it('not should be able to register an deliveryman with invalid document.', async () => {
    const result = await sut.execute({
      document: new Document('1640952675343'),
      name: 'John Doe',
      address: Address.create({
        city: 'Rio de Janeiro',
        state: 'Rio de Janeiro',
        street: 'Rua x',
        zipCode: '28951730',
      }),
      password: 'example',
    })

    expect(result.isLeft()).toBe(true)
  })

  it('not should be able to register an deliveryman with the same document.', async () => {
    const admin = makeDeliveryman({
      document: new Document('16409526750'),
    })

    inMemoryDeliverymanRepository.items.push(admin)

    const result = await sut.execute({
      document: new Document('16409526750'),
      name: 'John Doe',
      address: Address.create({
        city: 'Rio de Janeiro',
        state: 'Rio de Janeiro',
        street: 'Rua x',
        zipCode: '28951730',
      }),
      password: 'example',
    })

    expect(result.isLeft()).toBe(true)
  })
})
