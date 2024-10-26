import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrearTransaccioneDto } from './dto/crear-transaccione.dto';
import { TransaccionUsuario } from './entities/transaccion-usuario.entity';
import { LlavesTemporales } from './entities/llaves-temporales.entity';
import { Repository } from 'typeorm';
import { TransaccionesInterface } from './interfaces/transacciones.interface';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TransaccionesService {

    constructor(
        @InjectRepository(TransaccionUsuario)
        private readonly transaccionUsuarioRepository: Repository<TransaccionUsuario>,
        @InjectRepository(LlavesTemporales)
        private readonly llavesTemporalesRepository: Repository<LlavesTemporales>,
        private readonly mailerService: MailerService,
        private readonly jwtService: JwtService,
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

    async pagar(crearTransaccioneDto: CrearTransaccioneDto, {documento, id, email}) {

        // Validar que tenga ese monto dinero en la cuenta
        const {saldo} = await this.obtenerSaldoUsuario(documento)
        if (Number(saldo) < Number(crearTransaccioneDto.monto)){
            return {
                mensaje: 'El usuario no cuenta con saldo suficiente',
            }
        }

        // Generar token con datos de usuario
        const token_sesion = await this.jwtService.sign({documento})
        const decode = await this.jwtService.verifyAsync(token_sesion, {
            secret: 'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
        });

        // Generar llave de 6 digitos
        const llave = Math.floor(Math.random() * 900000) + 100000;



        const fecha = new Date();
        const fecha_creacion = fecha.toISOString().slice(0, 10);
        fecha.setTime(fecha.getTime() + 24 * 60 * 60 * 1000);
        const fecha_vencimiento = fecha.toISOString().slice(0, 10);

        try {
            const llave_temporal =  this.llavesTemporalesRepository.create({
                documento,
                llave,
                monto: crearTransaccioneDto.monto,
                fecha_creacion,
                fecha_vencimiento,
                usuario: { id }
            });

            await this.llavesTemporalesRepository.save(llave_temporal);

            // Enviar correo
            this.mailerService.sendMail({
                to: email,
                from: 'joasmarc@tecnojool.com',
                subject: 'Llave Temporal Compra Epayco',
                text: 'Su llave es',
                html: `<h4>Llave</h4><h1>${llave}</h1><h4>Id Sesion</h4><h1>${token_sesion}</h1>`
            })

            return llave_temporal;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }

    }

    sendMail(): any{
        return this.mailerService.sendMail({
            to: 'joasmarc@gmail.com',
            from: 'joasmarc@tecnojool.com',
            subject: 'Correo de prueba',
            text: 'Bienvenido',
            html: '<h1>Hola</h1>'
        })
    }
}
