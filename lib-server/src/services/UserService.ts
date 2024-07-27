import bcrypt from 'bcrypt'
import { config } from '../config'
import { IUser } from '../models/User'
import User, { IUserModel} from '../daos/UserDao'

export async function register(user:IUser):Promise<IUserModel>{
    const ROUNDS = config.server.rounds;
    try {
        const hashPassword = await bcrypt.hash(user.password,ROUNDS);
        const saved = new User({...user,password:hashPassword});
        return await saved.save();
    } catch (error) {
        console.log(error);
        throw new Error(`Unable to create user`);
    }
}