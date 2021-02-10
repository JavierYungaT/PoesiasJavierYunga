export interface User {
    uid: string;
    email: string;
    displayName?: string;
    emailVerified: boolean;
    password?: string;
    photoURL?: string;
    rol: number;

    nombre: string;
    apellido: string;
    numeroCedula: string;
    fechaNacimiento: Date;
    profesional: boolean;
    deleted: boolean;
}