import { SpyInstance } from 'vitest'

import { OnProducerCreated } from '@/domain/notification/application/subscribers/on-producer-created'

import { waitFor } from 'test/utils/wait-for'
import { makeProducer } from 'test/factories/make-producer'

import { InMemoryCropsRepository } from 'test/repositories/in-memory-crops-repository'
import { InMemoryFarmsRepository } from 'test/repositories/in-memory-farms-repository'
import { InMemoryAdminsRepository } from 'test/repositories/in-memory-admins-repository'
import { InMemoryProducersRepository } from 'test/repositories/in-memory-producers-repository'
import { InMemoryFarmCropsRepository } from 'test/repositories/in-memory-farm-crops-repository'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { InMemoryProducerFarmsRepository } from 'test/repositories/in-memory-producer-farms-repository'

import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
  SendNotificationUseCaseResponse,
} from '@/domain/notification/application/use-cases/send-notification'

let inMemoryProducerFarmsRepository: InMemoryProducerFarmsRepository
let inMemoryProducersRepository: InMemoryProducersRepository
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let inMemoryAdminsRepository: InMemoryAdminsRepository
let inMemoryCropsRepository: InMemoryCropsRepository
let inMemoryFarmCropsRepository: InMemoryFarmCropsRepository
let inMemoryFarmsRepository: InMemoryFarmsRepository
let sendNotificationUseCase: SendNotificationUseCase

let sendNotificationExecuteSpy: SpyInstance<
  [SendNotificationUseCaseRequest],
  Promise<SendNotificationUseCaseResponse>
>

describe('On Producer Created', () => {
  beforeEach(() => {

    inMemoryCropsRepository = new InMemoryCropsRepository()
    inMemoryAdminsRepository = new InMemoryAdminsRepository()
    inMemoryFarmCropsRepository = new InMemoryFarmCropsRepository()
    inMemoryProducerFarmsRepository = new InMemoryProducerFarmsRepository()
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    
    inMemoryFarmsRepository = new InMemoryFarmsRepository(
      inMemoryCropsRepository, 
      inMemoryFarmCropsRepository, 
      inMemoryProducersRepository
    )

    inMemoryProducersRepository = new InMemoryProducersRepository(
      inMemoryCropsRepository,
      inMemoryFarmsRepository,
      inMemoryFarmCropsRepository,
      inMemoryProducerFarmsRepository,
    )

    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsRepository,
    )

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnProducerCreated(inMemoryAdminsRepository, sendNotificationUseCase)
  })

  it('should  send a notification when an producer is created', async () => {
    const producer = makeProducer()

    inMemoryProducersRepository.create(producer)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})