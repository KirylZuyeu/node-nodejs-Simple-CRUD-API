import { v4 as uuidv4 } from 'uuid';
import { users } from '../data/users';

export interface IUser {
    id?: string;
    username: string;
    age: number;
    hobbies: Array<string>;
}

type UserCreateUpdateData = Omit<IUser, 'id'>;

export const getAllUsers = (): Promise<IUser[]> => {
    return Promise.resolve(users);
};

export const createUser = (userData: UserCreateUpdateData): Promise<IUser> => {
    return new Promise((resolve) => {
        const newUser: IUser = {
            id: uuidv4(),
            ...userData
        };
        users.push(newUser);
        resolve(newUser);
    });
};

export const getUserById = (id: string): Promise<IUser> => {
    return new Promise((resolve, reject) => {
        const condidate = users.find((user) => user.id === id);

        if (condidate) {
            resolve(condidate);
        } else {
            reject(new Error('User not found'));
        }
    });
};

export const updateUser = (userData: UserCreateUpdateData, id: string): Promise<IUser> => {
    return new Promise((resolve, reject) => {
        const condidateIndex = users.findIndex((user) => user.id === id);

        if (condidateIndex !== -1) {
            const updatedUser: IUser = { id, ...userData };
            users[condidateIndex] = updatedUser;
            resolve(updatedUser);
        } else {
            reject(new Error('User not found'));
        }
    });
};

export const deleteUser = (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const initialLength = users.length;
        const updatedUsers = users.filter((user) => user.id !== id);

        if (updatedUsers.length < initialLength) {
             users.length = 0;
             users.push(...updatedUsers);
             resolve();
        } else {
            reject(new Error('User not found'));
        }
    });
};
