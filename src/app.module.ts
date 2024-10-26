import { Module } from '@nestjs/common';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransaccionesModule } from './transacciones/transacciones.module';
import { MailerModule } from '@nestjs-modules/mailer';

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
    TransaccionesModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.hostinger.com',
        port: 465,
        secure: true,
        auth: {
          user: 'joasmarc@tecnojool.com',
          pass: 'Epayco.26102024',
        }
      }
    })
  ],
  controllers: [],
  providers: [],
  exports:[],
})
export class AppModule {}
