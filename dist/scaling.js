"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
const process_1 = require("process");
const index_1 = require("./index");
const cluster = require('cluster');
const startNewWorker = () => {
    const worker = cluster.fork();
    worker.on('online', () => {
        console.log(`Worker ${worker.id} started (PID: ${worker.process.pid})`);
    });
    return worker;
};
const startCluster = async () => {
    if (cluster.isPrimary) {
        const cpusCount = (0, os_1.cpus)().length;
        console.log(`Primary pid ${process_1.pid} started ${cpusCount} workers.`);
        for (let i = 0; i < cpusCount; i += 1) {
            startNewWorker();
        }
        cluster.on('exit', (worker, code, signal) => {
            if (code !== 0 && !worker.exitedAfterDisconnect) {
                console.log(`Worker ${worker.id} died (PID: ${worker.process.pid}). Starting a new one...`);
                startNewWorker();
            }
        });
    }
    else {
        const workerId = cluster.worker?.id || 0;
        (0, index_1.startServer)();
        console.log(`Worker id:${workerId} pid:${process_1.pid} started server.`);
    }
};
startCluster();
//# sourceMappingURL=scaling.js.map