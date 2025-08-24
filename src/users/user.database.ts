import {hash} from "bcrypt";
import {v4 as uuid} from "uuid";
import {getDb, updateDb} from "../../dbManager";
import { UnsavedUser, User } from "../../types";


export const findAll = async () : Promise<User[]> => {
    const db = await getDb();
    return db.users;
};

// user registeration

export const findByEmail = async (email : string) : Promise<User|null> => {
    const users = findAll()
    const user = (await users).find((user) => user.email === email);
    return user ?? null;
};
// is user exist or not ?

export const create = async(unsavedUser : UnsavedUser) : Promise<User> => {
    const hashedPassword = await hash(unsavedUser.password, 10); 
    const userToCreate: User = {
        ...unsavedUser,
        id : uuid(),
        password: hashedPassword,
    };
    const db = await getDb();
    const updatedDb = {
        ...db,
        users: [...db.users, userToCreate],
    };
    updateDb(updatedDb);

    return userToCreate;
};