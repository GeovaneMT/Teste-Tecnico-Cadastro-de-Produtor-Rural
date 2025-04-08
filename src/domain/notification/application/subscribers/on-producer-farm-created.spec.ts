import { SpyInstance } from 'vitest'

import { OnProducerCreated } from '@/domain/notification/application/subscribers/on-producer-created'

import { waitFor } from 'test/utils/wait-for'
import { makeProducer } from 'test/factories/make-producer'
import { makeProducerFarm } from 'test/factories/make-producer-farm'

import { InMemoryAdminsRepository } from 'test/repositories/in-memory-admins-repository'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'

import { InMemoryProducersRepository } from 'test/repositories/in-memory-producers-repository'
import { InMemoryFarmCropsRepository } from 'test/repositories/in-memory-farm-crops-repository'
import { InMemoryProducerFarmsRepository } from 'test/repositories/in-memory-producer-farms-repository'

import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
  SendNotificationUseCaseResponse,
} from '@/domain/notification/application/use-cases/send-notification'

let sendNotificationUseCase: SendNotificationUseCase

let inMemoryAdminsRepository: InMemoryAdminsRepository
let inMemoryNotificationsRepository: InMemoryNotificationsRepository

let inMemoryFarmCropsRepository: InMemoryFarmCropsRepository
let inMemoryProducersRepository: InMemoryProducersRepository
let inMemoryProducerFarmsRepository: InMemoryProducerFarmsRepository

let sendNotificationExecuteSpy: SpyInstance<
  [SendNotificationUseCaseRequest],
  Promise<SendNotificationUseCaseResponse>
>

describe('On Farm Created', () => {
  beforeEach(() => {

    inMemoryAdminsRepository = new InMemoryAdminsRepository()
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    
    inMemoryFarmCropsRepository = new InMemoryFarmCropsRepository()
    
    inMemoryProducerFarmsRepository = new InMemoryProducerFarmsRepository(
      inMemoryFarmCropsRepository, 
    )

    inMemoryProducersRepository = new InMemoryProducersRepository(
      inMemoryProducerFarmsRepository,
    )

    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsRepository,
    )

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnProducerCreated(inMemoryProducersRepository, sendNotificationUseCase)
  })

  it('should  send a notification when a farm is created', async () => {
    const producer = makeProducer()
    inMemoryProducersRepository.create(producer)
    sendNotificationExecuteSpy.mockClear()

    const producerFarm = makeProducerFarm({ producerId: producer.id })
    inMemoryProducerFarmsRepository.create(producerFarm)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})