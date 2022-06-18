import * as _cluster from 'cluster';
import { cpus } from 'os';
const cluster = _cluster as unknown as _cluster.Cluster;

if (cluster.isPrimary) {
  const cpusCount = cpus().length;
  for (let i = 0; i < cpusCount; i++) {
    cluster.fork();
  }
}

if (cluster.isWorker) {
  import('./server');
}