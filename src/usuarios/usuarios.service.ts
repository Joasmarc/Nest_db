import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UsuarioInterface } from './interfaces/usuarios.interface';
import { v4 as uuid } from 'uuid';
import { EditarUsuarioDto, CrearUsuarioDto } from './dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { TransaccionUsuario, Usuario } from './entities/index';
import { Repository } from 'typeorm';

@Injectable()
export class UsuariosService {

    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,

        @InjectRepository(TransaccionUsuario)
        private readonly transaccionUsuarioRepository: Repository<TransaccionUsuario>,
    ){}

    buscarTodos(){
        return this.usuarioRepository.find({});
    }

    async buscarPorId(id: String){
        const usuario = await this.usuarioRepository.findOneBy({id});

        if (!usuario) throw new NotFoundException('Usuario no existe en nuestros registros');

        return usuario;
    }

    async crear( crearUsuarioDto: CrearUsuarioDto){
        try {
            const usuario = this.usuarioRepository.create(crearUsuarioDto);

            await this.usuarioRepository.save(usuario);

            return usuario;    
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }

    async actualizar(editarUsuarioDto: EditarUsuarioDto){
        const usuario = await this.usuarioRepository.preload({
            id: editarUsuarioDto.id,
            ...editarUsuarioDto,
        })

        if ( !usuario ) throw new NotFoundException('Id no existe en nuestros registros')

        return this.usuarioRepository.save(usuario)
    }

}
