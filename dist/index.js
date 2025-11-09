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
exports.startServer = void 0;
const http = __importStar(require("http"));
const dotenv_1 = require("dotenv");
const path_1 = require("path");
const process_1 = require("process");
const UserController = __importStar(require("./controllers/userController"));
const utils_1 = require("./utils");
const sendErrorResponse = (res, statusCode, errorMessage) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: errorMessage }));
};
(0, dotenv_1.config)({ path: (0, path_1.resolve)((0, process_1.cwd)(), '.env') });
const startServer = () => {
    const server = http.createServer(async (req, res) => {
        try {
            const requestUrl = req.url || '';
            const parts = requestUrl.split('/');
            const resource = `/${parts[1]}/${parts[2]}`;
            const userId = parts[3];
            const isRootUrl = requestUrl === '/api/users';
            const isIdUrl = resource === '/api/users' && userId;
            if (isRootUrl) {
                switch (req.method) {
                    case 'GET':
                        await UserController.getUsers(req, res);
                        break;
                    case 'POST':
                        await UserController.create(req, res);
                        break;
                    default:
                        sendErrorResponse(res, 404, 'Endpoint Not Found');
                        break;
                }
            }
            else if (isIdUrl) {
                if (!(0, utils_1.validateUuid)(userId)) {
                    sendErrorResponse(res, 400, 'Invalid ID');
                    return;
                }
                switch (req.method) {
                    case 'GET':
                        await UserController.getById(req, res, userId);
                        break;
                    case 'PUT':
                        await UserController.update(req, res, userId);
                        break;
                    case 'DELETE':
                        await UserController.remove(req, res, userId);
                        break;
                    default:
                        sendErrorResponse(res, 404, 'Endpoint Not Found');
                        break;
                }
            }
            else {
                sendErrorResponse(res, 404, 'Endpoint Not Found');
            }
        }
        catch (err) {
            console.error('Unhandled server error:', err);
            sendErrorResponse(res, 500, 'Server Side Error');
        }
    });
    const { PORT } = process.env;
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};
exports.startServer = startServer;
if (require.main === module) {
    (0, exports.startServer)();
}
//# sourceMappingURL=index.js.map