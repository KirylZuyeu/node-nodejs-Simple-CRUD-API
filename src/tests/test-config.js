const supertest = require('supertest');
const port = process.env.PORT || 4000;
const request = supertest(`http://localhost:${port}`);

const testState = {
    id: '',
    user: {}
};

module.exports = {
    request,
    testState,
};
