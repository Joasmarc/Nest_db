export interface TransaccionesInterface {
    id: String,
    fecha: String;
    transacciones_monto: String;
    descripcion: 'recarga' | 'pago' | 'recepcion' | 'envio';
    transacciones_tipo: 'ingreso' | 'egreso';
    usuarioId: String;
}