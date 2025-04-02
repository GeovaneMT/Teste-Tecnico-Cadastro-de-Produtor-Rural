import { Module } from '@nestjs/common'

import { JwtEncrypter } from '@/infra/cryptography/jwt-encrypter'
import { BcryptHasher } from '@/infra/cryptography/bcrypt-hasher'

import { Encrypter } from '@/domain/erm/application/cryptography/encrypter'
import { HashComparer } from '@/domain/erm/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/erm/application/cryptography/hash-generator'

@Module({
  providers: [
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: HashComparer, useClass: BcryptHasher },
    { provide: HashGenerator, useClass: BcryptHasher },
  ],
  exports: [Encrypter, HashComparer, HashGenerator],
})
export class CryptographyModule {}