import { describe, expect, test } from 'vitest'

import { CropType as PrismaCropType, States as PrismaStates } from '@prisma/client'
import { CropByState } from '@/domain/erm/enterprise/entities/value-objects/crop-by-state'

describe('CropByState', () => {
  test('should create a valid CropByState instance', () => {

    const props = {
      state: PrismaStates.SP,
      cropTypesWithQuantity: [
        {
          cropType: PrismaCropType.CORN,
          total: 1200,
        },
      ]
    }

    const cropByState = CropByState.create(props)

    expect(cropByState.state).toBe('SP')
    expect(cropByState.cropTypesWithQuantity[0].cropType).toBe('CORN')
    expect(cropByState.cropTypesWithQuantity[0].total).toBe(1200)
  })

  test('should allow creating with different crop types', () => {
    const cropTypes = Object.values(PrismaCropType)
    const states = Object.values(PrismaStates)
  
    for (const cropType of cropTypes) {
      for (const state of states) {
        const crop = CropByState.create({
          state: state,
          cropTypesWithQuantity: [
            {
              cropType,
              total: 500,
            },
          ]
        })
  
        expect(crop.state).toBe(state)
        expect(crop.cropTypesWithQuantity.map(cropTypesWithQuantity => cropTypesWithQuantity.cropType)).toContain(cropType)
        expect(crop.cropTypesWithQuantity[0].total).toBe(500)
      }
    }
  })
  

  test('should handle zero total', () => {
    const props = {
      state: PrismaStates.SP,
      cropTypesWithQuantity: [
        {
          cropType: PrismaCropType.CORN,
          total: 0,
        },
      ]
    }

    const cropByState = CropByState.create(props)
    expect(cropByState.cropTypesWithQuantity[0].total).toBe(0)
  })

  test('should accept negative totals (e.g., for loss scenarios)', () => {
    const props = {
      state: PrismaStates.SP,
      cropTypesWithQuantity: [
        {
          cropType: PrismaCropType.CORN,
          total: -200,
        },
      ]
    }

    const cropByState = CropByState.create(props)
    expect(cropByState.cropTypesWithQuantity[0].total).toBe(-200)
  })
})
