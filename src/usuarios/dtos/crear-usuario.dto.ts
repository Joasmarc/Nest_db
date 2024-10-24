import { IsString } from "class-validator";

export class CrearUsuarioDto {
    @IsString({message:`El 'apellido' debe ser una cadena de texto`})
    readonly apellido: String;

    @IsString({message:`El 'nombre' debe ser una cadena de texto`})
    readonly nombre: String;
}