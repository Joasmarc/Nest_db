import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "../../usuarios/entities/usuario.entity";

@Entity()
export class TransaccionUsuario {

    @PrimaryGeneratedColumn('uuid')
    readonly id: String;

    @Column('varchar')
    readonly fecha: String;

    @Column('varchar')
    readonly tipo: 'ingreso' | 'egreso';

    @Column('varchar')
    readonly descripcion: 'recarga' | 'pago' | 'recepcion' | 'envio';

    @Column('float')
    readonly monto: Number ;

    @ManyToOne(
        () => Usuario,
        (usuario) => usuario.transaccion
    )
    usuario: Usuario

}