import * as cluster from 'cluster';
import { cpus } from 'os';
import { pid } from 'process';
import { Worker } from 'cluster'; 

const startNewWorker = () => {
    const worker: Worker = cluster.fork();

    worker.on('online', () => {
        console.log(`Worker ${worker.id} started (PID: ${worker.process.pid})`);
    });

    return worker;
};

const startCluster = async () => {
    if (cluster.isPrimary) {
        const cpusCount = cpus().length;

        console.log(`Primary (Master) pid ${pid} started ${cpusCount} workers.`);

        for (let i = 0; i < cpusCount; i += 1) {
            startNewWorker();
        }

        cluster.on('exit', (worker: Worker, code: number, signal: string) => {
            if (code !== 0 && !worker.exitedAfterDisconnect) {
                console.log(`Worker ${worker.id} died (PID: ${worker.process.pid}, Code: ${code}, Signal: ${signal}). Starting a new one...`);
                startNewWorker();
            }
        });

    } else {

        const workerId = cluster.worker?.id || 0;

        await import('./index');

        console.log(`Worker id:${workerId} pid:${pid} is ready to handle requests.`);
    }
};

startCluster();
