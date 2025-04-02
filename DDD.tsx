// Domain Layer

// Entity Producer
export class Producer {
  constructor(
    public readonly id: string,
    public readonly cpfCnpj: string,
    public name: string,
    public farm: Farm,
    public cultures: Culture[],
  ) {}
}

// Entity Farm
export class Farm {
  constructor(
    public name: string,
    public city: string,
    public state: string,
    public totalArea: number,
    public agriculturalArea: number,
    public vegetationArea: number,
  ) {
    if (agriculturalArea + vegetationArea > totalArea) {
      throw new Error("Agricultural and vegetation areas cannot exceed total area.")
    }
  }
}

// Enum for Culture
export enum Culture {
  Soybean = "Soybean",
  Corn = "Corn",
  Cotton = "Cotton",
  Coffee = "Coffee",
  Sugarcane = "Sugarcane"
}

// Use Cases
export interface RegisterProducerUseCase {
  register(producer: Producer): Promise<Producer>
}

export interface UpdateProducerUseCase {
  update(id: string, data: Partial<Producer>): Promise<Producer>
}

export interface DeleteProducerUseCase {
  delete(id: string): Promise<void>
}

export interface GetIndicatorsUseCase {
  totalFarms(): Promise<number>
  totalHectares(): Promise<number>
  culturesByState(): Promise<Record<string, Record<Culture, number>>>
}

