import { IsEmail, IsString } from "class-validator";

export class CrearUsuarioDto {
    @IsString({message:`El 'documento' debe ser una cadena de texto`})
    readonly documento: String;

    @IsString({message:`El 'nombre' debe ser una cadena de texto`})
    readonly nombre: String;

    @IsEmail({}, {message:`El 'email' no tiene formato de correo electronico`})
    readonly email: String;

    @IsString({message:`El 'celular' debe ser una cadena de texto`})
    readonly celular: String;
}