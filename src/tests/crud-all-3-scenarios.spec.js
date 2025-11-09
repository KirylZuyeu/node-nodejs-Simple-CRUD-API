const { request, testState } = require('./test-config');
describe('CRUD TESTING', () => {
describe('Test Scenario 1: Basic CRUD Operations', () => {
    it('GET /api/users: Send []', async () => {
        const res = await request.get('/api/users');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([]);
    });
    it('POST /api/users: Status 201', async () => {
        const mockRequest = {
            username: 'User',
            age: 22,
            hobbies: ['coding'],
        };
        const res = await request.post('/api/users').send(mockRequest);

        testState.id = res.body.id;
        testState.user = { id: testState.id, ...mockRequest };

        expect(res.body).toEqual(testState.user);
        expect(res.statusCode).toBe(201);
    });

    it('GET /api/users/{userId}: Status 200', async () => {
        const res = await request.get(`/api/users/${testState.id}`);

        expect(res.body).toEqual(testState.user);
        expect(res.statusCode).toBe(200);
    });

    it('PUT /api/users/{userId}: Status 200', async () => {
        const mockRequest = {
            username: 'User',
            age: 23,
            hobbies: ['coding'],
        };

        const res = await request.put(`/api/users/${testState.id}`).send(mockRequest);

        testState.user = { id: testState.id, ...mockRequest };

        expect(res.body).toEqual(testState.user);
        expect(res.statusCode).toBe(200);
    });

    it('DELETE /api/users/{userId}: Status 204', async () => {
        const res = await request.delete(`/api/users/${testState.id}`);
        expect(res.statusCode).toBe(204);
    });

    it('GET /api/users/{userId}: Status 404 - Message "User not Found"', async () => {
        const res = await request.get(`/api/users/${testState.id}`);

        expect(res.statusCode).toBe(404);
        expect(JSON.parse(res.text).message).toBe('User not found');
    });
});

describe('Test Scenario 2: Error Handling (400, 404)', () => {

    describe('400 Bad Request Errors (Invalid Input)', () => {
        it('POST /api/users: Status 400 - No Required Values', async () => {
            const mockRequest = {
                username: 'User',
                age: 33,
            };

            const res = await request.post('/api/users').send(mockRequest);

            expect(res.statusCode).toBe(400);
            expect(JSON.parse(res.text).message).toBe('No Required Values');
        });

        it('POST /api/users: Status 400 - Invalid Body Values', async () => {
            const mockRequest = {
                username: 'User',
                age: 25,
                hobbies: 'coding',
            };

            const res = await request.post('/api/users').send(mockRequest);

            expect(res.statusCode).toBe(400);
            expect(JSON.parse(res.text).message).toBe('Invalid Body Values');
        });

        it('GET /api/users/{id}: Status 400 - Invalid ID', async () => {
            const res = await request.get('/api/users/12345');

            expect(res.statusCode).toBe(400);
            expect(JSON.parse(res.text).message).toBe('Invalid ID');
        });
    });

    describe('Status 404- User not found', () => {
        const nonExistentId = '055c0d3c-db89-4eba-a354-1debd791bd69';
        it('GET /api/users/{id}: Non-existent ID should return 404', async () => {
            const res = await request.get(`/api/users/${nonExistentId}`);

            expect(res.statusCode).toBe(404);
            expect(JSON.parse(res.text).message).toBe('User not found');
        });

        it('PUT /api/users/{id}: Status 404 - User not Found', async () => {
            const mockRequest = { username: 'Name', age: 25, hobbies: ['hobby'] };
            const res = await request.put(`/api/users/${nonExistentId}`).send(mockRequest);

            expect(res.statusCode).toBe(404);
            expect(JSON.parse(res.text).message).toBe('User not found');
        });

        it('DELETE /api/users/{id}: Status 404 - User not found', async () => {
             const res = await request.delete(`/api/users/${nonExistentId}`);

            expect(res.statusCode).toBe(404);
            expect(JSON.parse(res.text).message).toBe('User not found');
        });
    });

    it('GET /non-existent-url: Status 404 - Endpoint Not Found', async () => {
        const res = await request.get('/api/non-users');

        expect(res.statusCode).toBe(404);
        expect(JSON.parse(res.text).message).toBe('Endpoint Not Found');
    });
});

describe('Test Scenario 3: Multiple Records Lifecycle', () => {
    let id1, id2;

    const mockRequest = {
        username: 'User',
        age: 40,
        hobbies: ['coding'],
    };

    it('POST /api/users (x2): Status 201', async () => {
        const res1 = await request.post('/api/users').send(mockRequest);
        const res2 = await request.post('/api/users').send(mockRequest);

        id1 = res1.body.id;
        id2 = res2.body.id;

        expect(res1.statusCode).toBe(201);
        expect(res2.statusCode).toBe(201);
        expect(id1).not.toBe(id2);
    });

    it('GET /api/users: [].length() = 2', async () => {
        const res = await request.get('/api/users');

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(2);
    });

    it('DELETE /api/users/{id}: Status 204', async () => {
        const res1 = await request.delete(`/api/users/${id1}`);
        const res2 = await request.delete(`/api/users/${id2}`);

        expect(res1.statusCode).toBe(204);
        expect(res2.statusCode).toBe(204);
    });

    it('GET /api/users: []', async () => {
        const res = await request.get('/api/users');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([]);
    });
});
});
