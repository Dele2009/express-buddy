import mongoose from 'mongoose';
import app from './app.js';
import config from './config.js';
// import { logger } from './shared/logger.js';
// console.log('running')
// process.on('uncaughtException', error => {
//   console.log(error);
//   process.exit(1);
// });
let server;
(async () => {
    try {
        console.log(`[ DB connection ⏳ => 🛢 ] : Database is connecting...`);
        await mongoose.connect(config.database_url);
        console.log(`[ DB connection ✔ => 🛢 ] : Database is connected successfully`);
        server = app.listen(config.port, () => {
            console.log(`[ server ok 👍 ] : Application listening on http://localhost:${config.port}`);
        });
    }
    catch (err) {
        console.log('[ server error ⭕❗ ] : Failed to connect database', err);
    }
    // process.on('unhandledRejection', error => {
    //   if (server) {
    //     server.close(() => {
    //       console.log(error);
    //       process.exit(1);
    //     });
    //   } else {
    //     process.exit(1);
    //   }
    // });
})();
// process.on('SIGTERM', () => {
//   console.log('SIGTERM is received');
//   if (server) {
//     server.close();
//   }
// });
