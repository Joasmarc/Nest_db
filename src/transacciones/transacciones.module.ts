import { Module } from '@nestjs/common';
import { TransaccionesService } from './transacciones.service';
import { TransaccionesController } from './transacciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { JwtModule } from '@nestjs/jwt';
import { TransaccionUsuario } from 'src/transacciones/entities/transaccion-usuario.entity';
import { LlavesTemporales } from 'src/transacciones/entities/llaves-temporales.entity';

@Module({
  controllers: [TransaccionesController],
  providers: [TransaccionesService],
  imports: [
    TypeOrmModule.forFeature([TransaccionUsuario, LlavesTemporales]),
    UsuariosModule,
    JwtModule.register({
      global: true,
      secret: 'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
      signOptions: { expiresIn: '30m' },
    }),
  ]
})
export class TransaccionesModule {}
