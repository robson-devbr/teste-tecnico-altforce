import { User } from "../../../domain/entities/User";
import { UserRole } from "../../../domain/enum/UserRole";
import { UserRepository } from "../../../domain/repository/UserRepository";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { RegisterUserDTOs } from "../../dtos/auth-dtos/RegisterUserDTOs";

export class RegisterUserUseCase {
    constructor(
        public readonly userRepository: UserRepository
    ) { }

    async execute(data: RegisterUserDTOs): Promise<User> {
        const existingUser = await this.userRepository.FindByEmail(data.email);
        if (existingUser) {
            throw new Error("Email ja existente!");
        }

        const hashPassword = await bcrypt.hash(data.password, 10);

        const user = new User(
            crypto.randomUUID(),
            data.name,
            data.email,
            hashPassword,
            UserRole.CLIENT
        );

        await this.userRepository.create(user);

        return user;
    }

}
