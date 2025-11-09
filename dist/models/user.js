"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.createUser = exports.getAllUsers = void 0;
const uuid_1 = require("uuid");
const users_1 = require("../data/users");
const getAllUsers = () => {
    return Promise.resolve(users_1.users);
};
exports.getAllUsers = getAllUsers;
const createUser = (userData) => {
    return new Promise((resolve) => {
        const newUser = {
            id: (0, uuid_1.v4)(),
            ...userData
        };
        users_1.users.push(newUser);
        resolve(newUser);
    });
};
exports.createUser = createUser;
const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        const condidate = users_1.users.find((user) => user.id === id);
        if (condidate) {
            resolve(condidate);
        }
        else {
            reject(new Error('User not found'));
        }
    });
};
exports.getUserById = getUserById;
const updateUser = (userData, id) => {
    return new Promise((resolve, reject) => {
        const condidateIndex = users_1.users.findIndex((user) => user.id === id);
        if (condidateIndex !== -1) {
            const updatedUser = { id, ...userData };
            users_1.users[condidateIndex] = updatedUser;
            resolve(updatedUser);
        }
        else {
            reject(new Error('User not found'));
        }
    });
};
exports.updateUser = updateUser;
const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        const initialLength = users_1.users.length;
        const updatedUsers = users_1.users.filter((user) => user.id !== id);
        if (updatedUsers.length < initialLength) {
            users_1.users.length = 0;
            users_1.users.push(...updatedUsers);
            resolve();
        }
        else {
            reject(new Error('User not found'));
        }
    });
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.js.map