import { Deliveryman } from '../../enterprise/entities/deliveryman'

export abstract class DeliverymanRepository {
  abstract create(deliveryman: Deliveryman): Promise<void>
  abstract findByDocument(document: string): Promise<Deliveryman | null>
  abstract findById(deliverymanId: string): Promise<Deliveryman | null>
  abstract save(deliveryman: Deliveryman): Promise<void>
}
