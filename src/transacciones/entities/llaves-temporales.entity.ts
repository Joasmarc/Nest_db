import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "../../usuarios/entities/usuario.entity";

@Entity()
export class LlavesTemporales {

    @PrimaryGeneratedColumn('uuid')
    readonly id: String;

    @Column('varchar')
    readonly documento: String;

    @Column('int')
    readonly llave: Number;

    @Column('varchar')
    readonly fecha_creacion: String;

    @Column('varchar')
    readonly fecha_vencimiento: String;

    @Column('float')
    readonly monto: Number ;

    @ManyToOne(
        () => Usuario,
        (usuario) => usuario.transaccion
    )
    usuario: Usuario

}