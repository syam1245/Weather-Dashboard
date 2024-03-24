const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const gracefulShutdown = () => {
  console.log('Shutting down gracefully...');
  mongoose.connection.close((err) => {
    if (err) {
      console.error('Error closing MongoDB connection:', err);
      process.exit(1);
    } else {
      console.log('MongoDB connection closed');
      process.exit(0); 
    }
  });
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died with code ${code} and signal ${signal}`);
    console.log('Forking a new worker...');
    cluster.fork();
  });

  mongoose.connection.on('disconnected', () => {
    console.error('MongoDB disconnected! Trying to reconnect...');
    setTimeout(connectWithRetry, 5000);
  });

  const connectWithRetry = async () => {
    try {
      await mongoose.connect(process.env.mongo_URI, {});
      console.log('Successfully reconnected to MongoDB');
    } catch (err) {
      console.error('Error reconnecting to MongoDB:', err);
      setTimeout(connectWithRetry, 5000);
    }
  };

} else {
  const server = require('./server');
  server.on('error', (err) => {
    console.error('Server error:', err);
  });
}
