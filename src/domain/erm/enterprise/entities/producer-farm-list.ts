import { WatchedList } from '@/core/entities/watched-list'
import { ProducerFarm } from '@/domain/erm/enterprise/entities/producer-farm'

export class ProducerFarmList extends WatchedList<ProducerFarm> {
  compareItems(a: ProducerFarm, b: ProducerFarm): boolean {
    return a.farmId.equals(b.farmId)
  }
}