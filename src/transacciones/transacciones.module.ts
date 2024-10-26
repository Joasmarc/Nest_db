import { Module } from '@nestjs/common';
import { TransaccionesService } from './transacciones.service';
import { TransaccionesController } from './transacciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransaccionUsuario } from './entities/transaccion-usuario.entity';

@Module({
  controllers: [TransaccionesController],
  providers: [TransaccionesService],
  imports: [
    TypeOrmModule.forFeature([TransaccionUsuario])
  ]
})
export class TransaccionesModule {}
