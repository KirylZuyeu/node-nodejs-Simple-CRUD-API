import { IncomingMessage } from 'http';
import { validate, version } from 'uuid';
import { IUser } from '../models/user';

export const getBodyData = (req: IncomingMessage): Promise<string> => {
    return new Promise((resolve, reject) => {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            resolve(body);
        });

        req.on('error', (err) => {
            reject(err);
        });
    });
};

export const validateUuid = (uuid: string): boolean => {
    return validate(uuid) && version(uuid) === 4;
};

export const validateBody = (userBody: IUser): boolean => {
    const isNameString = typeof userBody.username === 'string';
    const isAgeNumber = typeof userBody.age === 'number';
    const isHobbyArray = Array.isArray(userBody.hobbies);

    const isHobbyElString = isHobbyArray
        ? userBody.hobbies.every(h => typeof h === 'string')
        : false;

    if (!userBody.hobbies) return false;

    return isNameString && isAgeNumber && isHobbyArray && isHobbyElString;
};
