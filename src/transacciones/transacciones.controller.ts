import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransaccionesService } from './transacciones.service';
import { CrearTransaccioneDto } from './dto/crear-transaccione.dto';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Controller('transacciones')
export class TransaccionesController {
  constructor(
    private readonly transaccionesService: TransaccionesService,
    private readonly usuariosService: UsuariosService,
  ){}

  @Post()
  async crear(@Body() crearTransaccioneDto: CrearTransaccioneDto) {
    const usuario = await this.usuariosService.buscarPorDocumento(crearTransaccioneDto.documento)
    return this.transaccionesService.crear(crearTransaccioneDto, usuario.id);
  }

  @Get()
  obtenerTodasTransacciones(){
      return this.transaccionesService.obtenerTodasTransacciones();
  }
}
