import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { EditarUsuarioDto, CrearUsuarioDto } from './dtos';

@Controller('usuarios')
export class UsuariosController {

    constructor(
        private readonly usuariosService: UsuariosService
    ){}

    @Get()
    obtenerTodosUsuarios(){
        return this.usuariosService.buscarTodos();
    }

    @Get('/:id')
    obtenerPorId( @Param('id', ParseUUIDPipe) id: String,  ){
        return this.usuariosService.buscarPorId(id)
    }

    @Post()
    crearUsuario(@Body() crearUsuarioDto: CrearUsuarioDto){
        return this.usuariosService.crear(crearUsuarioDto);
    }

    @Patch()
    editarUsuario(@Body() editarUsuarioDto: EditarUsuarioDto){
        return this.usuariosService.actualizar(editarUsuarioDto);
    }
}
