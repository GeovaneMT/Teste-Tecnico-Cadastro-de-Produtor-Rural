import { describe, expect, test } from 'vitest'

import { CropType as PrismaCropType } from '@prisma/client'
import { CropByState } from '@/domain/erm/enterprise/entities/value-objects/crop-by-state'

describe('CropByState', () => {
  test('should create a valid CropByState instance', () => {

    const props = {
      state: "SP",
      cropType: PrismaCropType.CORN,
      total: 1200,
    }

    const cropByState = CropByState.create(props)

    expect(cropByState.state).toBe('SP')
    expect(cropByState.cropType).toBe('CORN')
    expect(cropByState.total).toBe(1200)
  })

  test('should allow creating with different crop types', () => {
    const cropTypes = Object.values(PrismaCropType)

    for (const cropType of cropTypes) {
      const crop = CropByState.create({
        state: 'MG',
        cropType,
        total: 500,
      })

      expect(crop.state).toBe('MG')
      expect(crop.cropType).toBe(cropType)
      expect(crop.total).toBe(500)
    }
  })

  test('should handle zero total', () => {
    const crop = CropByState.create({
      state: 'BA',
      cropType: PrismaCropType.SOYBEANS,
      total: 0,
    })

    expect(crop.total).toBe(0)
  })

  test('should accept negative totals (e.g., for loss scenarios)', () => {
    const crop = CropByState.create({
      state: 'RS',
      cropType: PrismaCropType.SUGARCANE,
      total: -200,
    })

    expect(crop.total).toBe(-200)
  })
})
