import { Address } from './address'

test('it should be able to create an address', () => {
  const address = Address.create({
    city: 'Rio de Janeiro',
    state: 'Rio de Janeiro',
    street: 'Rua x',
    zipCode: '28951-730',
  })

  expect(address.city).toBe('Rio de Janeiro')
})
