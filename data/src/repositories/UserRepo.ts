import { User, IUser } from "../models/User";

interface IUserRepo {
  create: (data: IUser) => Promise<IUser>;
  findByEmail: (email: string) => Promise<IUser | null>;
  verifyPassword: (email: string, password: string) => Promise<boolean>;
}

export class MongoUserRepo implements IUserRepo {
  async create(data: IUser) {
    return await User.create(data);
  }

  async findByEmail(email: string) {
    try {
      return await User.findOne({ email }).exec();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async verifyPassword(email: string, password: string) {
    const user = await this.findByEmail(email);
    return user?.password === password;
  }
}
