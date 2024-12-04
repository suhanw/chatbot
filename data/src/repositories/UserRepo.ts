import { User, IUser } from "../models/User";

export interface IUserRepo {
  create: (data: IUser) => Promise<IUser | null>;
  findByEmail: (email: string) => Promise<IUser | null>;
  verifyPassword: (email: string, password: string) => Promise<boolean>;
}

export class UserRepo implements IUserRepo {
  async create(data: IUser) {
    return await User.create(data);
  }

  async findByEmail(email: string) {
    return await User.findOne({ email }).exec();
  }

  async verifyPassword(email: string, password: string) {
    const user = await this.findByEmail(email);
    return user?.password === password;
  }
}
