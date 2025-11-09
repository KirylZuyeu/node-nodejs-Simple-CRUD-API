"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = exports.validateUuid = exports.getBodyData = void 0;
const uuid_1 = require("uuid");
const getBodyData = (req) => {
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
exports.getBodyData = getBodyData;
const validateUuid = (uuid) => {
    return (0, uuid_1.validate)(uuid) && (0, uuid_1.version)(uuid) === 4;
};
exports.validateUuid = validateUuid;
const validateBody = (userBody) => {
    const isNameString = typeof userBody.username === 'string';
    const isAgeNumber = typeof userBody.age === 'number';
    const isHobbyArray = Array.isArray(userBody.hobbies);
    const isHobbyElString = isHobbyArray
        ? userBody.hobbies.every(h => typeof h === 'string')
        : false;
    if (!userBody.hobbies)
        return false;
    return isNameString && isAgeNumber && isHobbyArray && isHobbyElString;
};
exports.validateBody = validateBody;
//# sourceMappingURL=index.js.map