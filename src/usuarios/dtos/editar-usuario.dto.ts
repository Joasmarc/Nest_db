import { IsOptional, IsString, IsUUID } from "class-validator";

export class EditarUsuarioDto {

    @IsUUID('4', {message:`El 'id' no tiene un formato correcto`})
    readonly id: String;

    @IsString({message:`El 'apellido' debe ser una cadena de texto`})
    @IsOptional()
    readonly apellido?: String;

    @IsString({message:`El 'nombre' debe ser una cadena de texto`})
    @IsOptional()
    readonly nombre?: String;
}