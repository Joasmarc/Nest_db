import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrearTransaccioneDto } from './dto/crear-transaccione.dto';
import { TransaccionUsuario } from './entities/transaccion-usuario.entity';
import { Repository } from 'typeorm';
import { TransaccionesInterface } from './interfaces/transacciones.interface';

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


    async obtenerSaldoUsuario(documento: String) {
        let saldo = 0;
        const registros: TransaccionesInterface[] = await this.transaccionUsuarioRepository.createQueryBuilder('transacciones')
        .leftJoinAndSelect('transacciones.usuario', 'usuario')
        .where(`usuario.documento = ${documento}`)
        .getRawMany();

        let mensaje = '';

        if (registros.length == 0){
            mensaje = 'Usuario no existe';
        } else {
            for (let index = 0; index < registros.length; index++) {
                const element = registros[index];
                if (element.transacciones_tipo === 'ingreso') saldo += Number(element.transacciones_monto); 
                else if (element.transacciones_tipo === 'egreso') saldo -= Number(element.transacciones_monto); 
                else mensaje = 'Registros incompletos'
            }
        }

        return {saldo, mensaje};
    }


    async obtenerTodasTransacciones() {
        return this.transaccionUsuarioRepository.createQueryBuilder('transacciones')
        .leftJoinAndSelect('transacciones.usuario', 'usuario')
        .getRawMany();
    }
}
