import { AuthenticateAdminUseCase } from '@/domain/erm/application/use-cases/authenticate-admin'

import { makeAdmin } from 'test/factories/make-admin'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { InMemoryAdminsRepository } from 'test/repositories/in-memory-admins-repository'

let inMemoryAdminsRepository: InMemoryAdminsRepository
let fakeHasher: FakeHasher
let encrypter: FakeEncrypter

let sut: AuthenticateAdminUseCase

describe('Authenticate Admin', () => {
  beforeEach(() => {
    inMemoryAdminsRepository = new InMemoryAdminsRepository()
    fakeHasher = new FakeHasher()
    encrypter = new FakeEncrypter()

    sut = new AuthenticateAdminUseCase(
      inMemoryAdminsRepository,
      fakeHasher,
      encrypter,
    )
  })

  it('should be able to authenticate a admin', async () => {
    const admin = makeAdmin({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('123456'),
    })

    inMemoryAdminsRepository.items.push(admin)

    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })
})