import { Controller, Post, Body, Put, Param, Delete } from '@nestjs/common'
import { ProdutorRural } from './entities/produtor-rural.entity'
import { ProdutorRuralService } from './produtor-rural.service'

@Controller('produtores-rurais')
export class ProdutorRuralController {
  constructor(private readonly produtorRuralService: ProdutorRuralService) {}

  @Post()
  async create(@Body() body: any) {
    const produtor = await this.produtorRuralService.create(body)
    return produtor
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    const produtor = await this.produtorRuralService.update(id, body)
    return produtor
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.produtorRuralService.remove(id)
  }
}
