import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrearTransaccioneDto } from './dto/crear-transaccione.dto';
import { TransaccionUsuario } from './entities/transaccion-usuario.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuarios/entities';


@Injectable()
export class TransaccionesService {

    constructor(
        @InjectRepository(TransaccionUsuario)
        private readonly transaccionUsuarioRepository: Repository<TransaccionUsuario>,
        
    ) { }

    async crear(crearTransaccioneDto: CrearTransaccioneDto) {
        try {
            const transaccion =  this.transaccionUsuarioRepository.create({
                ...crearTransaccioneDto,
                tipo: 'ingreso',
                fecha: new Date().toISOString().slice(0, 10),
                usuario: { id: crearTransaccioneDto.usuarioId }
            });

            await this.transaccionUsuarioRepository.save(transaccion);

            return transaccion;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }

    async obtenerTodasTransacciones() {
        return this.transaccionUsuarioRepository.createQueryBuilder('transacciones')
          .leftJoinAndSelect('transacciones.usuario', 'usuario')   
          .getRawMany();
    }
}
