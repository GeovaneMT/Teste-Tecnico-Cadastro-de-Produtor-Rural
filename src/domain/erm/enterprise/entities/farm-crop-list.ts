import { WatchedList } from '@/core/entities/watched-list'
import { FarmCrop } from '@/domain/erm/enterprise/entities/farm-crop'

export class FarmCropList extends WatchedList<FarmCrop> {
  compareItems(a: FarmCrop, b: FarmCrop): boolean {
    return a.attachmentId.equals(b.attachmentId)
  }
}