import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TransaccionUsuario } from "../../transacciones/entities/transaccion-usuario.entity";
import { LlavesTemporales } from "src/transacciones/entities/llaves-temporales.entity";

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn('uuid')
    id: String;

    @Column('varchar')
    documento: String;

    @Column('varchar')
    nombre: String;

    @Column('varchar')
    email: String;

    @Column('varchar')
    celular: String;

    @OneToMany(
        () => TransaccionUsuario,
        (transaccionUsuario) => transaccionUsuario.usuario,
        {cascade: true}
    )
    transaccion?: TransaccionUsuario

    @OneToMany(
        () => LlavesTemporales,
        (llavesTemporales) => llavesTemporales.usuario,
        {cascade: true}
    )
    llaves_temporales?: LlavesTemporales

}