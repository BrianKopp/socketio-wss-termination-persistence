const { app } = require('./app');
const { setupSocketIO } = require('./io');

const server = app.listen(3000, (err) => {
    if (err) {
        console.error('error starting server', err);
        process.exit(1);
    }
    console.log('started server on port 3000');
});

const ioServer = setupSocketIO(server);

const shutdown = () => {
    const initialSleep = 2;
    console.log(`received shutdown signal, sleeping for ${initialSleep} seconds before closing server`);
    setTimeout(() => {
        console.log('shutting down server');
        ioServer.close((err) => {
            if (err) {
                console.error('error shutting down server', err);
                process.exit(1);
            }
            console.log('successfully shut down server');
            process.exit(0);
        });
    }, initialSleep * 1000);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
