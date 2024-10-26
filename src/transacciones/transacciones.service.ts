import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrearTransaccioneDto } from './dto/crear-transaccione.dto';
import { TransaccionUsuario } from './entities/transaccion-usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransaccionesService {

    constructor(
        @InjectRepository(TransaccionUsuario)
        private readonly transaccionUsuarioRepository: Repository<TransaccionUsuario>,
        
    ) { }

    async crear(crearTransaccioneDto: CrearTransaccioneDto, id:String) {

        const tipos: Object = {
            recarga: 'ingreso',
            recepcion: 'ingreso',
            pago: 'egreso',
            envio: 'egreso',
        }

        try {
            const transaccion =  this.transaccionUsuarioRepository.create({
                ...crearTransaccioneDto,
                tipo: tipos[crearTransaccioneDto.descripcion],
                fecha: new Date().toISOString().slice(0, 10),
                usuario: { id }
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
