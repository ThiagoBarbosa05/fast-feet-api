export class Address {
  private _street: string
  private _city: string
  private _state: string
  private _zipCode: string

  constructor(street: string, city: string, state: string, zipCode: string) {
    this._street = street
    this._city = city
    this._state = state
    this._zipCode = zipCode
  }

  get street() {
    return this._street
  }

  get city() {
    return this._city
  }

  get state() {
    return this._state
  }

  get zipCode() {
    return this._zipCode
  }
}
