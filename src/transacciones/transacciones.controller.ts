import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { TransaccionesService } from './transacciones.service';
import { CrearTransaccioneDto } from './dto/crear-transaccione.dto';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { ConfirmarTransaccionesDto } from './dto/confirmar-transaccione.dto';
import { JwtService } from '@nestjs/jwt';


@Controller('transacciones')
export class TransaccionesController {
    constructor(
        private readonly transaccionesService: TransaccionesService,
        private readonly usuariosService: UsuariosService,
        private readonly jwtService: JwtService,
    ) { }

    @Post()
    async crear(@Body() crearTransaccioneDto: CrearTransaccioneDto) {
        const usuario = await this.usuariosService.buscarPorDocumento(crearTransaccioneDto.documento)
        return this.transaccionesService.crear(crearTransaccioneDto, usuario.id);
    }

    @Get()
    obtenerTodasTransacciones() {
        return this.transaccionesService.obtenerTodasTransacciones();
    }

    @Get('/:documento')
    obtenerPorId( @Param('documento') documento: String){
        return this.transaccionesService.obtenerSaldoUsuario(documento)
    }

    @Post('pagar')
    async pagar(@Body() crearTransaccioneDto: CrearTransaccioneDto) {
        const usuario = await this.usuariosService.buscarPorDocumento(crearTransaccioneDto.documento)
        return this.transaccionesService.pagar(crearTransaccioneDto, usuario);
    }

    @Post('confirmar')
    async confirmar(@Body() confirmarTransaccionesDto: ConfirmarTransaccionesDto, @Headers('authorization') headeers) {
        console.log(headeers)
        let token = headeers.split(' ');
        token = token[1];
        const {documento} = await this.jwtService.verifyAsync(token, {
            secret: 'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
        });
        
        const usuario = await this.usuariosService.buscarPorDocumento(documento)
        return this.transaccionesService.confirmar(confirmarTransaccionesDto, usuario);
    }

    @Get('enviar')
    enviarEmail() {
        // const usuario = await this.usuariosService.buscarPorDocumento(crearTransaccioneDto.documento)
        // return this.transaccionesService.crear(crearTransaccioneDto, usuario.id);
    }


}
