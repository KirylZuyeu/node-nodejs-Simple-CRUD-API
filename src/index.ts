import * as http from 'http';
import * as dotenv from 'dotenv';

// Загружаем переменные окружения
dotenv.config();

const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Hello from ${process.env.NODE_ENV} server on port ${PORT}!\n`);
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    if (process.env.NODE_ENV === 'development') {
        console.log('Development mode enabled.');
    }
});
