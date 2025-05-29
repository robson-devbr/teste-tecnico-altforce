import { UserRepository } from "../../../domain/repository/UserRepository";
import { LoginUserDTOs } from "../../dtos/auth-dtos/LoginUserDTOs";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export class LoginUserUseCase {
    constructor(
        public readonly userRepository: UserRepository
    ) { }

    async execute(data: LoginUserDTOs): Promise<string> {
       
        const user = await this.userRepository.FindByEmail(data.email)
        if (!user) {
            throw new Error("Email ou senha inválidos!");
        }

        // password
        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        if (!isPasswordValid) {
            throw new Error("Email ou senha inválidos!");
        }

        // token
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET || 'default-secret',
            { expiresIn: '720h' }
        );
        
        return token;
    }
}