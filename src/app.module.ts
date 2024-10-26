import { Module } from '@nestjs/common';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransaccionesModule } from './transacciones/transacciones.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'epayco',
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsuariosModule,
    TransaccionesModule
  ],
  controllers: [],
  providers: [],
  exports:[],
})
export class AppModule {}
