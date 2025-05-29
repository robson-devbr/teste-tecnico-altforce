import { UserRole } from "../../../domain/enum/UserRole";

export interface RegisterUserDTOs{
    name: string;
    email: string;
    password: string;
    role?: UserRole;
}
