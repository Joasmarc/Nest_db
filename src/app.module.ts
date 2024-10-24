import { Module } from '@nestjs/common';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [UsuariosModule],
  controllers: [],
  providers: [],
  exports:[],
})
export class AppModule {}
