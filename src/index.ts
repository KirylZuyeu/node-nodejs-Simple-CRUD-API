import * as http from 'http';
import { config } from 'dotenv';
import { resolve } from 'path';
import { cwd } from 'process';
import * as UserController from './controllers/userController';
import { validateUuid } from './utils';
import { ServerResponse } from 'http';

const sendErrorResponse = (res: ServerResponse, statusCode: number, errorMessage: string) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: errorMessage }));
};

config({ path: resolve(cwd(), '.env') });

export const startServer = () => {
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
                if (!validateUuid(userId)) {

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
        } catch (err) {
            console.error('Unhandled server error:', err);
            sendErrorResponse(res, 500, 'Server Side Error');
        }
    });
    const { PORT } = process.env;
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

if (require.main === module) {
    startServer();
}
