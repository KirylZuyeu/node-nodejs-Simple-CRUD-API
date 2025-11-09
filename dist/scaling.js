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
const cluster = __importStar(require("cluster"));
const os_1 = require("os");
const process_1 = require("process");
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
        console.log(`Primary (Master) pid ${process_1.pid} started ${cpusCount} workers.`);
        for (let i = 0; i < cpusCount; i += 1) {
            startNewWorker();
        }
        cluster.on('exit', (worker, code, signal) => {
            if (code !== 0 && !worker.exitedAfterDisconnect) {
                console.log(`Worker ${worker.id} died (PID: ${worker.process.pid}, Code: ${code}, Signal: ${signal}). Starting a new one...`);
                startNewWorker();
            }
        });
    }
    else {
        const workerId = cluster.worker?.id || 0;
        await Promise.resolve().then(() => __importStar(require('./index')));
        console.log(`Worker id:${workerId} pid:${process_1.pid} is ready to handle requests.`);
    }
};
startCluster();
//# sourceMappingURL=scaling.js.map