import { SpyInstance } from 'vitest'

import { OnAdminCreated } from '@/domain/notification/application/subscribers/on-admin-created'

import { waitFor } from 'test/utils/wit-for'
import { makeAdmin } from 'test/factories/make-admins'
import { InMemoryAdminsRepository } from 'test/repositories/in-memory-admins-repository'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'

import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
  SendNotificationUseCaseResponse,
} from '@/domain/notification/application/use-cases/send-notification'

let inMemoryAdminsRepository: InMemoryAdminsRepository
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sendNotificationUseCase: SendNotificationUseCase

let sendNotificationExecuteSpy: SpyInstance<
  [SendNotificationUseCaseRequest],
  Promise<SendNotificationUseCaseResponse>
>

describe('On Admin Created', () => {
  beforeEach(() => {
    inMemoryAdminsRepository = new InMemoryAdminsRepository()
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sendNotificationUseCase = new SendNotificationUseCase(inMemoryNotificationsRepository)

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnAdminCreated(inMemoryAdminsRepository, sendNotificationUseCase)
  })

  it('should  send a notification when an admin is created', async () => {
    const admin = makeAdmin()
    
    inMemoryAdminsRepository.create(admin)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})