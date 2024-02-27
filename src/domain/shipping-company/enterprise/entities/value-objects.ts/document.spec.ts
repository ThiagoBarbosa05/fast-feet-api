import { Document } from './document'

test('it should be able to create a document', () => {
  const document = new Document('16409526750')

  expect(document.validateCpf()).toBe(true)
  expect(document.toValue()).toBe('16409526750')
})
