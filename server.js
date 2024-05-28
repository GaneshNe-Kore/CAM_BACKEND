const cluster = require('cluster');
const app = require('./app');
const os = require('os');
const config =require("./Config/config.json")
if (cluster.isMaster) {
    const numCPUs = os.cpus().length;
    console.log(`Master ${process.pid} is running`);

    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
    });
} else {
    const PORT = process.env.PORT || config.PORT;
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}
