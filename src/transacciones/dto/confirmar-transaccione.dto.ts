import { IsNumber, IsPositive, IsString, IsUUID } from "class-validator";

export class ConfirmarTransaccionesDto {

    @IsString({message:`La 'llave' tiene que ser numerica`})
    readonly llave: Number;

}
