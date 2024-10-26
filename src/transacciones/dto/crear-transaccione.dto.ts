import { IsNumber, IsPositive, IsString, IsUUID } from "class-validator";
import { Usuario } from "src/usuarios/entities";

export class CrearTransaccioneDto {

    @IsString({message:`El 'documento' tiene que ser una cadena`})
    readonly documento: String;

    @IsNumber()
    @IsPositive()
    readonly monto: Number;

    @IsString()
    readonly descripcion: 'recarga' | 'pago' | 'recepcion' | 'envio';

}
