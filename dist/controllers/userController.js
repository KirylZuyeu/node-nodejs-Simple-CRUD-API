"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.getById = exports.create = exports.getUsers = void 0;
const utils_1 = require("../utils");
const User = __importStar(require("../models/user"));
const getUsers = async (req, res) => {
    try {
        const users = await User.getAllUsers();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
    }
    catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Server Side Error' }));
    }
};
exports.getUsers = getUsers;
const create = async (req, res) => {
    try {
        const body = await (0, utils_1.getBodyData)(req);
        const { username, age, hobbies } = JSON.parse(body);
        if (!username || !age || !hobbies) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'No Required Values' }));
        }
        else {
            const user = { username, age, hobbies };
            if (!(0, utils_1.validateBody)(user)) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Invalid Body Values' }));
            }
            else {
                const newUser = await User.createUser(user);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(newUser));
            }
        }
    }
    catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Server Side Error' }));
    }
};
exports.create = create;
const getById = async (req, res, id) => {
    try {
        const condidate = await User.getUserById(id);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(condidate));
    }
    catch (error) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User not found' }));
    }
};
exports.getById = getById;
const update = async (req, res, id) => {
    try {
        const body = await (0, utils_1.getBodyData)(req);
        const { username, age, hobbies } = JSON.parse(body);
        if (!username || !age || !hobbies) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'No Required Values' }));
        }
        else {
            const condidate = { username, age, hobbies };
            if (!(0, utils_1.validateBody)(condidate)) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Invalid Body Values' }));
            }
            else {
                const updatedUser = await User.updateUser(condidate, id);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(updatedUser));
            }
        }
    }
    catch (error) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User not found' }));
    }
};
exports.update = update;
const remove = async (req, res, id) => {
    try {
        await User.deleteUser(id);
        res.writeHead(204, { 'Content-Type': 'application/json' });
        res.end();
    }
    catch (error) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User not found' }));
    }
};
exports.remove = remove;
//# sourceMappingURL=userController.js.map