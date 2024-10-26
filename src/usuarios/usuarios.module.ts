import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransaccionUsuario, Usuario } from './entities';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService],
  imports: [
    TypeOrmModule.forFeature([Usuario, TransaccionUsuario])
  ]
})
export class UsuariosModule {}
