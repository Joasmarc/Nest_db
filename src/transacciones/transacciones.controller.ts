import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransaccionesService } from './transacciones.service';
import { CrearTransaccioneDto } from './dto/crear-transaccione.dto';

@Controller('transacciones')
export class TransaccionesController {
  constructor(private readonly transaccionesService: TransaccionesService){}

  @Post()
  crear(@Body() crearTransaccioneDto: CrearTransaccioneDto) {
    return this.transaccionesService.crear(crearTransaccioneDto);
  }

  @Get()
  obtenerTodasTransacciones(){
      return this.transaccionesService.obtenerTodasTransacciones();
  }
}
