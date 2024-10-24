import { Injectable, NotFoundException } from '@nestjs/common';
import { Usuario } from './interfaces/usuarios.interface';
import { v4 as uuid } from 'uuid';
import { EditarUsuarioDto, CrearUsuarioDto } from './dtos';

@Injectable()
export class UsuariosService {

    private usuarios: Usuario[] = [
        {
            id: uuid(),
            nombre: 'jose',
            apellido: 'Quijada',
        },
        {
            id: uuid(),
            nombre: 'pedro',
            apellido: 'serrano',
        },
        {
            id: uuid(),
            nombre: 'maria',
            apellido: 'ventana'
        },
    ];

    buscarTodos(){
        return this.usuarios;
    }

    buscarPorId(id: String){
        const usuario = this.usuarios.find( usuario => usuario.id === id)

        if (!usuario) throw new NotFoundException('El id no existe en nuestros registros')

        return usuario
    }

    crear( {nombre, apellido}: CrearUsuarioDto){
        const usuario : Usuario = {
            id: uuid(),
            nombre,
            apellido,
        }

        return usuario;
    }

    actualizar(editarUsuarioDto: EditarUsuarioDto){

        let usuarioDB = this.buscarPorId(editarUsuarioDto.id)

        this.usuarios = this.usuarios.map((usuario)=>{
            if (usuario.id === editarUsuarioDto.id){
                usuarioDB = {
                    ...usuarioDB,
                    ...editarUsuarioDto,
                    id: editarUsuarioDto.id,
                }
                return usuarioDB;
            }

            return usuario;
        })

        return this.usuarios
    }

}
