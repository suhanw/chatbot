import { User, IUser } from "../models/User";

export interface IUserRepo {
  create: (data: IUser) => Promise<IUser | null>;
  findByEmail: (email: string) => Promise<IUser | null>;
  verifyPassword: (email: string, password: string) => Promise<boolean>;
}

export class UserRepo implements IUserRepo {
  async create(data: IUser) {
    try {
      return await User.create(data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findByEmail(email: string) {
    try {
      return await User.findOne({ email }).exec();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async verifyPassword(email: string, password: string) {
    const user = await this.findByEmail(email);
    return user?.password === password;
  }
}
