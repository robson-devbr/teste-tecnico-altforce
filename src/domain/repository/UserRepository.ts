import { User } from "../entities/User";

export interface UserRepository {

    FindByEmail(email: string): Promise<User | null>;
    create(user: User): Promise<void>;

}
