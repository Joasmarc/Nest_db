import { IsNumber, IsString, IsUUID } from "class-validator";
import { Usuario } from "src/usuarios/entities";

export class CrearTransaccioneDto {

    @IsUUID('4', {message:`El 'id' no tiene un formato correcto`})
    readonly usuarioId: String;

    @IsNumber()
    readonly monto: Number;

    @IsString()
    readonly descripcion: 'recarga' | 'pago' | 'recepcion' | 'envio';

}
